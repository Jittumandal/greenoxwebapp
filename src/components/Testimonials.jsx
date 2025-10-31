import React, { useEffect, useRef } from "react";
import RealReviews from "../components/RealReviews.jsx";

const testimonials = [
  {
    text: "The Beginnings is my go-to place for a balanced and satisfying meal. Their commitment to sustainability and quality ingredients is truly impressive. It's not just food; it's a lifestyle choice.",
    name: "Akash",
    role: "Lead Intranet Technician",
    img: "/img/Akash.jpg",
  },
  {
    text: "I've been a loyal customer of GreeNox for over two years, and I can't get enough of their delicious and healthy dishes. The plant-based menu is a game-changer for me, and the atmosphere at their outlets is always warm and welcoming.",
    name: "Aditya Chaudhary",
    role: "Lead Intranet Technician",
    img: "/img/Aditya.jpg",
  },
  {
    text: "GreeNox has redefined my perception of 'fast food.' The meals are not just quick; they're truly nourishing. I'm thrilled to be a part of their journey toward a healthier world.",
    name: "Adeesh",
    role: "Lead Intranet Technician",
    img: "/img/Adeesh.jpg",
  },
  {
    text: "As a fitness enthusiast, I appreciate the protein-packed options at GreeNox. The Soya Paneer Rice Bowl is my favorite - it's both nutritious and delicious. Plus, the cleanliness and hygiene at their food production unit are top-notch.",
    name: "Kinjalika Verma",
    role: "Lead Intranet Technician",
    img: "/img/Kinjalika.jpg",
  },
];

const ITEM_HEIGHT = 330; // px
const SLIDES_TO_SHOW = 2;
const SCROLL_SPEED = 0.5; // px per frame (slower)

export const Testimonials = () => {
  const marqueeRef = useRef(null);
  const animRef = useRef();

  useEffect(() => {
    const marquee = marqueeRef.current;
    let scroll = 0;
    let isPaused = false;

    // Duplicate content for seamless scroll
    const totalHeight = marquee.scrollHeight / 2;

    function animate() {
      if (!isPaused) {
        scroll += SCROLL_SPEED;
        if (scroll >= totalHeight) {
          scroll = 0;
          marquee.style.transition = "none";
          marquee.style.transform = `translateY(0px)`;
          // Force reflow to apply the transition reset
          void marquee.offsetWidth;
          marquee.style.transition = "transform 0.5s linear";
        } else {
          marquee.style.transform = `translateY(-${scroll}px)`;
        }
      }
      animRef.current = requestAnimationFrame(animate);
    }

    marquee.style.transition = "transform 0.5s linear";
    animRef.current = requestAnimationFrame(animate);

    marquee.parentElement.addEventListener(
      "mouseenter",
      () => (isPaused = true),
    );
    marquee.parentElement.addEventListener(
      "mouseleave",
      () => (isPaused = false),
    );

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="freshmealplan px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left: Heading and intro */}
          <div className="flex flex-col justify-center md:w-1/2">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-1 w-10 rounded bg-green-700" />
              <span className="text-xl font-semibold text-orange-500">
                What people Says
              </span>
            </div>
            <h2 className="mb-6 text-5xl font-extrabold leading-tight text-gray-800">
              Real People, Real Reviews
            </h2>
            <p className="text-lg text-gray-700">
              Unpaid love we recieve from people
            </p>
          </div>
          {/* Right: Vertical Marquee */}
          <div
            className="Testimonials_mobile relative"
            style={{
              width: "370px",
              height: `${ITEM_HEIGHT * SLIDES_TO_SHOW}px`,
              overflow: "hidden",
            }}
          >
            <div
              ref={marqueeRef}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="testimonial-item"
                  style={{
                    width: "100%",
                    height: `${ITEM_HEIGHT}px`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#fff",
                    marginBottom: "25px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px #0001",
                    overflow: "hidden",
                    padding: "32px 28px",
                  }}
                >
                  <div className="mb-6 text-base text-gray-700">{t.text}</div>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="h-14 w-14 rounded-full border-2 border-green-500 object-cover"
                    />
                    <div>
                      <div className="text-lg font-bold text-green-700">
                        {t.name}
                      </div>
                      <div className="text-sm font-semibold text-gray-600">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <RealReviews />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
