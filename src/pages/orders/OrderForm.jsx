import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Shirt, CalendarDays, PlusCircle } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { createOrder } from "../../api/order.api";
import { ORDER_STATUS } from "../../utils/constants";

const OrderForm = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customer");
  const measurementId = searchParams.get("measurement");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    style_name: "",
    style_description: "",
    style_image_url: "",
    fabric_type: "",
    fabric_color: "",
    fabric_notes: "",
    price: "",
    due_date: "",
    status: "pending",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) return toast.error("Missing customer id");
    if (!measurementId) return toast.error("Missing measurement id");
    if (!form.style_name.trim()) return toast.error("Style name is required");

    try {
      await createOrder(customerId, {
        measurementId,
        ...form,
      });

      toast.success("Order created");
      navigate(`/customers/${customerId}`);
    } catch (e) {
      console.error(e);
      toast.error(e?.message || "Failed to create order");
    }
  };

  return (
    <DashboardLayout title="New Order">
      <div className="max-w-2xl">
        <div className="glass-strong noise rounded-2xl p-6 border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.45)] mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl glass border-white/10 flex items-center justify-center">
              <Shirt className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Order Information</h2>
              <p className="text-xs text-white/45 mt-0.5">
                Create a new order from this measurement.
              </p>
            </div>
          </div>
        </div>

        <form className="glass rounded-2xl p-6 border-white/10 space-y-4" onSubmit={handleSubmit}>
          <Input label="Style Name" name="style_name" value={form.style_name} onChange={handleChange} required />
          <Input label="Style Description" name="style_description" value={form.style_description} onChange={handleChange} />
          <Input label="Style Image URL" name="style_image_url" value={form.style_image_url} onChange={handleChange} placeholder="https://thiings.io/..." />
          <Input label="Fabric Type" name="fabric_type" value={form.fabric_type} onChange={handleChange} />
          <Input label="Fabric Color" name="fabric_color" value={form.fabric_color} onChange={handleChange} />
          <Input label="Fabric Notes" name="fabric_notes" value={form.fabric_notes} onChange={handleChange} />
          <Input label="Price" name="price" value={form.price} onChange={handleChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input type="date" label="Due Date" name="due_date" value={form.due_date} onChange={handleChange} />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-white/60">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
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
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            <PlusCircle className="w-4 h-4" />
            Create Order
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default OrderForm;
