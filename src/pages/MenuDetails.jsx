import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
        type="button"
      >
        <span className="font-semibold">{title}</span>
        <span className="text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  );
}

export default function MenuItemDetail() {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history && window.history.length > 1) navigate(-1);
    else navigate("/menu");
  };

  const { category: categoryParam, id: idParam } = useParams();
  const categoryDecoded = decodeURIComponent(categoryParam || "");
  const idRaw = decodeURIComponent(idParam || "");

  const { menuArray, itemsByKey, groupNameBySlug } = useMemo(() => {
    const arr = Object.values(menuItems).flatMap((v) =>
      Array.isArray(v) ? v : [],
    );
    const map = {};
    const nameMap = {};
    Object.entries(menuItems).forEach(([k, v]) => {
      const s = slugify(k);
      map[s] = Array.isArray(v) ? v.slice() : [];
      nameMap[s] = k;
    });
    return { menuArray: arr, itemsByKey: map, groupNameBySlug: nameMap };
  }, []);

  const categorySlug = slugify(categoryDecoded);

  // primary candidates from explicit groups (by slug)
  let candidates =
    categorySlug === slugify("All Menu")
      ? menuArray
      : itemsByKey[categorySlug] || [];

  // if primary candidates empty, attempt to find group by name match (case-insensitive)
  if ((!candidates || candidates.length === 0) && categoryDecoded) {
    const entry = Object.entries(menuItems).find(
      ([groupName]) =>
        groupName.toLowerCase() === categoryDecoded.toLowerCase(),
    );
    if (entry) candidates = Array.isArray(entry[1]) ? entry[1] : [];
  }

  // final fallback: fuzzy filter across all items using the decoded category text
  if ((!candidates || candidates.length === 0) && categoryDecoded) {
    const q = categoryDecoded.replace(/-/g, " ").toLowerCase();
    candidates = menuArray.filter((it) =>
      `${it.name || ""} ${it.description || ""}`.toLowerCase().includes(q),
    );
  }

  // find item by id (try strict string match, numeric match, slug match of name, or name exact)
  const item =
    candidates.find((it) => String(it.id) === idRaw) ||
    candidates.find((it) => it.id && Number(it.id) === Number(idRaw)) ||
    candidates.find((it) => it.name && slugify(it.name) === slugify(idRaw)) ||
    candidates.find((it) => it.name && it.name === idRaw);

  if (!item) {
    // show available items in resolved group if any
    const resolvedGroupName =
      groupNameBySlug[categorySlug] || categoryDecoded || "Unknown";
    const groupList =
      (itemsByKey[categorySlug] && itemsByKey[categorySlug].slice()) || [];

    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Item not found</h1>
        <p className="mb-2">
          Category: <strong>{resolvedGroupName}</strong>, ID:{" "}
          <strong>{idRaw || "—"}</strong>
        </p>

        {groupList.length > 0 ? (
          <>
            <p className="mb-2">Available items in this category:</p>
            <ul className="mb-4 list-disc pl-5">
              {groupList.map((g) => (
                <li key={String(g.id)}>
                  <Link
                    to={`/menu/${encodeURIComponent(resolvedGroupName)}/${encodeURIComponent(
                      String(g.id),
                    )}`}
                    className="text-green-600 underline"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mb-4 text-sm text-gray-600">
            No items found for this category.
          </p>
        )}

        <button
          onClick={handleBack}
          type="button"
          className="text-green-600 underline"
        >
          Back to menu
        </button>
      </main>
    );
  }

  const nutrition = item.nutritionInfo || {};
  const [openNutrition, setOpenNutrition] = useState(true);
  const [openAllergens, setOpenAllergens] = useState(false);
  const allergens = item.allergens || [];

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/menu/menubg.svg";
  };

  return (
    <section>
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
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-green-600 hover:underline"
          type="button"
        >
          ← Back to Menu
        </button>

        <div className="mx-auto max-w-7xl rounded-lg bg-white px-4 py-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
              <img
                src={item.image || item.img}
                alt={item.name}
                onError={handleImgError}
                className="h-100 w-full rounded-lg object-cover md:h-full"
              />
            </div>

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
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto mt-16 w-full py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-8 text-center text-4xl font-extrabold text-green-500">
            Nutritional Information
          </h1>

          <div className="mt-6 rounded-lg border border-gray-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenNutrition((s) => !s)}
              aria-expanded={openNutrition}
              type="button"
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  Nutrition summary
                </div>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform ${openNutrition ? "rotate-180" : ""}`}
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
                      Total Carbs
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.fat}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Total Fat</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-gray-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenAllergens((s) => !s)}
              aria-expanded={openAllergens}
              type="button"
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  Allergen Information
                </div>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform ${openAllergens ? "rotate-180" : ""}`}
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
