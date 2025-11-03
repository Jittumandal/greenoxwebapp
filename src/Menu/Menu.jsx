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

const placeholderImg = "/img/Sandwich.jpg";

export default function FoodMenu() {
  // normalize raw menu: flat array + map by slug-key (group name or inferred category)
  const { menuArray, itemsByKey } = useMemo(() => {
    const map = {};
    const arr = Object.values(menuItems).flatMap((v) =>
      Array.isArray(v) ? v : [],
    );

    // group by explicit object keys
    Object.entries(menuItems).forEach(([k, v]) => {
      const key = slugify(k);
      map[key] = Array.isArray(v) ? v.slice() : [];
    });

    // also try grouping by item.category fields if present
    arr.forEach((it) => {
      const catRaw = (it.category || it.cat || it.group || "").toString();
      if (!catRaw) return;
      const key = slugify(catRaw);
      if (!map[key]) map[key] = [];
      map[key].push(it);
    });

    return { menuArray: arr, itemsByKey: map };
  }, []);

  // build left categories list from categories array (All first)
  const categoryList = useMemo(() => {
    const total = menuArray.length;
    const list = [{ key: slugify("All Menu"), name: "All Menu", count: total }];
    categories.forEach((c) => {
      if (c === "All Menu") return;
      const key = slugify(c);
      const count = itemsByKey[key]?.length ?? 0;
      list.push({ key, name: c, count });
    });
    return list;
  }, [categories, menuArray, itemsByKey]);

  const defaultKey = slugify("All Menu");
  const [activeKey, setActiveKey] = useState(defaultKey);

  const activeItems = useMemo(() => {
    if (activeKey === defaultKey) return menuArray;
    // prefer explicit group
    if (itemsByKey[activeKey] && itemsByKey[activeKey].length)
      return itemsByKey[activeKey];
    // fallback: search by name/description matching category label
    const q = activeKey.replace(/-/g, " ");
    return menuArray.filter((it) =>
      `${it.name || ""} ${it.description || ""}`.toLowerCase().includes(q),
    );
  }, [activeKey, defaultKey, menuArray, itemsByKey]);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = placeholderImg;
  };

  return (
    <section className="menu-bg">
      <img
        alt="About Background"
        className="h-200 menubg absolute left-0 top-0 -z-10 w-full object-cover"
        src="menuimg/menubg.svg"
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
                {categoryList.map((cat) => {
                  const isActive = activeKey === cat.key;
                  const thumb = `/img/menu/${cat.key}.jpg`;
                  return (
                    <li key={cat.key}>
                      <button
                        onClick={() => setActiveKey(cat.key)}
                        aria-current={isActive ? "true" : "false"}
                        className={`flex w-full items-center gap-4 px-4 py-2 text-left transition-all duration-150 ${
                          isActive
                            ? "text-white-700 bg-green-200 shadow-sm ring-1 ring-green-100"
                            : "bg-white text-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`h-14 w-14 flex-none overflow-hidden rounded-md bg-white shadow-sm ${isActive ? "ring-1 ring-green-100" : ""}`}
                        >
                          <img
                            src={thumb}
                            onError={handleImgError}
                            alt={cat.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="grow">
                          <div className="text-sm font-medium">{cat.name}</div>
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
              {/* <p className="text-sm text-gray-500">
                {activeItems.length} items
              </p> */}

              <form className="relative w-[300px] max-w-[50vw]">
                <label
                  for="default-search"
                  className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search Menu..."
                    required
                  />
                  <button
                    type="submit"
                    className="absolute bottom-2.5 end-2.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {activeItems.map((item) => {
                const itemId = item.id ?? item.name;
                return (
                  <Link
                    key={itemId}
                    to={`/menu/${encodeURIComponent(activeKey)}/${encodeURIComponent(itemId)}`}
                    className="group flex items-start gap-4 rounded-lg bg-white p-4 shadow-lg transition-shadow hover:shadow-lg"
                  >
                    <img
                      src={item.img || placeholderImg}
                      onError={handleImgError}
                      alt={item.name}
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

        {/* Mobile: horizontal category bar (show on small screens only) */}
        {/* <div className="mt-6 block flex gap-2 overflow-x-auto lg:hidden">
          {categoryList.map((cat) => {
            const key = cat.key;
            const active = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${active ? "bg-green-600 text-white" : "border border-gray-200 bg-white text-gray-700"}`}
              >
                {cat.name}
              </button>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}
