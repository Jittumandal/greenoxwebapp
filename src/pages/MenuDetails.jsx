import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import menuItems from "../data/menuItems";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-semibold">{title}</span>
        <span className="text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  );
}

export default function MenuItemDetail() {
  const { category: categoryParam, id: idParam } = useParams();
  const { menuArray, itemsByKey } = useMemo(() => {
    const arr = Object.values(menuItems).flatMap((v) =>
      Array.isArray(v) ? v : [],
    );
    const map = {};
    Object.entries(menuItems).forEach(([k, v]) => {
      map[slugify(k)] = Array.isArray(v) ? v.slice() : [];
    });
    return { menuArray: arr, itemsByKey: map };
  }, []);

  const categoryKey = decodeURIComponent(categoryParam || "");
  const idRaw = decodeURIComponent(idParam || "");

  const candidates =
    categoryKey === slugify("All Menu") ||
    categoryKey === slugify("All Menu Items") ||
    categoryKey === "all-menu"
      ? menuArray
      : itemsByKey[categoryKey] ||
        menuArray.filter((it) =>
          `${it.name || ""} ${it.description || ""}`
            .toLowerCase()
            .includes((categoryKey || "").replace(/-/g, " ")),
        );

  const item =
    candidates.find((it) => String(it.id) === idRaw) ||
    candidates.find((it) => it.id && Number(it.id) === Number(idRaw)) ||
    candidates.find((it) => it.name && slugify(it.name) === slugify(idRaw)) ||
    candidates.find((it) => it.name && it.name === idRaw);

  if (!item) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Item not found</h1>
        <p className="mb-4">
          Category: {categoryKey || "—"}, ID: {idRaw || "—"}
        </p>
        <Link to="/menu" className="text-green-600 underline">
          Back to menu
        </Link>
      </main>
    );
  }

  const nutrition = item.nutritionInfo || {};
  // panel state used by the Nutrition / Allergen accordions
  const [openNutrition, setOpenNutrition] = useState(true);
  const [openAllergens, setOpenAllergens] = useState(false);
  const allergens = item.allergens || [];

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/menu/menubg.svg"; // ensure placeholder exists in public/img
  };

  return (
    <section>
      {/* Hero Section */}
      <div className="relative mt-20 h-[300px]">
        <div className="absolute inset-0">
          <img
            src="/img/menu-banner.jpg"
            alt="Menu Banner"
            onError={handleImgError}
            className="h-full w-full object-cover opacity-50"
          />
        </div>
      </div>
      <main className="main_box mx-auto max-w-7xl px-6">
        <Link
          to={`/menu/${encodeURIComponent(categoryKey)}`}
          className="mb-6 inline-block text-green-600"
        >
          ← Back to Menu
        </Link>

        <div className="mx-auto max-w-7xl rounded-lg bg-white px-4 py-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
              <img
                src={item.image || item.img}
                alt={item.name}
                className="h-100 w-full rounded-lg object-cover md:h-full"
              />
            </div>

            {/* Details */}
            <div className="p-8">
              <h1 className="mb-2 text-3xl font-extrabold text-gray-900">
                {item.name}
              </h1>
              <p className="mb-4 text-sm text-gray-500">{item.subtitle}</p>

              <div className="mb-6 flex items-center gap-6">
                <div>
                  <div className="text-xs text-gray-500">Calories</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {nutrition.calories}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="text-lg font-bold text-orange-500">
                    ₹{item.price}
                  </div>
                </div>
              </div>

              <p className="mb-6 text-gray-700">{item.description}</p>

              {/* <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <button
                className="w-full rounded-lg bg-green-600 px-5 py-3 text-white shadow transition hover:bg-green-700"
                title="Add to cart"
              >
                Add to Cart
              </button>
              <button
                className="w-full rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700 transition hover:shadow"
                title="Customize"
              >
                Customize
              </button>
            </div> */}
            </div>
          </div>
        </div>
      </main>

      <div className="freshmealplan mx-auto mt-16 w-full py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-8 text-center text-4xl font-extrabold text-green-500">
            Nutritional Information
          </h1>
          {/* Accordion: Nutrition */}
          <div className="mt-6 rounded-lg border border-gray-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenNutrition((s) => !s)}
              aria-expanded={openNutrition}
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  Nutrition summary
                </div>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  openNutrition ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openNutrition && (
              <div className="border-t border-gray-100 px-6 py-5">
                {/* Main nutrition metrics */}
                <div className="mb-8 grid grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.calories}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.protein}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.carbs}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Total Carbs (17% DV)
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.fat}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Total Fat (50% DV)
                    </div>
                  </div>
                </div>

                {/* Detailed nutrition table */}
                {/* <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Saturated Fat:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          13g (67% DV)
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Trans Fat:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          0.5g
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Cholesterol:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          280mg (93% DV)
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Dietary Fiber:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          4g (13% DV)
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Total Sugars:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          2g
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Added Sugars:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          1g (1% DV)
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Vitamin D:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          4mcg (15% DV)
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">Calcium:</span>
                        <span className="text-sm font-medium text-gray-900">
                          184mg (10% DV)
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">Iron:</span>
                        <span className="text-sm font-medium text-gray-900">
                          3.5mg (22% DV)
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">
                          Potassium:
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          660mg (16% DV)
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span className="text-sm text-gray-600">Sodium:</span>
                        <span className="text-sm font-medium text-gray-900">
                          1150mg (50% DV)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-gray-500">
                    *Percent Daily Values (DV) are based on a 2,000 calorie diet
                  </p>
                </div> */}
              </div>
            )}
          </div>

          {/* Accordion: Allergens */}
          <div className="mt-4 rounded-lg border border-gray-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenAllergens((s) => !s)}
              aria-expanded={openAllergens}
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  Allergen Information
                </div>
                {/* <div className="text-xs text-gray-500">
                  Ingredients that may cause allergies
                </div> */}
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform ${
                  openAllergens ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openAllergens && (
              <div className="border-t border-gray-100 px-6 py-5">
                <p className="mb-2 text-sm text-gray-600">Contains:</p>
                <div className="flex flex-wrap gap-2">
                  {allergens.map((a) => (
                    <span
                      key={a}
                      className="rounded bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
