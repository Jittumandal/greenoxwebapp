import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function Sidebar() {
  // category list + thumbnail image (put images under public/img/menu/)
  const categories = [
    "Lunch",
    "Dinner",
    "Snacks",
    "Beverages",
    "Salads",
    "Soups",
    "Desserts",
    "Healthy Bowls",
    "Smoothies",
    "Juices",
    "Protein Meals",
    "Vegan Specials",
    "Gluten Free",
    "Keto Options",
    "Kids Menu",
  ].map((label) => ({
    key: slugify(label),
    label,
    img: `/img/menu/${slugify(label)}.jpg`,
  }));

  const [active, setActive] = useState(categories[0].key);

  useEffect(() => {
    // ensure active set if categories change
    if (!active && categories.length) setActive(categories[0].key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/placeholder.png";
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-72 border-r border-gray-100 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-green-600 font-bold text-white">
              G
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">Greenox</div>
              <div className="text-xs text-gray-400">Food Ltd</div>
            </div>
          </div>
        </div>

        <nav className="px-3 pb-6">
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.key}>
                <Link
                  to={`/menu/${cat.key}`}
                  onClick={() => setActive(cat.key)}
                  className={`flex items-center gap-4 rounded-lg px-3 py-2 transition-colors ${
                    active === cat.key
                      ? "bg-green-50 text-green-700 ring-1 ring-green-100"
                      : "text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      onError={handleImgError}
                      className="h-14 w-14 rounded-md object-cover shadow-sm"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-medium leading-tight">
                      {cat.label}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-lg bg-gradient-to-r from-green-600 to-teal-500 p-3 text-white">
            <div className="text-xs">Greenox Food Ltd</div>
            <div className="mt-1 text-sm font-semibold">
              Healthy food & meals
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
