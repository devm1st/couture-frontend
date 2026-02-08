import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

/**
 * Convert "", "   " -> null
 * Keep numbers like 0
 * Trim normal strings
 */
const clean = (v) => {
  if (v === 0) return 0;
  if (typeof v === "string") {
    const t = v.trim();
    return t === "" ? null : t;
  }
  return v ?? null;
};

const normalizeMeasurement = (d) => {
  const data = d.data();

  // support older field name variants if any
  const createdAt = data.createdAt || data.created_at || null;

  return {
    id: d.id,
    ...data,
    createdAt,
  };
};

const sortByCreatedAtDesc = (a, b) => {
  const toMs = (ts) => {
    if (!ts) return 0;
    if (ts?.seconds) return ts.seconds * 1000;
    if (typeof ts === "string") {
      const t = Date.parse(ts);
      return Number.isNaN(t) ? 0 : t;
    }
    return 0;
  };

  return toMs(b.createdAt) - toMs(a.createdAt);
};

/**
 * Create a new measurement record (history-based)
 * Path: customers/{customerId}/measurements
 */
export const createMeasurement = async (customerId, payload) => {
  if (!customerId) throw new Error("createMeasurement: customerId is required");

  const ref = await addDoc(
    collection(db, "customers", String(customerId), "measurements"),
    {
      sleeve: clean(payload?.sleeve),
      shoulder: clean(payload?.shoulder),
      round_sleeve: clean(payload?.round_sleeve),
      shirt_length: clean(payload?.shirt_length),
      trouser_length: clean(payload?.trouser_length),
      neck: clean(payload?.neck),
      chest: clean(payload?.chest),
      tummy: clean(payload?.tummy),
      lap: clean(payload?.lap),
      waist: clean(payload?.waist),
      trouser_hip: clean(payload?.trouser_hip),
      cuff_links: clean(payload?.cuff_links),
      agbada_length: clean(payload?.agbada_length),
      note: clean(payload?.note),

      createdAt: serverTimestamp(),
    }
  );

  return ref.id;
};

/**
 * Get all measurements for a customer (newest first)
 * Safe fallback if orderBy fails.
 */
export const getMeasurementsByCustomer = async (customerId) => {
  if (!customerId)
    throw new Error("getMeasurementsByCustomer: customerId is required");

  const baseRef = collection(db, "customers", String(customerId), "measurements");

  try {
    const q = query(baseRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(normalizeMeasurement);
  } catch (err) {
    console.warn("orderBy(createdAt) failed, using fallback:", err?.message || err);

    const snap = await getDocs(baseRef);
    const rows = snap.docs.map(normalizeMeasurement);
    rows.sort(sortByCreatedAtDesc);
    return rows;
  }
};

/**
 * Get single measurement
 */
export const getMeasurementById = async (customerId, measurementId) => {
  if (!customerId || !measurementId) return null;

  const snap = await getDoc(
    doc(db, "customers", String(customerId), "measurements", String(measurementId))
  );

  if (!snap.exists()) return null;

  return normalizeMeasurement(snap);
};

/**
 * Delete measurement (MVP)
 */
export const deleteMeasurement = async (customerId, measurementId) => {
  if (!customerId || !measurementId) return;

  await deleteDoc(
    doc(db, "customers", String(customerId), "measurements", String(measurementId))
  );
};
