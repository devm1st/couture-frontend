import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { createCustomer } from "../../api/customer.api";
import { UserPlus, Save } from "lucide-react";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    gender: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(form);
      toast.success("Customer added");
      navigate("/customers");
    } catch (e) {
      console.error(e);
      toast.error("Failed to add customer");
    }
  };

  return (
    <DashboardLayout title="Add Customer">
      <div className="max-w-xl">
        <div className="glass-strong noise rounded-2xl p-6 border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.45)] mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl glass border-white/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Customer Information</h2>
              <p className="text-xs text-white/45 mt-0.5">
                Fill the details below to create a customer.
              </p>
            </div>
          </div>
        </div>

        <form className="glass rounded-2xl p-6 border-white/10 space-y-4" onSubmit={handleSubmit}>
          <Input label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
          <Input label="Gender" name="gender" value={form.gender} onChange={handleChange} />
          <Input label="Notes" name="notes" value={form.notes} onChange={handleChange} />

          <Button type="submit" className="w-full sm:w-auto">
            <Save className="w-4 h-4" />
            Save
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CustomerForm;
