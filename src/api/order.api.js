import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const normalizeStatus = (status) => {
  const allowed = ["pending", "in_progress", "ready", "collected"];
  if (!status) return "pending";
  return allowed.includes(status) ? status : "pending";
};

/**
 * Create order (linked to customer + measurementId)
 * Path: customers/{customerId}/orders
 */
export const createOrder = async (customerId, payload) => {
  if (!payload.measurementId) {
    throw new Error("measurementId is required");
  }
  if (!payload.style_name?.trim()) {
    throw new Error("style_name is required");
  }

  const ref = await addDoc(collection(db, "customers", customerId, "orders"), {
    measurementId: payload.measurementId,
    style_name: payload.style_name.trim(),
    style_description: payload.style_description || null,
    style_image_url: payload.style_image_url || null,

    fabric_type: payload.fabric_type || null,
    fabric_color: payload.fabric_color || null,
    fabric_notes: payload.fabric_notes || null,

    price: payload.price || null,
    status: normalizeStatus(payload.status),
    due_date: payload.due_date || null,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
};

/**
 * Get orders for a customer (newest first)
 */
export const getOrdersByCustomer = async (customerId) => {
  const q = query(
    collection(db, "customers", customerId, "orders"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Get a single order
 */
export const getOrderById = async (customerId, orderId) => {
  const snap = await getDoc(doc(db, "customers", customerId, "orders", orderId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

/**
 * Update order status
 */
export const updateOrderStatus = async (customerId, orderId, status) => {
  await updateDoc(doc(db, "customers", customerId, "orders", orderId), {
    status: normalizeStatus(status),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete order
 */

export const deleteOrder = async (customerId, orderId) => {
  if (!customerId || !orderId) {
    throw new Error("deleteOrder: customerId and orderId are required");
  }

  await deleteDoc(doc(db, "customers", String(customerId), "orders", String(orderId)));
};

/**
 * Dashboard helper: count active orders (pending + in_progress)
 * MVP approach: query within each customer is hard.
 * Alternative: use a collectionGroup query if you later want cross-customer counts.
 *
 * For now, we’ll provide a collectionGroup query option:
 */
export const getActiveOrdersCount = async () => {
  // NOTE: Requires Firestore composite indexes sometimes.
  // Works if you later want global dashboard stats.
  const q = query(
    collection(db, "customers"), // placeholder: not used here
  );
  // We'll implement dashboard count later in Dashboard page using collectionGroup.
  // Keeping this stub to avoid confusion.
  return 0;
};
