import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { menuItems } from "../data/menuData";

const NutritionRow = ({ label, value }) => (
  <div className="flex justify-between border-t border-gray-100 py-2 text-sm">
    <div className="text-gray-600">{label}</div>
    <div className="font-medium text-gray-800">{value}</div>
  </div>
);

const MenuItemDetail = () => {
  const { id } = useParams();
  const menuItem = menuItems.find((item) => String(item.id) === String(id));

  const [openNutrition, setOpenNutrition] = useState(true);
  const [openAllergens, setOpenAllergens] = useState(false);

  if (!menuItem) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Item not found</h2>
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
  const nutrition = menuItem.nutritionInfo || {
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

  const allergens = menuItem.allergens || ["Milk", "Wheat"]; // example

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        to="/menu"
        className="mb-6 inline-block text-sm font-medium text-green-600 hover:text-green-700"
      >
        ← Back to Menu
      </Link>

      <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-lg">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
            <img
              src={menuItem.image || menuItem.img}
              alt={menuItem.name}
              className="h-80 w-full object-cover md:h-full"
            />
          </div>

          {/* Details */}
          <div className="p-8">
            <h1 className="mb-2 text-3xl font-extrabold text-gray-900">
              {menuItem.name}
            </h1>
            <p className="mb-4 text-sm text-gray-500">{menuItem.subtitle}</p>

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
                  ₹{menuItem.price}
                </div>
              </div>
            </div>

            <p className="mb-6 text-gray-700">{menuItem.description}</p>

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
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Calories</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {nutrition.calories}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Protein</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {nutrition.protein}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Carbs</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {nutrition.carbs}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Fat</div>
                      <div className="mt-1 text-lg font-semibold text-gray-900">
                        {nutrition.fat}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {nutrition.details &&
                      Object.entries(nutrition.details).map(
                        ([label, value]) => (
                          <NutritionRow
                            key={label}
                            label={label}
                            value={value}
                          />
                        ),
                      )}
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
      </div>
    </div>
  );
};

export default MenuItemDetail;
