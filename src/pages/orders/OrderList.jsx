import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import Modal from "../../components/common/Modal";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "../../utils/constants";
import { getOrdersByCustomer, updateOrderStatus, deleteOrder } from "../../api/order.api";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

const OrderList = () => {
  const { id } = useParams(); // customerId
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [savingId, setSavingId] = useState(null);

  // delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [targetOrder, setTargetOrder] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getOrdersByCustomer(id)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChangeLocal = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const saveStatus = async (orderId, status) => {
    try {
      setSavingId(orderId);
      await updateOrderStatus(id, orderId, status);
      toast.success("Order status updated");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update status");
    } finally {
      setSavingId(null);
    }
  };

  const confirmDelete = (order) => {
    setTargetOrder(order);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!targetOrder?.id) return;

    try {
      setDeleting(true);
      await deleteOrder(id, targetOrder.id);
      toast.success("Order deleted");

      setOrders((prev) => prev.filter((o) => o.id !== targetOrder.id));
      setDeleteOpen(false);
      setTargetOrder(null);
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete order");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DashboardLayout title="Orders" showBack>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Customer Orders</h1>
          <p className="text-xs text-white/40 mt-1">Update status or remove orders</p>
        </div>

        <Link to={`/customers/${id}`}>
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" />
            Back to Customer
          </Button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="glass rounded-2xl p-5 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{o.style_name}</h3>
                  <p className="text-xs text-white/45 mt-1">
                    Measurement: <span className="text-white/70">{o.measurementId}</span>
                  </p>
                </div>

                <StatusBadge status={o.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/55">
                <p>
                  Fabric: <span className="text-white/80">{o.fabric_type || "-"}</span>
                </p>
                <p>
                  Due: <span className="text-white/80">{o.due_date || "-"}</span>
                </p>
                <p>
                  Price: <span className="text-white/80">{o.price || "-"}</span>
                </p>
                <p>
                  Color: <span className="text-white/80">{o.fabric_color || "-"}</span>
                </p>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-end gap-3">
                <div className="flex flex-col gap-1 w-full sm:max-w-xs">
                  <label className="text-xs text-white/60">Update Status</label>
                  <select
                    value={o.status || "pending"}
                    onChange={(e) => handleStatusChangeLocal(o.id, e.target.value)}
                    className="glass rounded-xl px-3 py-2.5 text-white outline-none border border-white/10
                               focus:ring-2 focus:ring-[#D4AF37]/60 transition"
                  >
                    {ORDER_STATUS.map((s) => (
                      <option key={s} value={s} className="bg-[#070118]">
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    onClick={() => saveStatus(o.id, o.status || "pending")}
                    loading={savingId === o.id}
                    className="w-full sm:w-auto"
                    type="button"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => confirmDelete(o)}
                    className="w-full sm:w-auto"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 border-white/10 text-center">
          <p className="text-white/70 text-sm">No orders yet</p>
          <p className="text-white/40 text-xs mt-1">Orders created from measurements will appear here.</p>
        </div>
      )}

      <Modal
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setTargetOrder(null);
        }}
        title="Delete Order?"
      >
        <p className="text-sm text-white/70">
          This will permanently delete{" "}
          <span className="text-white font-medium">
            {targetOrder?.style_name || "this order"}
          </span>
          . This action cannot be undone.
        </p>

        <div className="mt-5 flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              setDeleteOpen(false);
              setTargetOrder(null);
            }}
            type="button"
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={deleting}
            onClick={handleDelete}
            type="button"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default OrderList;
