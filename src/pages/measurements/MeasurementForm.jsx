import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ruler, Save } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { createMeasurement } from "../../api/measurement.api";

const MeasurementForm = () => {
  const { id } = useParams(); // customerId
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sleeve: "",
    shoulder: "",
    round_sleeve: "",
    shirt_length: "",
    trouser_length: "",
    neck: "",
    chest: "",
    tummy: "",
    lap: "",
    waist: "",
    trouser_hip: "",
    cuff_links: "",
    agbada_length: "",
    note: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMeasurement(id, form);
      toast.success("Measurement saved");
      navigate(`/customers/${id}`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to save measurement");
    }
  };

  return (
    <DashboardLayout title="New Measurement">
      <div className="max-w-4xl">
        <div className="glass-strong noise rounded-2xl p-6 border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.45)] mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl glass border-white/10 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Measurement Details</h2>
              <p className="text-xs text-white/45 mt-0.5">
                Fill the fields and save to attach to this customer.
              </p>
            </div>
          </div>
        </div>

        <form
          className="glass rounded-2xl p-6 border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {Object.keys(form).map((key) =>
            key !== "note" ? (
              <Input
                key={key}
                label={key.replaceAll("_", " ").toUpperCase()}
                name={key}
                value={form[key]}
                onChange={handleChange}
              />
            ) : null
          )}

          <div className="md:col-span-2">
            <Input label="NOTE" name="note" value={form.note} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full sm:w-auto">
              <Save className="w-4 h-4" />
              Save Measurement
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default MeasurementForm;
