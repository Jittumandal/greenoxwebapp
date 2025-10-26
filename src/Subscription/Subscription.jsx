import Subscription_Plans from "../components/Subscription_Plans";

const mealTypes = [
  {
    label: "Breakfast",
    icon: <img className="mb-1 h-8" src="img/breakfast.svg" alt="breakfast" />,
  },
  {
    label: "Lunch",
    icon: <img className="mb-1 h-8" src="img/lunch.svg" alt="Lunch" />,
  },
  {
    label: "Snack",
    icon: <img className="mb-1 h-8" src="img/snak.svg" alt="Snack" />,
  },
  {
    label: "Dinner",
    icon: <img className="mb-1 h-8" src="img/dinner.svg" alt="Dinner" />,
  },
];

const Subscription = () => {
  return (
    <>
      <div className="subcriptionplan_bg flex w-full flex-col items-center justify-center bg-auto bg-center bg-no-repeat px-4 py-12">
        <div className="mx-auto w-full max-w-2xl pt-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-green-600 md:text-5xl">
            Fresh Meal Plans
          </h1>
          <p className="mb-6 text-gray-600">
            Transform Your Health Journey&nbsp; Premium meal plans and
            personalized coaching to help you achieve your wellness goals
          </p>
          <form className="mb-10 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Enter email or phone"
              className="w-full rounded-full border border-gray-300 px-6 py-3 focus:outline-none sm:w-80"
            />
            <button
              type="submit"
              className="rounded-full bg-orange-400 px-8 py-3 font-semibold text-white transition hover:bg-orange-500"
            >
              GET START NOW
            </button>
          </form>
          <div className="mb-8 mt-4 flex flex-col justify-center gap-8 sm:flex-row">
            {mealTypes.map((meal, idx) => (
              <button
                key={meal.label}
                className={`bg-green text-dark-600 flex flex-col items-center rounded-lg border-2 px-8 py-4 font-semibold transition ${idx === 0 ? "border-green-500 bg-green-500 text-white" : "border-green-500 hover:bg-green-50"}`}
              >
                {meal.icon}
                {meal.label}
              </button>
            ))}
          </div>
        </div>

        <Subscription_Plans />
      </div>
    </>
  );
};

export default Subscription;
