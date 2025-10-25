import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const MENU = [
  {
    id: 1,
    label: "38 Barracks",
    img: "/menuimg/menu.avif",
    price: 2000,
    category: "North Indian",
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    rating: "4.5",
    isPromoted: true,
    discount: "Flat 15% OFF",
  },
  {
    id: 2,
    label: "Cheese Volcano Chicken Delight",
    img: "/menuimg/menu2.avif",
    price: 369,
    category: "North Indian",
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Vasundhara Sector 18, Ghaziabad",
    distance: "1.5 km",
    rating: "4.5",
    isPromoted: true,
    discount: "Flat 15% OFF",
  },
  {
    id: 3,
    label: "Cheese Volcano Double Chicken",
    img: "/menuimg/menu3.avif",
    price: 429,
    category: "North Indian",
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Complex Noida Sector 62, Noida",
    distance: "1.5 km",
    rating: "4.5",
    isPromoted: true,
    discount: "Flat 15% OFF",
  },
  {
    id: 4,
    label: "Classic Caesar Salad (Veg)",
    img: "/menuimg/salad.avif",
    price: 295,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: [], // removed "Veg" and "Healthy" tags
    category: "Salads",
    desc: "", // removed "Loaded with fresh veggies and oregano."
    isVeg: true,
    showBadge: false, // hide Veg badge for this item
  },
  {
    id: 5,
    label: "Crispy Chicken Burger",
    img: "/menuimg/menu5.avif",
    price: 199,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Burgers"],
    category: "Wholesome Meal",
    desc: "Crispy chicken patty with lettuce & mayo.",
    isVeg: false,
  },
  {
    id: 6,
    label: "Classic Fries",
    img: "/menuimg/menu6.avif",
    price: 99,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Sides"],
    category: "Fries & Sides",
    desc: "Golden crunchy fries.",
    isVeg: true,
  },
  {
    id: 7,
    label: "GreeNox Cappuccino",
    img: "/menuimg/menu7.avif",
    price: 129,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Beverages"],
    category: "GreeNox® Coffees",
    desc: "Rich espresso with frothed milk.",
    isVeg: true,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu8.avif",
    price: 159,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Shareable"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu9.avif",
    price: 159,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Shareable"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu10.avif",
    price: 159,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Shareable"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu11.avif",
    price: 159,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Sandwich"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu12.avif",
    price: 159,
    cuisines: ["North Indian", "Biryani", "Chinese"],
    location: "Shakti Khand 4, Indirapuram, Ghaziabad",
    distance: "1.5 km",
    tags: ["Shareable"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu13.avif",
    price: 159,
    tags: ["Shareable"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu14.avif",
    price: 159,
    tags: ["Shareable"],
    category: "McNuggets® & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu15.avif",
    price: 159,
    tags: ["Shareable"],
    category: "Wholesome Meal",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu16.webp",
    price: 159,
    tags: ["Burrito Bowl"],
    category: "Wholesome Meal",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu17.webp",
    price: 159,
    tags: ["Sub"],
    category: "Burrito Bowl & McCrispy™ Strips",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu18.avif",
    price: 159,
    tags: ["Burrito Bowl"],
    category: "Burrito Bowl",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu19.avif",
    price: 159,
    tags: ["Healthy Rice Bowls"],
    category: "Burrito Bowl",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
  {
    id: 8,
    label: "McNuggets (6 pcs)",
    img: "/menuimg/menu20.webp",
    price: 159,
    tags: ["Pasta (Durum Wheat)"],
    category: "Burrito Bowl",
    desc: "Tender chicken nuggets with dip.",
    isVeg: false,
  },
];

const CATEGORIES = [
  "All",
  "North Indian",
  "Salads",
  "Wholesome Meal",
  "Burrito Bowl",
  "Sub",
  "Wrap",
  "Sandwich",
  "Healthy Rice Bowls",
  "Healthy Desserts Jar",
  "Pasta (Durum Wheat)",
  "Burger (Whole Wheat Goodness)",
  "Medley Smoothie Bowl",
  "Cold Coffee",
  "Shake & Smoothies",
  "Fresh Juice",
  "Mocktails",
  "Cookies",
  "Greenox Gourmet",
  "Gourmet Soups",
];

export default function AllMenuIteams() {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return MENU.filter((item) => {
      const matchCat = activeCat === "All" ? true : item.category === activeCat;
      const matchQuery =
        query.trim() === ""
          ? true
          : item.label.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCat, query]);

  return (
    <div className="mt-12 min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8 pt-12">
      <img
        alt="About Background"
        className="h-300 absolute left-0 top-0 w-full object-cover"
        src="menuimg/menubg.svg"
      />
      <div className="flex justify-center py-12 text-center">
        <div className="mb-8">
          <p className="mb-4 mt-12 text-white">Popular Menu</p>
          <h2 className="text-4xl font-semibold text-white">
            Delicious Food Menu
          </h2>
          <span className="mt-2 block w-full border-b-4 border-orange-500 bg-orange-50"></span>
        </div>
      </div>

      <div className="FullMenu mx-auto mt-12 max-w-7xl rounded-sm bg-white p-6 px-4">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu..."
              className="rounded-full border border-gray-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
              type="search"
            />
            <Link
              to="/"
              className="rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Category tabs (horizontal scroll) */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-4 whitespace-nowrap">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-b-2 border-green-600 bg-white text-green-600 shadow"
                      : "bg-transparent text-gray-600 hover:text-green-600"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl p-4 transition-shadow hover:shadow-md"
            >
              <div className="relative h-48">
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-full w-full rounded-md object-cover"
                />

                {item.isPromoted && (
                  <div className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                    Promoted
                  </div>
                )}

                {item.discount && (
                  <div className="absolute bottom-3 left-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">
                      {item.discount}
                    </div>
                  </div>
                )}

                {item.rating && (
                  <div className="absolute bottom-3 right-3">
                    <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-medium">
                      <span className="text-green-700">{item.rating}</span>
                      <span className="text-green-700">★</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.label}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="mt-1 text-sm text-gray-500">
                    {item.cuisines?.join(", ")}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      ₹{item.price} <span>for two</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm text-gray-500">{item.location}</div>
                  <div className="text-md text-black-400 mt-1 font-semibold">
                    {item.distance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-12 text-center text-gray-500">No items found.</div>
        )}

        {/* CTA at bottom */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/subscription"
            className="rounded border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50"
          >
            View Subscription Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
