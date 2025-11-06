import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { categories, menuItems } from "../data/menuItems";

// helper: slugify and titleize
const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const titleize = (s = "") =>
  s
    .toString()
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .trim();

const placeholderImg = "/img/menu/logo.jpg";

export default function FoodMenu() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // normalize raw menu: flat array + map by slug-key (group name)
  const { menuArray, itemsByKey } = useMemo(() => {
    // create flat array of all items (from the explicit menuItems groups)
    const arr = Object.values(menuItems).flatMap((v) =>
      Array.isArray(v) ? v : [],
    );

    // build itemsByKey ONLY from the explicit menuItems groups (avoid mixing by item.category)
    const map = Object.entries(menuItems).reduce((acc, [groupName, items]) => {
      const key = slugify(groupName);
      acc[key] = Array.isArray(items) ? items.slice() : [];
      return acc;
    }, {});

    return { menuArray: arr, itemsByKey: map };
  }, []);

  // ensure we can accept categories exported as strings or objects; fallback to menuItems keys
  const rawCategories = Array.isArray(categories)
    ? categories
    : Object.keys(menuItems).map((k) => k);

  const ALL_KEY = "All Menu"; // use raw name as active key

  // build left categories list from categories array (All first)
  const categoryList = useMemo(() => {
    const total = menuArray.length;
    const list = [
      { key: ALL_KEY, name: "All Menu", slug: slugify(ALL_KEY), count: total },
    ];

    rawCategories.forEach((c) => {
      const name = typeof c === "string" ? c : String(c?.name ?? "");
      if (!name || name === ALL_KEY) return;
      const slug = slugify(name);
      const count = itemsByKey[slug]?.length ?? 0;
      // keep both raw name (key) and slug for lookups
      list.push({ key: name, name, slug, count });
    });

    return list;
  }, [rawCategories, menuArray, itemsByKey]);

  // set default active to ALL_KEY so page shows full menu by default
  const [activeKey, setActiveKey] = useState(ALL_KEY);

  const activeItems = useMemo(() => {
    const qSearch = (searchQuery || "").toString().trim().toLowerCase();
    if (qSearch) {
      return menuArray.filter((it) =>
        `${it.name || ""} ${it.description || ""}`
          .toLowerCase()
          .includes(qSearch),
      );
    }

    // show full menu only when ALL_KEY is selected
    if (activeKey === ALL_KEY) return menuArray;

    // prefer lookup by slug of the activeKey (itemsByKey built on slugs)
    const activeSlug = slugify(activeKey);
    if (itemsByKey[activeSlug] && itemsByKey[activeSlug].length)
      return itemsByKey[activeSlug];

    // fallback: fuzzy match using readable name
    const q = activeKey.replace(/-/g, " ");
    return menuArray.filter((it) =>
      `${it.name || ""} ${it.description || ""}`.toLowerCase().includes(q),
    );
  }, [activeKey, ALL_KEY, menuArray, itemsByKey, searchQuery]);

  // add this line so links use slugified category (no spaces / %20)
  const activeSlug = slugify(activeKey);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = placeholderImg;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput || "");
  };
  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  return (
    <section className="menu-bg">
      <img
        alt="About Background"
        className="h-200 menubg absolute left-0 top-0 -z-10 w-full object-cover"
        src="img/menubg.svg"
      />
      {/* Hero Section */}
      <div className="relative h-[230px]">
        <div className="absolute inset-0">
          <img
            src="/img/menu-banner.jpg"
            alt="Menu Banner"
            className="h-full w-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
          <h1 className="mb-4 text-4xl font-bold">Popular Menu</h1>
          <h2 className="text-6xl font-bold">Delicious Food Menu</h2>
        </div>
      </div>
      <div className="mx-auto w-full px-4">
        <div className="flex gap-6">
          {/* Left categories sidebar */}
          <aside
            className="custom-scrollbar sticky top-20 hidden w-80 flex-col gap-4 overflow-y-auto rounded-lg bg-white shadow-lg lg:flex"
            style={{ maxHeight: "calc(100vh - 6rem)" }}
          >
            <nav className="flex-1">
              <ul className="space-y-1">
                {categoryList.map((cat, idx) => {
                  const isActive = activeKey === cat.key;
                  const thumbPath =
                    cat.thumb || `/img/menu/thumbs/${slugify(cat.key)}.jpg`;
                  return (
                    <li key={`${cat.slug ?? slugify(cat.key)}-${idx}`}>
                      <button
                        type="button"
                        onClick={() => setActiveKey(cat.key)}
                        className={`flex w-full items-center gap-4 px-4 py-2 text-left ${isActive ? "border-l-4 border-green-600 bg-white" : "bg-white"}`}
                      >
                        <div className="h-12 w-12 flex-none overflow-hidden rounded-md bg-gray-100">
                          <ThumbImage
                            cat={cat}
                            alt={cat.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-md font-small text-gray-900">
                            {cat.name}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-4 px-2">
              <div className="rounded-lg bg-gradient-to-r from-green-600 to-teal-500 p-3 text-white">
                <div className="text-xs">Greenox Food Ltd</div>
                <div className="mt-1 text-sm font-semibold">
                  Healthy food & meals
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between rounded bg-white p-3 shadow-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-green-500">
                {categoryList.find((c) => c.key === activeKey)?.name ?? "Menu"}
              </h2>

              <form
                className="relative w-[300px] max-w-[50vw]"
                onSubmit={handleSearchSubmit}
              >
                <label
                  htmlFor="default-search"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search Menu..."
                  />
                  <button
                    type="submit"
                    className="absolute bottom-2.5 right-2.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Search
                  </button>
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute bottom-2.5 right-24 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {activeItems.map((item, idx) => {
                const itemId =
                  typeof item.id !== "undefined"
                    ? String(item.id)
                    : encodeURIComponent(String(item.name ?? `item-${idx}`));
                return (
                  <Link
                    key={`${activeKey}-${itemId}`}
                    to={`/menu/${encodeURIComponent(activeSlug)}/${encodeURIComponent(itemId)}`}
                    className="group flex items-start gap-4 rounded-lg bg-white p-4 shadow-lg transition-shadow hover:shadow-lg"
                  >
                    <img
                      src={item.img || placeholderImg}
                      onError={handleImgError}
                      alt={String(item.name)}
                      className="h-32 w-32 flex-none rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-green-600">
                        {item.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-base font-semibold text-green-600">
                          {item.price
                            ? String(item.price).startsWith("₹")
                              ? item.price
                              : `₹${item.price}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Try multiple candidate paths for a category thumbnail.
 * Falls back to /img/menu/placeholder.jpg when none found.
 */
function ThumbImage({ cat = {}, className = "", alt = "" }) {
  const baseName = cat.slug ?? slugify(cat.key ?? cat.name ?? "");
  const candidates = [
    cat.thumb, // explicit path if available
    `/img/menu/thumbs/${baseName}.jpg`,
    `/img/menu/thumbs/${baseName.replace(/-/g, "")}.jpg`,
    `/img/menu/thumbs/${baseName.replace(/-/g, "_")}.jpg`,
    `/img/menu/thumbs/${encodeURIComponent(cat.name || baseName)}.jpg`,
  ].filter(Boolean);

  const [idx, setIdx] = useState(0);
  const src = candidates[idx] || "/img/menu/salads.jpg";

  return (
    <img
      src={encodeURI(src)}
      alt={alt || cat.name}
      className={className}
      onError={(e) => {
        // try next candidate, then finally placeholder
        e.currentTarget.onerror = null;
        if (idx < candidates.length - 1) {
          setIdx((i) => i + 1);
        } else {
          e.currentTarget.src = "/img/menu/salads.jpg";
        }
      }}
    />
  );
}
