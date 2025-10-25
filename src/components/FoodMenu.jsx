import React, { useState } from "react";

const menuItems = {
  Special: [
    {
      id: 1,
      name: "Classic Sandwich",
      img: "/products/Corn Sandwich ( Cheese_ Paneer ).jpg",
      price: 40.0,
      description:
        "Brown Bread Golden Corn Bell Pepper Onion Tomato Cucumber Lettuce (Energy -330kcal, Carbs-41.1g, Protein-8.4 g ,Lipid Fat-13.9g,Fiber-5.1g)",
      pairs: [
        {
          name: "Paneer Tikka Sandwich",
          img: "/products/Grilled Chicken Barbecue Sandwich.jpg",
          price: 40.0,
          description:
            "Brown Bread Paneer Tikka Bell Pepper Onion Tomato Lettuce(Energy -531 kcal, Carbs-65.8g, protein-21g ,Lipid Fat-19g,Fiber-8.1g )",
        },
      ],
    },
    {
      id: 2,
      name: "Hara Bhara Kebab Wrap",
      img: "/products/Hara Bhara Kebab Wrap- 2.jpg",
      price: 40.0,
      description:
        "Lettuce iceberg Mushroom Kebab Onion Bell Peppers Broccoli (Energy -420kcal Carbs -44g Protein -8g Fiber - 5g)",
      pairs: [
        {
          name: "Tandoori Chicken Wrap",
          img: "/products/Hara Bhara Kebab Wrap.jpg",
          price: 40.0,
          description:
            "Tandoori Chicken onion Mushroom Jalapenos Zucchini Lettuce (Energy -337 kcal,Carbs-21.9g, Protein-15.9g ,Lipid Fat-19.4g,Fiber-3.9g )",
        },
      ],
    },
    {
      id: 3,
      name: "Paneer Steak With Mashed Potatoes",
      img: "/products/Paneer Steak With Mashed Potatoes -3.jpg",
      price: 40.0,
      description:
        "Paneer Steak Mashed Potatoes Side Salad Topped with Parsley (Energy -407kcal Carbs -40g Protein -25.4g Lipid Fat -16g Fiber -5g)",
      pairs: [
        {
          name: "Protein Packed Salad [Veg]",
          img: "/products/Protein Packed Salad ( Veg ) - 2.jpg",
          price: 40.0,
          description:
            "Soya Chunks Mix Sprouts Broccoli Zucchini cherry tomato  (Energy - 554kcal,Carbs-44, Protein- 40g ,Lipid Fat-26g,Fiber-15g )",
        },
      ],
    },
  ],
  Breakfast: [
    {
      id: 2,
      name: "White Sauce Pasta",
      img: "/products/Alfredo ( White Sauce ) Pasta - 2.jpg",
      price: 40.0,
      description: "They're wherein heaven seed hath nothing",
      pairs: [
        {
          name: "Breakfast Special",
          img: "/products/Alfredo.jpg",
          price: 40.0,
          description: "They're wherein heaven seed hath nothing",
        },
      ],
    },
  ],
  Launch: [
    {
      id: 3,
      name: "Burrito Bowl",
      img: "/products/Avocado Veg Burrito Bowl - 2.jpg",
      price: 40.0,
      description: "They're wherein heaven seed hath nothing",
      pairs: [
        {
          name: "Avocado Veg Burrito Bowl",
          img: "/products/Avocado Veg Burrito Bowl - 3.jpg",
          price: 40.0,
          description: "They're wherein heaven seed hath nothing",
        },
      ],
    },
  ],
  Dinner: [
    {
      id: 4,
      name: "Peri Paneer",
      img: "/products/Peri Peri Paneer Burrito Bowl- 3.jpg",
      price: 40.0,
      description: "They're wherein heaven seed hath nothing",
      pairs: [
        {
          name: "Burrito Bowl",
          img: "/products/Peri Peri Paneer Burrito Bowl.jpg",
          price: 40.0,
          description: "They're wherein heaven seed hath nothing",
        },
      ],
    },
  ],
  Sneaks: [
    {
      id: 5,
      name: "Kulhad Chai",
      img: "/products/Kulhad Chai .jpg",
      price: 40.0,
      description: "They're wherein heaven seed hath nothing",
      pairs: [
        {
          name: "Irish Cold Coffee",
          img: "/products/Irish Cold Coffee.jpg",
          price: 40.0,
          description: "They're wherein heaven seed hath nothing",
        },
      ],
    },
  ],
};

const FoodMenu = () => {
  const [activeTab, setActiveTab] = useState("Special");

  // Ensure we have content for the active tab
  const activeContent = menuItems[activeTab] || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8" id="target-section">
      <div className="mb-8 flex items-center justify-between">
        <div className="mb-8">
          <p className="mb-4 mt-12 text-gray-600">Popular Menu</p>
          <h2 className="text-4xl font-semibold text-gray-800">
            Delicious Food Menu
          </h2>
          <span className="mt-2 block w-20 border-b-4 border-orange-500 bg-orange-50" />
        </div>

        <div className="flex items-center gap-4">
          {Object.keys(menuItems).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-base font-medium transition-colors ${
                activeTab === tab
                  ? "text-orange-500"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-orange-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8" id="target-section">
        {activeContent.map((item) => (
          <div key={item.id} className="flex flex-col gap-8 md:flex-row">
            {/* Left item */}
            <div className="flex flex-1 gap-4">
              <img
                src={item.img}
                alt={item.name}
                className="h-40 w-40 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-start">
                {" "}
                {/* Changed from justify-center to justify-start */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <span className="mt-2 font-semibold text-orange-500">
                  ₹{item.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Right paired item */}
            {item.pairs.map((pair, index) => (
              <div key={index} className="flex flex-1 gap-4">
                <img
                  src={pair.img}
                  alt={pair.name}
                  className="h-40 w-40 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-start">
                  {" "}
                  {/* Changed from justify-center to justify-start */}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {pair.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{pair.description}</p>
                  <span className="mt-2 font-semibold text-orange-500">
                    ₹{pair.price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
