import React, { useEffect, useRef } from "react";

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

const SLIDE_HEIGHT = 330; // px
const SCROLL_SPEED = 0.5; // px per frame
const SLIDES_TO_SHOW = 2;

const MainSlider = () => {
  const sliderRef = useRef(null);
  const animRef = useRef();
  const scrollRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = [...testimonials, ...testimonials]; // duplicate for seamless loop
    const totalHeight = slides.length * (SLIDE_HEIGHT + 18); // each slide height + margin

    // Start offset so we scroll downward from top to bottom
    scrollRef.current = -totalHeight / 2;

    const animate = () => {
      if (!pausedRef.current) {
        scrollRef.current += SCROLL_SPEED;
        if (scrollRef.current >= 0) {
          // reset seamlessly to start again from middle
          scrollRef.current = -totalHeight / 2;
        }
        slider.style.transform = `translateY(${scrollRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    // Pause on hover
    slider.parentElement.addEventListener("mouseenter", () => {
      pausedRef.current = true;
    });
    slider.parentElement.addEventListener("mouseleave", () => {
      pausedRef.current = false;
    });

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="main-container flex items-center justify-center">
      <div
        style={{
          position: "relative",
          width: "330px",
          height: `${SLIDE_HEIGHT * SLIDES_TO_SHOW}px`,
          overflow: "hidden",
        }}
      >
        <div
          ref={sliderRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={i}
              className="testimonial-item"
              style={{
                width: "100%",
                height: `${SLIDE_HEIGHT}px`,
                marginBottom: "25px",
                borderRadius: "10px",
                background: "#fff",
                boxShadow: "0 2px 8px #0001",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background 0.3s, color 0.3s",
                color: "#222",
              }}
            >
              <div className="text-base text-gray-700">{item.text}</div>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-14 w-14 rounded-full border-2 border-cyan-500 object-cover"
                />
                <div>
                  <div className="text-lg font-bold text-cyan-700">
                    {item.name}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
