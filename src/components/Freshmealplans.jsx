import React from "react";
import Subscription_Plans from "../components/Subscription_Plans";

const features = [
  {
    icon: (
      <img
        src="/img/grocery.svg"
        className="mx-auto mb-2 h-8 w-8"
        alt="Fresh Ingredients"
      />
    ),
    title: "Fresh Ingredients",
    desc: "sourced daily",
  },
  {
    icon: (
      <img
        src="/img/group_add.svg"
        className="mx-auto mb-2 h-8 w-8"
        alt="Custom Plans"
      />
    ),
    title: "Custom Plans",
    desc: "tailored for you",
  },
  {
    icon: (
      <img
        src="/img/pediatrics.svg"
        className="mx-auto mb-2 h-8 w-8"
        alt="Nutritionist"
      />
    ),
    title: "Nutritionist",
    desc: "expert guidance",
  },
  {
    icon: (
      <img
        src="/img/local_shipping.svg"
        className="mx-auto mb-2 h-8 w-8"
        alt="Free Delivery"
      />
    ),
    title: "Free Delivery",
    desc: "to your door",
  },
];

const Freshmealplans = () => {
  return (
    <div className="freshmealplan bg-white px-2 py-12">
      {/* <h2 className="mb-2 text-center text-4xl font-bold text-green-700">
        Fresh Meal Plans
      </h2> */}
      {/* New Secondary Heading with Animation */}
      <h2 className="mb-4 animate-pulse text-center text-4xl font-semibold text-green-500">
        Fresh Meal Plans
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600">
        Transform Your Health Journey. Premium meal plans and personalized
        coaching to help you achieve your wellness goals.
      </p>

      {/* Features */}
      <div className="mx-auto mb-10 mt-10 grid max-w-4xl grid-cols-2 gap-4 text-center text-sm text-gray-600 md:grid-cols-4">
        {features.map((feature, index) => (
          <div className="grid gap-2" key={index}>
            {feature.icon}
            <div className="font-semibold text-green-700">{feature.title}</div>
            <div className="text-xs text-gray-500">{feature.desc}</div>
          </div>
        ))}
      </div>

      {/* Plans */}
      <Subscription_Plans />
    </div>
  );
};

export default Freshmealplans;
