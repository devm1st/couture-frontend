import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Phone,
  MapPin,
  StickyNote,
  Ruler,
  Shirt,
  Calendar,
  Plus,
  ClipboardList,
  UserRound,
  ListChecks,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import { getCustomerById } from "../../api/customer.api";
import { getMeasurementsByCustomer } from "../../api/measurement.api";
import { getOrdersByCustomer } from "../../api/order.api";

const TabBtn = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm border transition backdrop-blur-md ${
      active
        ? "glass border-[#D4AF37]/35 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        : "border-white/10 text-white/70 hover:text-white hover:bg-white/5"
    }`}
    type="button"
  >
    {children}
  </button>
);

const safeText = (v) => {
  if (v === 0) return "0";
  if (typeof v === "string") {
    const t = v.trim();
    return t ? t : "-";
  }
  return v ?? "-";
};

const formatCreatedAt = (createdAt) => {
  if (!createdAt) return "—";
  if (createdAt?.seconds) {
    return new Date(createdAt.seconds * 1000).toLocaleDateString();
  }
  if (typeof createdAt === "string") {
    const t = Date.parse(createdAt);
    return Number.isNaN(t) ? "—" : new Date(t).toLocaleDateString();
  }
  return "—";
};

const CustomerDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState(null);
  const [measurements, setMeasurements] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [c, m, o] = await Promise.all([
          getCustomerById(id),
          getMeasurementsByCustomer(id),
          getOrdersByCustomer(id),
        ]);

        setCustomer(c);
        setMeasurements(m);
        setOrders(o);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id]);

  if (loading) return <Loader />;

  if (!customer) {
    return (
      <DashboardLayout title="Customer">
        <div className="glass rounded-2xl p-6 border-white/10">
          <p className="text-white/80">Customer not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Customer Profile" showBack>
      {/* Hero header */}
      <div className="glass-strong noise rounded-2xl p-6 border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.45)] mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center border-white/10">
                <UserRound className="w-6 h-6 text-[#D4AF37]" />
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-white capitalize truncate">
                  {customer.full_name}
                </h1>
                <div className="flex items-center gap-2 text-white/55 text-sm mt-1">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span className="truncate">{customer.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={`/customers/${id}/measurements/new`}>
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add Measurement
              </Button>
            </Link>

            <Link to={`/customers/${id}/measurements`}>
              <Button variant="secondary" className="w-full sm:w-auto">
                <ListChecks className="w-4 h-4" />
                View Measurements
              </Button>
            </Link>

            <Link to={`/customers/${id}/orders`}>
              <Button variant="secondary" className="w-full sm:w-auto">
                <ClipboardList className="w-4 h-4" />
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabBtn active={tab === "profile"} onClick={() => setTab("profile")}>
          Profile
        </TabBtn>
        <TabBtn
          active={tab === "measurements"}
          onClick={() => setTab("measurements")}
        >
          Measurements
        </TabBtn>
        <TabBtn active={tab === "orders"} onClick={() => setTab("orders")}>
          Orders
        </TabBtn>
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div className="glass rounded-2xl p-6 border-white/10 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-1 text-[#D4AF37]" />
            <div>
              <p className="text-xs text-white/45">Address</p>
              <p className="text-white/80">{customer.address || "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shirt className="w-4 h-4 mt-1 text-[#D4AF37]" />
            <div>
              <p className="text-xs text-white/45">Gender</p>
              <p className="text-white/80">{customer.gender || "-"}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <StickyNote className="w-4 h-4 mt-1 text-[#D4AF37]" />
            <div>
              <p className="text-xs text-white/45">Notes</p>
              <p className="text-white/80">{customer.notes || "-"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Measurements */}
      {tab === "measurements" && (
        <div className="space-y-4">
          {measurements.length > 0 ? (
            measurements.map((m) => (
              <div
                key={m.id}
                className="glass rounded-2xl p-5 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-semibold text-white">Measurement</h3>
                    </div>

                    <p className="text-xs text-white/45 mt-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/35" />
                      {formatCreatedAt(m.createdAt)}
                    </p>
                  </div>

                  <Link to={`/orders/new?customer=${id}&measurement=${m.id}`}>
                    <Button variant="secondary" className="w-full md:w-auto">
                      Create Order
                    </Button>
                  </Link>
                </div>

                {/* Full measurement fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {[
                    // Upper body
                    ["Chest", m.chest],
                    ["Waist", m.waist],
                    ["Tummy", m.tummy],
                    ["Shoulder", m.shoulder],
                    ["Sleeve", m.sleeve],
                    ["Round Sleeve", m.round_sleeve],
                    ["Neck", m.neck],
                    ["Shirt Length", m.shirt_length],
                    ["Agbada Length", m.agbada_length],

                    // Lower body
                    ["Trouser Hip", m.trouser_hip],
                    ["Lap", m.lap],
                    ["Trouser Length", m.trouser_length],
                    ["Cuff Links", m.cuff_links],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl bg-black/25 border border-white/10 p-3"
                    >
                      <p className="text-xs text-white/45">{k}</p>
                      <p className="text-white/80 mt-1">{safeText(v)}</p>
                    </div>
                  ))}
                </div>

                {m.note && safeText(m.note) !== "-" ? (
                  <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/75">
                    <span className="text-white/50 font-medium">Note:</span>{" "}
                    {safeText(m.note)}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="glass rounded-2xl p-8 border-white/10 text-center">
              <p className="text-white/70 text-sm">No measurements yet</p>
              <p className="text-white/40 text-xs mt-1">
                Add the first measurement to start creating orders.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Orders */}
      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((o) => (
              <div
                key={o.id}
                className="glass rounded-2xl p-5 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Image Preview */}
                    {o.style_image_url ? (
                      <a
                        href={o.style_image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0"
                        title="Open style image"
                      >
                        <img
                          src={o.style_image_url}
                          alt={o.style_name || "Style image"}
                          className="h-12 w-12 rounded-xl object-cover border border-white/10 bg-black/30 hover:scale-[1.03] transition"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </a>
                    ) : (
                      <div className="h-12 w-12 rounded-xl border border-white/10 bg-black/25 flex items-center justify-center text-[10px] text-white/35 shrink-0">
                        No image
                      </div>
                    )}

                    <h3 className="font-semibold text-white truncate">
                      {o.style_name}
                    </h3>
                  </div>

                  <StatusBadge status={o.status} />
                </div>

                <div className="text-sm text-white/55 space-y-1">
                  <p>
                    Measurement:{" "}
                    <span className="text-white/80">{o.measurementId}</span>
                  </p>
                  <p>
                    Fabric:{" "}
                    <span className="text-white/80">
                      {o.fabric_type || "-"}
                    </span>
                  </p>
                  <p>
                    Due:{" "}
                    <span className="text-white/80">{o.due_date || "-"}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="glass rounded-2xl p-8 border-white/10 text-center">
              <p className="text-white/70 text-sm">No orders yet</p>
              <p className="text-white/40 text-xs mt-1">
                Orders will show here once created.
              </p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CustomerDetails;
