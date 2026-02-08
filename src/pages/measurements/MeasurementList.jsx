import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Ruler, Plus, Trash2 } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { toast } from "react-toastify";
import { getMeasurementsByCustomer, deleteMeasurement } from "../../api/measurement.api";

const toDate = (ts) => {
  if (!ts) return "—";
  if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleString();
  return "—";
};

const Field = ({ label, value }) => {
  const normalized =
    value === 0
      ? "0"
      : typeof value === "string"
      ? value.trim()
      : value;

  const display = normalized === "" || normalized == null ? "-" : normalized;

  return (
    <div className="rounded-xl bg-black/25 border border-white/10 p-3">
      <p className="text-xs text-white/45">{label}</p>
      <p className="text-sm text-white/80 mt-1">{display}</p>
    </div>
  );
};

const MeasurementCard = ({ customerId, m, onDeleted }) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteMeasurement(customerId, m.id);
      toast.success("Measurement deleted");
      setOpen(false);
      onDeleted?.(m.id);
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete measurement");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-5 border-white/10 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-white font-semibold">Measurement</h3>
          </div>
          <p className="text-xs text-white/45 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white/35" />
            {toDate(m.createdAt)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Link to={`/orders/new?customer=${customerId}&measurement=${m.id}`}>
            <Button variant="secondary" className="w-full md:w-auto">
              Create Order
            </Button>
          </Link>

          <Button
            variant="danger"
            onClick={() => setOpen(true)}
            className="w-full md:w-auto"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-[#F6E7A6] font-semibold mb-3">Upper Body</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Field label="Chest" value={m.chest} />
          <Field label="Waist" value={m.waist} />
          <Field label="Tummy" value={m.tummy} />
          <Field label="Shoulder" value={m.shoulder} />
          <Field label="Sleeve" value={m.sleeve} />
          <Field label="Round Sleeve" value={m.round_sleeve} />
          <Field label="Neck" value={m.neck} />
          <Field label="Shirt Length" value={m.shirt_length} />
          <Field label="Agbada Length" value={m.agbada_length} />
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-[#F6E7A6] font-semibold mb-3">Trouser / Lower Body</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Field label="Trouser Hip" value={m.trouser_hip} />
          <Field label="Lap" value={m.lap} />
          <Field label="Trouser Length" value={m.trouser_length} />
          <Field label="Cuff Links" value={m.cuff_links} />
        </div>
      </div>

      {m.note ? (
        <div className="pt-4 border-t border-white/10 text-sm text-white/75">
          <span className="text-white/50 font-medium">Note:</span> {m.note}
        </div>
      ) : null}

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Delete Measurement?">
        <p className="text-sm text-white/70">
          This will permanently delete this measurement. This action cannot be undone.
        </p>

        <div className="mt-5 flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setOpen(false)} type="button">
            Cancel
          </Button>
          <Button variant="danger" loading={deleting} onClick={handleDelete} type="button">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const MeasurementList = () => {
  const { id } = useParams(); // customerId
  const [loading, setLoading] = useState(true);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    getMeasurementsByCustomer(id)
      .then(setMeasurements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DashboardLayout title="Measurements" showBack>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">History</h1>
          <p className="text-xs text-white/40 mt-1">Saved measurements for this customer</p>
        </div>

        <Link to={`/customers/${id}/measurements/new`}>
          <Button>
            <Plus className="w-4 h-4" />
            Add Measurement
          </Button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : measurements.length > 0 ? (
        <div className="space-y-4">
          {measurements.map((m) => (
            <MeasurementCard
              key={m.id}
              customerId={id}
              m={m}
              onDeleted={(deletedId) =>
                setMeasurements((prev) => prev.filter((x) => x.id !== deletedId))
              }
            />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-8 border-white/10 text-center">
          <p className="text-white/70 text-sm">No measurements yet</p>
          <p className="text-white/40 text-xs mt-1">
            Add the first measurement to start creating orders.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MeasurementList;
