import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, Eye } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { getCustomers, searchCustomersLocal } from "../../api/customer.api";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("") || "—";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => searchCustomersLocal(customers, q),
    [customers, q],
  );

  return (
    <DashboardLayout title="Customers">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div className="w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-9 w-4 h-4 text-white/35" />
            <Input
              label="Search"
              name="search"
              placeholder="Search by name or phone..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Link to="/customers/new">
          <Button>
            <UserPlus className="w-4 h-4" />
            Add Customer
          </Button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="glass rounded-2xl border-white/10 w-full overflow-x-auto shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-left text-white/65">
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-white/10 text-white/80 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-2xl glass border-white/10 flex items-center justify-center text-xs font-semibold text-[#D4AF37]">
                          {initials(c.full_name)}
                        </div>
                        <div className="min-w-0">
                          <p className="capitalize font-medium truncate text-white">
                            {c.full_name}
                          </p>
                          <p className="text-xs text-white/40 truncate">
                            ID: {c.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-white/70">{c.phone}</td>

                    <td className="p-4">
                      <Link to={`/customers/${c.id}`}>
                        <Button variant="secondary">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-10 text-center" colSpan={3}>
                    <p className="text-white/70 text-sm">No customers found</p>
                    <p className="text-white/40 text-xs mt-1">
                      Try a different keyword or add a new customer.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CustomerList;