import { Link } from "react-router-dom";

const menuItems = [
  { label: "Monopoly at GreeNox's Menu", img: "/menuimg/menu.avif" },
  { label: "Extra Value Meals", img: "/menuimg/menu2.avif" },
  { label: "Happy Meal®", img: "/menuimg/menu3.avif" },
  { label: "Snack Wrap®", img: "/menuimg/menu4.avif" },
  { label: "McValue™", img: "/menuimg/menu5.avif" },
  { label: "Breakfast", img: "/menuimg/menu6.avif" },
  { label: "Burgers", img: "/menuimg/menu7.avif" },
  { label: "Extra Value Meals", img: "/menuimg/menu8.avif" },
  { label: "Happy Meal®", img: "/menuimg/menu9.avif" },
  { label: "Snack Wrap®", img: "/menuimg/menu10.avif" },
  { label: "McValue™", img: "/menuimg/menu11.avif" },
  { label: "Breakfast", img: "/menuimg/menu12.avif" },
  { label: "Burgers", img: "/menuimg/menu13.avif" },
  { label: "Chicken & Fish Sandwiches", img: "/menuimg/menu14.avif" },
  { label: "McNuggets® & McCrispy™ Strips", img: "/menuimg/menu15.avif" },
  { label: "Fries & Sides", img: "/menuimg/menu16.avif" },
  { label: "Sweets & Treats", img: "/menuimg/menu17.avif" },
  { label: "McCafé® Coffees", img: "/menuimg/menu18.avif" },
  { label: "Beverages", img: "/menuimg/menu19.avif" },
];

export default function MegaDropdown({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="leftmargin absolute left-0 top-full z-50 mt-3 bg-transparent">
      <div className="mx-auto w-full max-w-screen-xl rounded-md bg-white p-6">
        <div className="flex gap-6">
          {/* Left column: categories */}
          <div className="w-2/5">
            <h4 className="mb-4 text-sm font-bold text-gray-600">
              Explore Categories
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {menuItems.slice(0, 12).map((it, i) => (
                <Link
                  key={i}
                  to="/allmenuiteams"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50"
                >
                  <img
                    src={it.img}
                    alt={it.label}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <span className="text-sm text-gray-800">{it.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center: popular */}
          <div className="w-2/5 border-l border-r border-gray-100 px-6">
            <h4 className="mb-4 text-sm font-bold text-gray-600">Popular</h4>
            <div className="grid grid-cols-2 gap-4">
              {menuItems.slice(6, 12).map((it, i) => (
                <Link
                  key={i}
                  to="/allmenuiteams"
                  onClick={onClose}
                  className="group block overflow-hidden rounded-lg bg-gray-50 p-3 hover:shadow-md"
                >
                  <img
                    src={it.img}
                    alt={it.label}
                    className="mb-3 h-20 w-full rounded object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="text-sm font-medium text-gray-800">
                    {it.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: promo CTA */}
          <div className="w-1/5">
            <img
              src="/menuimg/menu24.avif"
              alt="promo"
              className="mb-4 h-40 w-full rounded object-cover"
            />
            <Link
              to="/allmenuiteams"
              onClick={onClose}
              className="block rounded bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-green-700"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
