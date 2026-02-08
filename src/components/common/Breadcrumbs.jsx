import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items = [] }) {
  // items: [{ label: "Customers", to: "/customers" }, { label: "New" }]
  return (
    <div className="flex flex-wrap items-center gap-1 text-sm text-white/60">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1">
            {idx !== 0 ? <ChevronRight className="w-4 h-4" /> : null}
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-yellow-300 transition">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-white/85 font-medium" : ""}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
