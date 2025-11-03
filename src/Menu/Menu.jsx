import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const categories = [
  "All Menu",
  "Breakfast",
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
  "Seasonal Specials",
  "Combos",
  "Subscription Plans",
  "Promotions",
  "Wraps",
  "Sandwiches",
  "Pizzas",
  "Pasta",
  "Rice Bowls",
  "Grills",
  "Breakfast Bowls",
  "Cereals",
  "Parfaits",
  "Cold Pressed",
  "Detox",
  "Energy Bars",
  "Salad Bowls",
  "Quinoa Bowls",
  "Protein Shakes",
  "Tea & Coffee",
  "Cold Beverages",
  "Hot Soups",
  "Fermented",
  "Low Carb",
  "High Protein",
  "Sides",
  "Dips",
  "Street Food",
  "Indian Specials",
  "Mediterranean",
  "Dessert Bowls",
  "Ice Creams",
];

const menuItems = {
  special: [
    {
      id: 1,
      name: "ABC Red Nutritional Juice for Immunity - No Sugar No Water No Preservatives",
      price: 199,
      description:
        "Apple Beetroot Carrot Ginger Lime Freshly Cold Pressed Juice - No Sugar No Water No Preservatives",
      img: "/img/menu/ABC Red Nutritional Juice.jpg",
      nutritionInfo: {
        calories: "120 Cal",
        protein: "1g",
        carbs: "28g",
        fat: "0g",
      },
      allergens: [],
      pairs: [],
    },
    {
      id: 2,
      name: "Cottage Cheese Salad",
      price: 249,
      description:
        "Cottage Cheese Grilled Pineapple Bellpepper Cherry Tomato Mix Lettuce Tomato Cucumber Carrot Coriander Mix Herb Choice of Salad Dressing",
      img: "/img/menu/Assorted Veggies & Quinoa Salad .jpg",
      nutritionInfo: {
        calories: "420 Cal",
        protein: "18g",
        carbs: "20g",
        fat: "28g",
      },
      allergens: ["Milk"],
      pairs: [],
    },
    {
      id: 3,
      name: "Basil Pesto Pasta Salad",
      price: 279,
      description:
        "Mixed grilled vegetables on a bed of quinoa with lemon herb dressing",
      img: "/img/menu/Basil Pesto Pasta Salad- 3.jpg",
      nutritionInfo: {
        calories: "380 Cal",
        protein: "12g",
        carbs: "48g",
        fat: "10g",
      },
      allergens: [],
      pairs: [],
    },
    {
      id: 4,
      name: "Corn Sandwich ( Cheese_ Paneer )",
      price: 199,
      description:
        "Whole wheat sandwich filled with marinated paneer tikka and veggies",
      img: "/img/menu/Corn Sandwich ( Cheese_ Paneer ).jpg",
      nutritionInfo: {
        calories: "430 Cal",
        protein: "20g",
        carbs: "50g",
        fat: "14g",
      },
      allergens: ["Milk", "Wheat"],
      pairs: [],
    },
    {
      id: 5,
      name: "Mediterranean Protein Bowl",
      price: 319,
      description:
        "Falafel, hummus, olives, cucumber and greens with mixed grains",
      img: "/img/menu/Exotic Fruit Salad - 2.jpg",
      nutritionInfo: {
        calories: "520 Cal",
        protein: "18g",
        carbs: "60g",
        fat: "20g",
      },
      allergens: ["Sesame", "Nuts"],
      pairs: [],
    },
    {
      id: 6,
      name: "Exotic Fruit Salad - 3",
      price: 149,
      description: "Assorted seasonal fruits served fresh and chilled",
      img: "/img/menu/Exotic Fruit Salad - 3.jpg",
      nutritionInfo: {
        calories: "150 Cal",
        protein: "2g",
        carbs: "35g",
        fat: "0.5g",
      },
      allergens: [],
      pairs: [],
    },
  ],

  breakfast: [
    {
      id: 11,
      name: "Exotic Fruit Salad - 4",
      price: 159,
      description:
        "Creamy oatmeal with fresh fruits, nuts and a drizzle of honey",
      img: "/img/menu/Exotic Fruit Salad - 4.jpg",
      nutritionInfo: {
        calories: "320 Cal",
        protein: "12g",
        carbs: "52g",
        fat: "8g",
      },
      allergens: ["Oats", "Nuts"],
      pairs: [],
    },
    {
      id: 12,
      name: "Exotic Fruit Salad",
      price: 189,
      description: "Whole wheat protein pancakes served with fresh berries",
      img: "/img/menu/Exotic Fruit Salad.jpg",
      nutritionInfo: {
        calories: "450 Cal",
        protein: "24g",
        carbs: "48g",
        fat: "16g",
      },
      allergens: ["Wheat", "Eggs"],
      pairs: [],
    },
    {
      id: 13,
      name: "Extravaganza Veggies Salad ",
      price: 169,
      description: "Multigrain toast topped with smashed avocado and seeds",
      img: "/img/menu/Extravaganza Veggies Salad - 2.jpg",
      nutritionInfo: {
        calories: "310 Cal",
        protein: "8g",
        carbs: "30g",
        fat: "16g",
      },
      allergens: ["Wheat", "Seeds"],
      pairs: [],
    },
    {
      id: 14,
      name: "Extravaganza Veggies Salad ",
      price: 179,
      description:
        "Spiced omelette wrapped with fresh greens and whole wheat wrap",
      img: "/img/menu/Extravaganza Veggies Salad - 3.jpg",
      nutritionInfo: {
        calories: "350 Cal",
        protein: "18g",
        carbs: "28g",
        fat: "18g",
      },
      allergens: ["Eggs", "Wheat"],
      pairs: [],
    },
    {
      id: 15,
      name: "Extravaganza Veggies Salad",
      price: 149,
      description: "Greek yogurt layered with granola and seasonal fruits",
      img: "/img/menu/Extravaganza Veggies Salad - 4.jpg",
      nutritionInfo: {
        calories: "260 Cal",
        protein: "15g",
        carbs: "32g",
        fat: "6g",
      },
      allergens: ["Milk", "Nuts"],
      pairs: [],
    },
    {
      id: 16,
      name: "Extravaganza Veggies Salad",
      price: 139,
      description: "Semolina upma cooked with mixed vegetables and mild spices",
      img: "/img/menu/Extravaganza Veggies Salad.jpg",
      nutritionInfo: {
        calories: "300 Cal",
        protein: "6g",
        carbs: "54g",
        fat: "6g",
      },
      allergens: [],
      pairs: [],
    },
  ],

  launch: [
    {
      id: 21,
      name: "Grilled Chicken Barbecue Sandwich",
      price: 279,
      description:
        "Nutrient-rich quinoa bowl with roasted vegetables and tahini dressing",
      img: "/img/menu/Grilled Chicken Barbecue Sandwich- 2.jpg",
      nutritionInfo: {
        calories: "520 Cal",
        protein: "18g",
        carbs: "68g",
        fat: "22g",
      },
      allergens: ["Sesame", "Nuts"],
      pairs: [],
    },
    {
      id: 22,
      name: "Grilled Chicken Barbecue Sandwich",
      price: 229,
      description: "Hummus and falafel wrap with fresh vegetables",
      img: "/img/menu/Grilled Chicken Barbecue Sandwich.jpg",
      nutritionInfo: {
        calories: "480 Cal",
        protein: "16g",
        carbs: "62g",
        fat: "20g",
      },
      allergens: ["Wheat", "Sesame"],
      pairs: [],
    },
    {
      id: 23,
      name: "Grilled Chicken Barbecue Sandwich",
      price: 299,
      description:
        "Grilled chicken breast, mixed greens, cherry tomatoes and vinaigrette",
      img: "/img/menu/Grilled Chicken Barbecue Sandwich.jpg",
      nutritionInfo: {
        calories: "420 Cal",
        protein: "36g",
        carbs: "12g",
        fat: "22g",
      },
      allergens: [],
      pairs: [],
    },
    {
      id: 24,
      name: "Icy Strawberry Shake",
      price: 249,
      description:
        "Whole wheat pasta tossed with basil pesto and roasted veggies",
      img: "/img/menu/Icy Strawberry Shake.jpg",
      nutritionInfo: {
        calories: "560 Cal",
        protein: "18g",
        carbs: "78g",
        fat: "18g",
      },
      allergens: ["Wheat", "Nuts"],
      pairs: [],
    },
    {
      id: 25,
      name: "Kulhad Chai",
      price: 199,
      description: "Soya chunks with steamed rice and a side of sauteed greens",
      img: "/img/menu/Kulhad Chai -2.jpg",
      nutritionInfo: {
        calories: "480 Cal",
        protein: "32g",
        carbs: "60g",
        fat: "8g",
      },
      allergens: ["Soy"],
      pairs: [],
    },
    {
      id: 26,
      name: "Peri Peri Paneer Burrito Bowl",
      price: 259,
      description: "Creamy risotto with mushrooms, spinach and parmesan",
      img: "/img/menu/Peri Peri Paneer Burrito Bowl- 3.jpg",
      nutritionInfo: {
        calories: "510 Cal",
        protein: "12g",
        carbs: "72g",
        fat: "16g",
      },
      allergens: ["Milk"],
      pairs: [],
    },
  ],

  dinner: [
    {
      id: 31,
      name: "Peri Peri Paneer Burrito Bowl",
      price: 299,
      description: "Marinated tofu with grilled vegetables and chimichurri",
      img: "/img/menu/Peri Peri Paneer Burrito Bowl.jpg",
      nutritionInfo: {
        calories: "420 Cal",
        protein: "28g",
        carbs: "32g",
        fat: "24g",
      },
      allergens: ["Soy"],
      pairs: [],
    },
    {
      id: 32,
      name: "Protein Packed Salad ( Veg )",
      price: 319,
      description: "Mixed grains with chicken, avocado and roasted seeds",
      img: "/img/menu/Protein Packed Salad ( Veg ) - 2.jpg",
      nutritionInfo: {
        calories: "580 Cal",
        protein: "42g",
        carbs: "48g",
        fat: "26g",
      },
      allergens: ["Nuts"],
      pairs: [],
    },
    {
      id: 33,
      name: "Soya Paneer Rice Bowl ",
      price: 399,
      description: "Oven baked salmon with herb crust and lemon butter sauce",
      img: "/img/menu/Soya Paneer Rice Bowl .jpg",
      nutritionInfo: {
        calories: "610 Cal",
        protein: "38g",
        carbs: "6g",
        fat: "44g",
      },
      allergens: ["Fish", "Milk"],
      pairs: [],
    },
    {
      id: 34,
      name: "Protein Packed Salad ( Veg )",
      price: 289,
      description:
        "Mixed vegetables simmered in fragrant green curry with coconut milk",
      img: "/img/menu/Protein Packed Salad ( Veg ) - 4.jpg",
      nutritionInfo: {
        calories: "520 Cal",
        protein: "10g",
        carbs: "60g",
        fat: "24g",
      },
      allergens: ["Coconut"],
      pairs: [],
    },
    {
      id: 35,
      name: "Protein Packed Salad ( Veg )",
      price: 249,
      description: "Hearty lentil filling topped with creamy mashed potatoes",
      img: "/img/menu/Protein Packed Salad ( Veg ).jpg",
      nutritionInfo: {
        calories: "480 Cal",
        protein: "20g",
        carbs: "58g",
        fat: "14g",
      },
      allergens: [],
      pairs: [],
    },
    {
      id: 36,
      name: "Icy Strawberry Shake",
      price: 279,
      description:
        "Bell peppers stuffed with quinoa, beans and spices, baked to perfection",
      img: "/img/menu/Icy Strawberry Shake.jpg",
      nutritionInfo: {
        calories: "360 Cal",
        protein: "14g",
        carbs: "46g",
        fat: "10g",
      },
      allergens: [],
      pairs: [],
    },
  ],

  sneaks: [
    {
      id: 41,
      name: "Soya Paneer Rice Bowl ",
      price: 149,
      description: "Protein-packed energy bites with dates and nuts",
      img: "/img/menu/Soya Paneer Rice Bowl .jpg",
      nutritionInfo: {
        calories: "220 Cal",
        protein: "8g",
        carbs: "24g",
        fat: "12g",
      },
      allergens: ["Nuts"],
      pairs: [],
    },
    {
      id: 42,
      name: "Hara Bhara Kebab Wrap",
      price: 129,
      description: "Homemade granola bar with mixed dried fruits",
      img: "/img/menu/Hara Bhara Kebab Wrap.jpg",
      nutritionInfo: {
        calories: "180 Cal",
        protein: "6g",
        carbs: "26g",
        fat: "8g",
      },
      allergens: ["Nuts", "Seeds"],
      pairs: [],
    },
    {
      id: 43,
      name: "Peri Peri Paneer Burrito Bowl",
      price: 89,
      description: "Crispy roasted chickpeas with light seasoning",
      img: "/img/menu/Peri Peri Paneer Burrito Bowl- 3.jpg",
      nutritionInfo: {
        calories: "150 Cal",
        protein: "7g",
        carbs: "20g",
        fat: "4g",
      },
      allergens: ["None"],
      pairs: [],
    },
    {
      id: 44,
      name: "Peri Peri Paneer Burrito Bowl",
      price: 99,
      description:
        "Lightly salted baked kale chips for a crunchy, healthy snack",
      img: "/img/menu/Peri Peri Paneer Burrito Bowl.jpg",
      nutritionInfo: {
        calories: "90 Cal",
        protein: "4g",
        carbs: "12g",
        fat: "3g",
      },
      allergens: [],
      pairs: [],
    },
    {
      id: 45,
      name: "Grilled Chicken Burger",
      price: 139,
      description:
        "Chia seeds soaked in almond milk with a touch of vanilla and honey",
      img: "/img/menu/Grilled Chicken Burger -3.jpg",
      nutritionInfo: {
        calories: "200 Cal",
        protein: "6g",
        carbs: "24g",
        fat: "8g",
      },
      allergens: ["Nuts", "Seeds"],
      pairs: [],
    },
    {
      id: 46,
      name: "Soya Paneer Rice Bowl ",
      price: 129,
      description:
        "Small whole wheat wrap filled with crunchy veggies and light spread",
      img: "/img/menu/Soya Paneer Rice Bowl .jpg",
      nutritionInfo: {
        calories: "210 Cal",
        protein: "6g",
        carbs: "28g",
        fat: "8g",
      },
      allergens: ["Wheat"],
      pairs: [],
    },
  ],
};

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
              {activeItems.map((item) => (
                <Link
                  key={item.id ?? item.name}
                  to={`/menu/${activeKey}/${item.id ?? item.name}`}
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
              ))}
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
