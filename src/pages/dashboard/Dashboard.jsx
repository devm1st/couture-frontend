import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Activity,
  CheckCircle2,
  ClipboardList,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/ui/StatusBadge";

import { getCustomers } from "../../api/customer.api";
import { db } from "../../api/firebase";

import {
  collectionGroup,
  getDocs,
  getCountFromServer,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";

const StatCard = ({ label, value, hint, icon: Icon }) => (
  <div className="glass rounded-2xl p-5 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-white/55">{label}</p>
        <p className="text-3xl font-semibold mt-2 text-white">{value}</p>
        {hint ? <p className="text-xs text-white/40 mt-2">{hint}</p> : null}
      </div>

      <div className="h-10 w-10 rounded-2xl glass border-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#D4AF37]" />
      </div>
    </div>
  </div>
);

const SectionCard = ({ title, right, children }) => (
  <div className="glass rounded-2xl p-5 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
    <div className="flex items-center justify-between mb-4 gap-3">
      <h3 className="text-white font-semibold">{title}</h3>
      {right}
    </div>
    {children}
  </div>
);

// Extract customerId from collectionGroup order document reference
// Path shape: customers/{customerId}/orders/{orderId}
const getCustomerIdFromOrderDoc = (docSnap) => {
  return docSnap.ref?.parent?.parent?.id || null;
};

const formatDate = (ts) => {
  if (!ts) return "—";
  if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleDateString();
  if (typeof ts === "string") return ts;
  return "—";
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [totalCustomers, setTotalCustomers] = useState(0);

  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    in_progress: 0,
    ready: 0,
    collected: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const activeOrders = useMemo(
    () => (statusCounts.pending || 0) + (statusCounts.in_progress || 0),
    [statusCounts]
  );

  useEffect(() => {
    const run = async () => {
      setLoading(true);

      try {
        const customers = await getCustomers();
        setTotalCustomers(customers.length);

        const ordersGroup = collectionGroup(db, "orders");
        const statuses = ["pending", "in_progress", "ready", "collected"];
        const counts = {};

        await Promise.all(
          statuses.map(async (s) => {
            const qCount = query(ordersGroup, where("status", "==", s));
            const snap = await getCountFromServer(qCount);
            counts[s] = snap.data().count || 0;
          })
        );

        setStatusCounts({
          pending: counts.pending || 0,
          in_progress: counts.in_progress || 0,
          ready: counts.ready || 0,
          collected: counts.collected || 0,
        });

        const qRecent = query(ordersGroup, orderBy("createdAt", "desc"), limit(6));
        const recentSnap = await getDocs(qRecent);

        const recents = recentSnap.docs.map((d) => {
          const data = d.data();
          const customerId = getCustomerIdFromOrderDoc(d);
          return { id: d.id, customerId, ...data };
        });

        setRecentOrders(recents);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <StatCard label="Total Customers" value={totalCustomers} icon={Users} />
              <StatCard
                label="Active Orders"
                value={activeOrders}
                hint="pending + in progress"
                icon={Activity}
              />
              <StatCard
                label="Ready / Collected"
                value={(statusCounts.ready || 0) + (statusCounts.collected || 0)}
                icon={CheckCircle2}
              />
            </div>

            <div className="md:w-60">
              <Link to="/customers/new" className="block">
                <Button className="w-full">
                  <Plus className="w-4 h-4" />
                  Add Customer
                </Button>
              </Link>
              <Link to="/customers" className="block mt-3">
                <Button className="w-full" variant="secondary">
                  <ClipboardList className="w-4 h-4" />
                  View Customers
                </Button>
              </Link>
            </div>
          </div>

          <SectionCard title="Orders by Status">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["Pending", statusCounts.pending],
                ["In Progress", statusCounts.in_progress],
                ["Ready", statusCounts.ready],
                ["Collected", statusCounts.collected],
              ].map(([label, val]) => (
                <div key={label} className="rounded-2xl bg-black/25 border border-white/10 p-4">
                  <p className="text-xs text-white/45">{label}</p>
                  <p className="text-2xl font-semibold text-white mt-1">{val}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Recent Orders"
            right={<span className="text-xs text-white/40">Latest {recentOrders.length} orders</span>}
          >
            {recentOrders.length === 0 ? (
              <div className="rounded-2xl bg-black/25 border border-white/10 p-8 text-center">
                <p className="text-white/70 text-sm">No orders yet</p>
                <p className="text-white/40 text-xs mt-1">
                  Your newest orders will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((o) => (
                  <div
                    key={o.id}
                    className="rounded-2xl bg-black/25 border border-white/10 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-white/5 transition"
                  >
                    <div className="min-w-0">
                      <p className="text-white font-semibold truncate">
                        {o.style_name || "Untitled style"}
                      </p>
                      <p className="text-xs text-white/45 mt-1">
                        Customer:{" "}
                        <span className="text-white/70">{o.customerId || "—"}</span>
                        {" • "}Created:{" "}
                        <span className="text-white/70">{formatDate(o.createdAt)}</span>
                        {o.due_date ? (
                          <>
                            {" • "}Due:{" "}
                            <span className="text-white/70">{o.due_date}</span>
                          </>
                        ) : null}
                      </p>

                      <p className="text-xs text-white/35 mt-1">
                        Fabric: {o.fabric_type || "-"}{" "}
                        {o.fabric_color ? `(${o.fabric_color})` : ""}
                        {o.price ? ` • Price: ${o.price}` : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <StatusBadge status={o.status} />
                      {o.customerId ? (
                        <Link to={`/customers/${o.customerId}`}>
                          <Button variant="secondary">
                            Open <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
