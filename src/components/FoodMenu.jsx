import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories, menuItems } from "../data/menuData";
import Delicious from "../components/Delicious";

const FoodMenu = () => {
  const [activeTab, setActiveTab] = useState("special");
  const activeContent = menuItems[activeTab] || menuItems.special;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" id="target-section">
      {/* Header: left title, right tabs */}
      <div className="mb-8 flex w-full flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        {/* Left: heading */}
        <div className="w-full md:w-1/2">
          <p className="text-sm text-gray-500">Popular Menu</p>
          {/* <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
            Delicious Food Menu
          </h2> */}
          <Delicious />
          <div className="mt-3 w-20 border-b-4 border-orange-500" />
        </div>

        {/* Right: tabs */}
        <div className="w-full md:w-auto">
          <div className="tabsmenu flex w-full flex-col gap-2 sm:flex-row sm:items-center">
            {categories.map((category) => {
              const key = category.name.toLowerCase();
              const active = activeTab === key;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 whitespace-nowrap rounded-md px-4 py-3 text-base font-medium transition-colors ${active ? "text-orange-500" : "text-gray-600 hover:text-orange-500"} ${!active ? "bg-transparent" : "bg-transparent"} sm:flex-initial`}
                  aria-pressed={active}
                >
                  <span className="inline-block">{category.name}</span>

                  {/* active underline */}
                  <span
                    className={`mt-2 block h-0.5 w-full transform transition-all duration-200 ${
                      active ? "bg-orange-500" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu items grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {activeContent.map((item) => (
          <Link
            key={item.id}
            to={`/menu/${activeTab}/${item.id}`}
            className="group flex items-start gap-4 bg-white p-4 transition-shadow hover:shadow-lg"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-32 w-32 flex-none rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-orange-500">
                {item.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                {item.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-semibold text-green-600">
                  ₹{item.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FoodMenu;
