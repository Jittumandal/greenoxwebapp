import React, { useState } from "react";
import Location_pic from "./Location_pic";

const cityLocations = {
  "Uttar Pradesh": [
    {
      address:
        "BG-02, HUDCO Place, Ansal Plaza Khel Gaon Road New Delhi- 110049",
      phone: "9711882104",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "47, Basant Lok, Community Centre, Vasant Vihar, New Delhi-110057",
      phone: "9899795811",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "BG-02, HUDCO Place, Ansal Plaza Khel Gaon Road New Delhi- 110049",
      phone: "9711882104",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "47, Basant Lok, Community Centre, Vasant Vihar, New Delhi-110057",
      phone: "9899795811",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "47, Basant Lok, Community Centre, Vasant Vihar, New Delhi-110057",
      phone: "9899795811",
      dinein: "OPEN",
      delivery: "OPEN",
    },
  ],
  Delhi: [
    {
      address: "Plot No. 9B & C , Cross River Mall, CBD Shahdara. Delhi-110032",
      phone: "9811852820",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Shop no. 7, 8 & 9, Unity One Mall, Plot No. 29 & 31. East CBD Shahdara. Delhi- 110032",
      phone: "9873162942",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Commercial Complex-II /1888–89, Kumar Theatre, Chandni Chowk, New Delhi-110006",
      phone: "9711882126",
      dinein: "OPEN",
      delivery: "OPEN",
    },
    {
      address:
        "Delhi D-Mall Rohini:- Plot No. 1B5, Twin District Center. D-Mall , Sector-10, Rohini, New Delhi- 110085",
      phone: "9999194946",
      dinein: "OPEN",
      delivery: "OPEN",
    },
  ],
  Mumbai: [],
  Bangalore: [],
  Kolkata: [],
  Chennai: [],
  Hyderabad: [],
  Pune: [],
};

const cities = Object.keys(cityLocations);

const Location = () => {
  // Change the initial state to "Uttar Pradesh"
  const [selectedCity, setSelectedCity] = useState("Uttar Pradesh");

  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row">
      {/* Left: Select City */}
      <div className="freshmealplan flex flex-col items-center justify-center p-8 pl-12 md:w-1/3">
        <div className="max-w-xm mb-8 w-full pb-4 pl-12">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <img src="/img/location.svg" alt="Location" className="h-5 w-5" />
            </span>
            <select
              className="m-0 w-full rounded-full border border-gray-300 py-3 pl-12 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <span className="selectLoc pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
        {/* <img
          src="/img/mixedfruite.svg"
          alt="Veggies"
          className="h-100 w-100 mt-4 hidden object-contain md:block"
        /> */}
        <Location_pic />
      </div>
      {/* Right: Locations or Mascot */}
      <div
        className={
          "relative flex flex-col items-center justify-center p-6 transition-colors duration-300 md:w-2/3 " +
          (selectedCity ? "" : "bg-orange-50")
        }
        style={
          selectedCity
            ? {
                backgroundImage: "url('/img/subscription2.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {/* Show mascots image only when no city is selected */}
        {!selectedCity && (
          <img
            src="/img/broccolimascots.svg"
            alt="Broccoli Mascots"
            className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-full w-full object-contain opacity-90 md:block"
          />
        )}

        {!selectedCity ? (
          <div className="z-10 hidden h-full w-full flex-col items-center justify-center md:flex">
            {/* Speech bubble - hidden on small screens, visible md+ */}
            <div className="top_40px absolute left-8 top-8 z-20">
              <div className="relative rounded-lg border border-orange-300 bg-orange-100 px-6 py-4 text-lg font-medium text-gray-700 shadow">
                Please select a city
                <br />
                to find the nearest
                <br />
                GreeNox store
                {/* Arrow */}
                <span className="absolute -left-6 top-6 h-0 w-0 border-b-8 border-r-8 border-t-8 border-b-transparent border-r-orange-100 border-t-transparent"></span>
                <span className="absolute -left-6 top-6 z-[-1] h-0 w-0 border-b-8 border-r-8 border-t-8 border-b-transparent border-r-orange-300 border-t-transparent"></span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="z-10 mb-6 text-center text-4xl font-extrabold text-green-600">
              Restaurant Locator
            </h2>
            <div className="z-10 grid w-full grid-cols-1 gap-6 overflow-y-auto pr-2 md:grid-cols-2 lg:grid-cols-3">
              {cityLocations[selectedCity] &&
              cityLocations[selectedCity].length > 0 ? (
                cityLocations[selectedCity].map((loc, idx) => (
                  <div
                    key={idx}
                    className="flex min-h-[230px] flex-col justify-between rounded-2xl bg-white p-6 shadow"
                  >
                    <div>
                      <div className="mb-2 text-base font-semibold text-gray-800">
                        {loc.address}
                      </div>
                      <div className="mb-1 font-bold">
                        Dine-in:{" "}
                        <span className="text-green-600">{loc.dinein}</span>
                      </div>
                      <div className="mb-2 font-bold">
                        Delivery:{" "}
                        <span className="text-green-600">{loc.delivery}</span>
                      </div>
                      <div className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-400">
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="font-bold">{loc.phone}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full rounded-full bg-orange-400 py-3 text-lg font-bold text-white transition hover:bg-orange-500">
                      GET DIRECTIONS
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-xl text-gray-700">
                  No locations available for this city.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Location;
