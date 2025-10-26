import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { menuItems } from "../data/menuData"; // Update this import

const NutritionRow = ({ label, value }) => (
  <div className="flex justify-between border-t border-gray-100 py-2 text-sm">
    <div className="text-gray-600">{label}</div>
    <div className="font-medium text-gray-800">{value}</div>
  </div>
);

const MenuItemDetail = () => {
  const { category, id, pairIndex } = useParams();

  const findMenuItem = () => {
    console.log("Params:", { category, id, pairIndex }); // Debug params

    // Convert category to lowercase to match data structure
    const categoryKey = category?.toLowerCase();
    const categoryItems = menuItems[categoryKey];

    console.log("Category items:", categoryItems); // Debug category items

    if (!categoryItems) {
      console.log("Category not found:", categoryKey);
      return null;
    }

    // Find the main item
    const mainItem = categoryItems.find(
      (item) => String(item.id) === String(id),
    );

    console.log("Found item:", mainItem); // Debug found item

    if (!mainItem) {
      console.log("Item not found:", id);
      return null;
    }

    // If we have a pairIndex, return the paired item
    if (pairIndex !== undefined && mainItem.pairs) {
      return mainItem.pairs[parseInt(pairIndex)] || null;
    }

    return mainItem;
  };

  const item = findMenuItem();

  const [openNutrition, setOpenNutrition] = useState(true);
  const [openAllergens, setOpenAllergens] = useState(false);

  console.log("Rendered item:", item);

  // Update the not found state to show more info:
  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Item not found</h2>
          <p className="mt-2 text-gray-600">
            Category: {category}, ID: {id}
            {pairIndex !== undefined && `, Pair Index: ${pairIndex}`}
          </p>
          <Link
            to="/menu"
            className="mt-4 inline-block rounded-lg bg-green-500 px-6 py-2 text-white hover:bg-green-600"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  // Fallback nutrition data if not provided in menuData
  const nutrition = item.nutritionInfo || {
    calories: "625 Cal",
    protein: "22g",
    carbs: "49g",
    fat: "39g",
    details: {
      "Saturated Fat": "7g",
      "Total Sugars": "2g",
      Sodium: "650mg",
      "Dietary Fiber": "4g",
      Cholesterol: "28mg",
    },
  };

  const allergens = item.allergens || ["Milk", "Wheat"]; // example

  return (
    <div className="container mx-auto mt-20 px-4 py-12">
      <Link
        to="/menu"
        className="mb-6 inline-block text-sm font-medium text-green-600 hover:text-green-700"
      >
        ← Back to Menu
      </Link>

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
            <img
              src={item.image || item.img}
              alt={item.name}
              className="h-80 w-full object-cover md:h-full"
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

            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
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
            </div>
          </div>
        </div>
        {/* Accordion: Nutrition */}
        <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50">
          <button
            className="flex w-full items-center justify-between px-6 py-4 text-left"
            onClick={() => setOpenNutrition((s) => !s)}
            aria-expanded={openNutrition}
          >
            <div>
              <div className="text-sm font-semibold text-gray-800">
                Nutritional Information
              </div>
              <div className="text-xs text-gray-500">Nutrition summary</div>
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
                  <div className="text-2xl font-bold text-gray-900">
                    {nutrition.calories}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">Calories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {nutrition.protein}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {nutrition.carbs}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Total Carbs (17% DV)
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {nutrition.fat}
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    Total Fat (50% DV)
                  </div>
                </div>
              </div>

              {/* Detailed nutrition table */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
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
                      <span className="text-sm text-gray-600">Trans Fat:</span>
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
                      <span className="text-sm text-gray-600">Vitamin D:</span>
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
                      <span className="text-sm text-gray-600">Potassium:</span>
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
              </div>
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
              <div className="text-sm font-semibold text-gray-800">
                Allergen Information
              </div>
              <div className="text-xs text-gray-500">
                Ingredients that may cause allergies
              </div>
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
  );
};

export default MenuItemDetail;
