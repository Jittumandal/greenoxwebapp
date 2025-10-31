import React from "react";

export const OurHistory = () => {
  return (
    <section className="our_history_section relative py-16">
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        {/* Content Container */}
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row-reverse">
          {/* Text Content - Now 60% width */}
          <div className="ourhistory w-full flex-[1.5] space-y-6 md:w-[50%]">
            {/* Badge */}
            {/* <span className="inline-block py-2 text-sm font-medium text-gray-800">
              Our History
            </span> */}

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              The GreeNox Story
            </h1>

            <h2 className="text-xl font-medium text-orange-500">
              GreeNox Food — where food is made with heart, and memories are
              served fresh every day.
            </h2>

            <p className="text-gray-600">
              Greenox is like a warm hug on a plate—nurturing, comforting, and
              made with love. We believe that good food isn’t just about eating;
              it’s about caring, sharing, and making people feel their best.
            </p>

            <p className="text-gray-600">
              At our core, we’re caregivers through food, bringing people
              together over fresh, wholesome, and absolutely delicious meals.
              Every bite is a reminder that healthy eating can be exciting,
              fulfilling, and straight from the heart.
            </p>

            <button className="group flex items-center gap-2 font-medium text-orange-500 hover:underline">
              Read More
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          {/* Image - Now 40% width */}
          <div className="w-full md:w-[40%]">
            <div className="relative mx-auto w-full">
              <div className="aspect-square overflow-hidden rounded-full border-8 border-white shadow-xl">
                <img
                  src="/products/Icy Strawberry Shake.jpg"
                  alt="Avocado Toast with Eggs"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/img/leaf.png"
        alt="about_overlay"
        className="about_overlay leaf buttom-0 absolute left-0 top-0 z-[-1]"
      />
      <img
        src="/products/about_overlay.png"
        alt="about_overlay"
        className="about_overlay top_30px buttom-0 absolute right-0 top-0 z-[-1]"
      />
    </section>
  );
};
