import React from "react";
import Subscription_Plans from "../components/Subscription_Plans";
import FreshMealPlansHeading from "./FreshMealPlansHeading";

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
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* <h1 className="animate__animated animate__backInDown mb-2 text-4xl font-bold text-green-600 md:text-5xl">
            Fresh Meal Plans
          </h1> */}
          <FreshMealPlansHeading />
          <p className="animate__animated animate__backInDown text-gray-600">
            Transform Your Health Journey&nbsp; Premium meal plans and
            personalized coaching to help you achieve your wellness goals
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto mb-10 mt-10 grid max-w-4xl grid-cols-2 gap-4 text-center text-sm text-gray-600 md:grid-cols-4">
        {features.map((feature, index) => (
          <div className="grid gap-2" key={index}>
            <span className="animate-bounce">{feature.icon}</span>
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
