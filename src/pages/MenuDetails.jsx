import React, { useMemo, useState, useEffect, useRef } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";
import menuItems from "../data/menuItems";

// static slider images (place these files in public/img/slider/)
const slidesData = [
  "/img/slider/slide1.jpg",
  "/img/slider/slide2.jpg",
  "/img/slider/slide3.jpg",
  "/img/slider/slide4.jpg",
];

const carouselStyles = `
  .carousel-hero-banner { position: relative; max-width: 1200px; margin: 0 auto; }
  /* track-based sliding layout instead of absolute/fade */
  .carousel-images { position: relative; width: 100%; height:auto; overflow: hidden; background:#111; border-radius:8px; }
  .carousel-track { display:flex; height:100%; transition: transform .6s cubic-bezier(.2,.8,.2,1); will-change: transform; }
  .carousel-item { flex: 0 0 100%; display:flex; align-items:center; justify-content:center; height:100%; }
  .carousel-item img { width:100%; height:100%; object-fit:cover; display:block; }

  .slide-content { position: absolute; left: 32px; bottom: 32px; color: #fff; background: rgba(0,0,0,0.45); padding: 18px; border-radius: 8px; max-width: 48%; z-index: 30; }
  .slide-content h1{ margin:0 0 8px; font-size:1.6rem; line-height:1.1; }
  .slide-content p{ margin:0 0 12px; opacity:.95; }
  .cta-button{ display:inline-block; padding:8px 14px; background:#10b981; color:#fff; border-radius:6px; text-decoration:none; font-weight:600; }

  .nav-button { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.45); color: #fff; width:44px; height:44px; display:flex; align-items:center; justify-content:center; border-radius:999px; cursor:pointer; z-index:40; border: none; }
  .nav-button:hover{ background: rgba(0,0,0,0.6); }
  .nav-button.prev{ left: 12px; }
  .nav-button.next{ right: 12px; }

  .carousel-indicators{ position: absolute; left: 50%; bottom: 12px; transform: translateX(-50%); display:flex; gap:8px; z-index:50; }
  .dot{ width:12px; height:12px; border-radius:999px; background: rgba(255,255,255,0.4); cursor:pointer; display:inline-block; border: 2px solid rgba(0,0,0,0.15); }
  .dot.active{ background: #f59e0b; box-shadow: 0 0 0 6px rgba(245,158,11,0.12); }

  @media (max-width: 768px){
    .carousel-images { height: 360px; }
    .slide-content { left: 16px; bottom: 16px; max-width: 75%; padding: 12px; }
    .slide-content h1{ font-size:1.25rem; }
  }
`;
const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        type="button"
      >
        <span className="font-semibold">{title}</span>
        <span className="text-lg">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 pt-0">{children}</div>}
    </div>
  );
}

export default function MenuItemDetail() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 500;
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Inject component-scoped carousel CSS once
  useEffect(() => {
    const id = "carousel-component-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.innerHTML = carouselStyles;
      document.head.appendChild(el);
    }
    // no cleanup so styles persist while app runs
  }, []);

  // navigate back to previous page (used by "Back to Menu" button)
  const handleBack = () => {
    // prefer history back; fallback to /menu if no history
    if (window.history.length > 1) navigate(-1);
    else navigate("/menu");
  };

  // decode URI parameters
  const { category: categoryParam, id: idParam } = useParams();
  const categoryDecoded = decodeURIComponent(categoryParam || "");
  const idRaw = decodeURIComponent(idParam || "");

  // memoized menu data processing
  const { menuArray, itemsByKey, groupNameBySlug } = useMemo(() => {
    const arr = Object.values(menuItems).flatMap((v) =>
      Array.isArray(v) ? v : [],
    );
    const map = {};
    const nameMap = {};
    Object.entries(menuItems).forEach(([k, v]) => {
      const s = slugify(k);
      map[s] = Array.isArray(v) ? v.slice() : [];
      nameMap[s] = k;
    });
    return { menuArray: arr, itemsByKey: map, groupNameBySlug: nameMap };
  }, []);

  const categorySlug = slugify(categoryDecoded);

  // primary candidates from explicit groups (by slug)
  let candidates =
    categorySlug === slugify("All Menu")
      ? menuArray
      : itemsByKey[categorySlug] || [];

  // if primary candidates empty, attempt to find group by name match (case-insensitive)
  if ((!candidates || candidates.length === 0) && categoryDecoded) {
    const entry = Object.entries(menuItems).find(
      ([groupName]) =>
        groupName.toLowerCase() === categoryDecoded.toLowerCase(),
    );
    if (entry) candidates = Array.isArray(entry[1]) ? entry[1] : [];
  }

  // final fallback: fuzzy filter across all items using the decoded category text
  if ((!candidates || candidates.length === 0) && categoryDecoded) {
    const q = categoryDecoded.replace(/-/g, " ").toLowerCase();
    candidates = menuArray.filter((it) =>
      `${it.name || ""} ${it.description || ""}`.toLowerCase().includes(q),
    );
  }

  // find item by id (try strict string match, numeric match, slug match of name, or name exact)
  const item =
    candidates.find((it) => String(it.id) === idRaw) ||
    candidates.find((it) => it.id && Number(it.id) === Number(idRaw)) ||
    candidates.find((it) => it.name && slugify(it.name) === slugify(idRaw)) ||
    candidates.find((it) => it.name && it.name === idRaw);

  if (!item) {
    // show available items in resolved group if any
    const resolvedGroupName =
      groupNameBySlug[categorySlug] || categoryDecoded || "Unknown";
    const groupList =
      (itemsByKey[categorySlug] && itemsByKey[categorySlug].slice()) || [];

    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">Item not found</h1>
        <p className="mb-2">
          Category: <strong>{resolvedGroupName}</strong>, ID:{" "}
          <strong>{idRaw || "—"}</strong>
        </p>

        {groupList.length > 0 ? (
          <>
            <p className="mb-2">Available items in this category:</p>
            <ul className="mb-4 list-disc pl-5">
              {groupList.map((g) => (
                <li key={String(g.id)}>
                  <Link
                    to={`/menu/${encodeURIComponent(resolvedGroupName)}/${encodeURIComponent(
                      String(g.id),
                    )}`}
                    className="text-green-600 underline"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mb-4 text-sm text-gray-600">
            No items found for this category.
          </p>
        )}

        <button
          onClick={handleBack}
          type="button"
          className="text-green-600 underline"
        >
          Back to menu
        </button>
      </main>
    );
  }

  const nutrition = item.nutritionInfo || {};
  const [openNutrition, setOpenNutrition] = useState(true);
  const [openAllergens, setOpenAllergens] = useState(false);
  const allergens = item.allergens || [];

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/img/menu/menubg.svg";
  };

  // build slides from item images / gallery / single image; fallback to top-level slidesData
  const slides =
    (Array.isArray(item?.images) && item.images.length
      ? item.images
      : Array.isArray(item?.gallery) && item.gallery.length
        ? item.gallery
        : item?.image || item?.img
          ? [item.image || item.img]
          : slidesData) || [];

  // ensure currentSlide is valid when slides change (run after slides is available)
  useEffect(() => {
    if (slides && slides.length && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // autoplay controller (start/stop and restart on user interaction)
  const autoplayRef = useRef(null);

  const startAutoplay = () => {
    // ensure any previous timer cleared
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!slides || slides.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  // start autoplay when slides change; cleanup on unmount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [slides.length]);

  // navigation helpers reset autoplay so user interaction is respected
  const goToSlide = (index) => {
    const idx = index % Math.max(1, slides.length);
    stopAutoplay();
    setCurrentSlide(idx);
    startAutoplay();
  };

  const nextSlide = () => {
    stopAutoplay();
    setCurrentSlide((prev) => {
      const next = (prev + 1) % Math.max(1, slides.length);
      return next;
    });
    startAutoplay();
  };

  const prevSlide = () => {
    stopAutoplay();
    setCurrentSlide((prev) => {
      const p =
        (prev - 1 + Math.max(1, slides.length)) % Math.max(1, slides.length);
      return p;
    });
    startAutoplay();
  };

  return (
    <section>
      <div className="relative mt-20 h-[300px]">
        <div className="absolute inset-0">
          <img
            src="/img/menu-banner.jpg"
            alt="Menu Banner"
            onError={handleImgError}
            className="h-full w-full object-cover opacity-50"
          />
        </div>
      </div>

      <main className="main_box mx-auto max-w-7xl px-6">
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-green-600 hover:underline"
          type="button"
        >
          ← Back to Menu
        </button>

        <div className="mx-auto max-w-7xl rounded-lg bg-white px-4 py-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-r-none">
              <div className="carousel-hero-banner">
                <div className="carousel-images" ref={containerRef}>
                  {/* track-based layout: width = slides.length * 100% */}
                  <div
                    className="carousel-track"
                    style={{
                      width: `${slides.length * 100}%`,
                      transform: `translateX(-${(currentSlide * 100) / slides.length}%)`,
                    }}
                  >
                    {slides.map((slide, index) => {
                      const src =
                        typeof slide === "string"
                          ? slide
                          : slide.image || slide.src;
                      const title =
                        typeof slide === "string" ? "" : slide.title || "";
                      const desc =
                        typeof slide === "string"
                          ? ""
                          : slide.description || "";
                      const btnText =
                        typeof slide === "string" ? "" : slide.buttonText || "";
                      return (
                        <div key={index} className="carousel-item">
                          <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            onError={handleImgError}
                          />
                          {(title || desc || btnText) && (
                            <div className="slide-content">
                              <h1>{title}</h1>
                              <p>{desc}</p>
                              {btnText && (
                                <a href="#" className="cta-button">
                                  {btnText}
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  className="nav-button prev"
                  onClick={prevSlide}
                  aria-label="Previous"
                >
                  &#10094;
                </button>
                <button
                  className="nav-button next"
                  onClick={nextSlide}
                  aria-label="Next"
                >
                  &#10095;
                </button>

                <div className="carousel-indicators">
                  {slides.map((_, index) => (
                    <span
                      key={index}
                      className={`dot ${index === currentSlide ? "active" : ""}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8">
              <h1 className="mb-2 text-3xl font-extrabold text-gray-900">
                {item.name}
              </h1>
              <p className="mb-4 text-sm text-gray-500">{item.subtitle}</p>

              <div className="mb-6 flex items-center gap-6">
                <div>
                  <div className="text-xs text-gray-500">Calories</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {nutrition.calories}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Price</div>
                  <div className="text-lg font-bold text-orange-500">
                    ₹{item.price}
                  </div>
                </div>
              </div>

              <p className="mb-6 text-gray-700">{item.description}</p>
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto mt-16 w-full py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-8 text-center text-4xl font-extrabold text-green-500">
            Nutritional Information
          </h1>

          <div className="mt-6 rounded-lg border border-gray-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenNutrition((s) => !s)}
              aria-expanded={openNutrition}
              type="button"
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  Nutrition summary
                </div>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform ${openNutrition ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openNutrition && (
              <div className="border-t border-gray-100 px-6 py-5">
                <div className="mb-8 grid grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.calories}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.protein}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.carbs}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Total Carbs
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">
                      {nutrition.fat}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">Total Fat</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-lg border border-gray-100 bg-white">
            <button
              className="flex w-full items-center justify-between px-6 py-4 text-left"
              onClick={() => setOpenAllergens((s) => !s)}
              aria-expanded={openAllergens}
              type="button"
            >
              <div>
                <div className="text-2xl font-semibold text-gray-800">
                  Allergen Information
                </div>
              </div>
              <svg
                className={`h-5 w-5 transform transition-transform ${openAllergens ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openAllergens && (
              <div className="border-t border-gray-100 px-6 py-5">
                <p className="mb-2 text-sm text-gray-600">Contains:</p>
                <div className="flex flex-wrap gap-2">
                  {allergens.map((a) => (
                    <span
                      key={a}
                      className="rounded bg-red-50 px-3 py-1 text-sm font-medium text-red-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
