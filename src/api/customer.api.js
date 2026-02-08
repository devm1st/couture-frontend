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

/**
 * Create customer
 */
export const createCustomer = async (payload) => {
  const ref = await addDoc(collection(db, "customers"), {
    full_name: payload.full_name?.trim() || "",
    phone: payload.phone?.trim() || "",
    address: payload.address?.trim() || null,
    gender: payload.gender?.trim() || null,
    notes: payload.notes?.trim() || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return ref.id;
};

/**
 * Get all customers (newest first)
 */
export const getCustomers = async () => {
  const q = query(collection(db, "customers"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Search customers by name or phone (client-side filter helper)
 * You still call getCustomers() then filter on UI for MVP.
 */
export const searchCustomersLocal = (customers, term) => {
  const q = (term || "").toLowerCase().trim();
  if (!q) return customers;

  return customers.filter((c) => {
    const name = (c.full_name || "").toLowerCase();
    const phone = (c.phone || "").toLowerCase();
    return name.includes(q) || phone.includes(q);
  });
};

/**
 * Get customer by id
 */
export const getCustomerById = async (id) => {
  const snap = await getDoc(doc(db, "customers", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

/**
 * Update customer
 */
export const updateCustomer = async (id, payload) => {
  await updateDoc(doc(db, "customers", id), {
    full_name: payload.full_name?.trim() || "",
    phone: payload.phone?.trim() || "",
    address: payload.address?.trim() || null,
    gender: payload.gender?.trim() || null,
    notes: payload.notes?.trim() || null,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete customer (NOTE: Firestore won't auto-delete subcollections.
 * For MVP, allow delete only if you manually clear subcollections or accept orphaned data risk.
 */
export const deleteCustomer = async (id) => {
  await deleteDoc(doc(db, "customers", id));
};
