import { SlArrowDownCircle } from "react-icons/sl";
import "animate.css";

export default function HeroSection() {
  return (
    <div className="Main_Heading_bg relative min-h-[400px] overflow-hidden md:min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/img/greenox-poster.jpg"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40 transition-opacity duration-500 ease-in-out"
        crossOrigin="anonymous"
      >
        <source src={encodeURI("/img/greenox.mp4")} type="video/mp4" />
        {/* add webm fallback if you have one */}
        <source src={encodeURI("/img/greenox.webm")} type="video/webm" />
        {/* accessible fallback */}
        <img
          src="/img/greenox-poster.jpg"
          alt="Hero background"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      </video>

      {/* Overlay Content */}
      <div className="Main_Heading relative z-10 flex min-h-[400px] flex-col items-center justify-center px-4 md:min-h-screen">
        {/* Main Heading and Description */}
        <div className="mx-auto mt-12 w-full max-w-4xl pt-12 text-center">
          <h1 className="Main_Heading animate__animated animate__zoomIn mb-2 mt-12 pt-12 text-5xl font-bold uppercase leading-tight text-black md:text-6xl md:leading-[1.15]">
            Your Trusted Partner in
            <span className="block justify-center uppercase text-green-600">
              Healthy Living
            </span>
          </h1>
          <p className="animate__animated animate__fadeInRight mb-10 mt-12 text-black text-gray-600 md:text-4xl">
            Discover our range of nutritious and <br /> delicious products.
          </p>
          <form className="animate__animated animate__zoomIn mb-4 mt-10 flex w-full flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:px-0">
            <input
              placeholder="Enter email or phone"
              className="rounded1xl w-full px-6 py-3 focus:outline-none sm:w-80"
              type="text"
            />
            <button
              type="submit"
              className="rounded1xl flex h-[55px] w-full items-center justify-center bg-orange-400 px-8 font-semibold text-white transition hover:bg-orange-500 sm:w-auto"
              //   style={{
              //     backgroundImage:
              //       "linear-gradient(to right, #ffa500 60%, #48A470 100%)",
              //     backgroundPosition: "right",
              //     backgroundSize: "200% 100%",
              //     transition: "background-position 0.5s",
              //     borderRadius: "5px",
              //   }}
              //   onMouseEnter={(e) =>
              //     (e.currentTarget.style.backgroundPosition = "left")
              //   }
              //   onMouseLeave={(e) =>
              //     (e.currentTarget.style.backgroundPosition = "right")
              //   }
              // >
            >
              GET START NOW
            </button>
          </form>
        </div>

        {/* Animated Hero Section */}
        <div className="mx-auto max-w-5xl py-12 text-center">
          <div className="mt-10 flex justify-center gap-x-6">
            <button
              onClick={() =>
                document
                  .getElementById("target-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <SlArrowDownCircle
                size={32}
                className="animate-bounce rounded-full border"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
