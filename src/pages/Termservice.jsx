import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

export default function TermsService() {
  const sections = [
    { id: "acceptance", title: "I. Acceptance of terms" },
    {
      id: "definitions",
      title: "II. Definitions",
      children: [
        { id: "definitions-customer", title: "Customer" },
        { id: "definitions-content", title: "Content" },
        {
          id: "definitions-restaurant",
          title: "Restaurant(s)/ Restaurant Partner(s)",
        },
      ],
    },
    { id: "eligibility", title: "III. Eligibility to use the services" },
    { id: "changes", title: "IV. Changes to the terms" },
    { id: "translation", title: "V. Translation of the terms" },
    {
      id: "provision",
      title: "VI. Provision of the services being offered by Zomato",
    },
    {
      id: "use",
      title: "VII. Use of services by you or Customer",
      children: [
        {
          id: "use-account",
          title:
            "1. Zomato Customer Account Including 'Claim Your Business Listing' Access",
        },
        { id: "use-others", title: "2. Others Terms" },
      ],
    },
    {
      id: "content",
      title: "VIII. Content",
      children: [
        {
          id: "content-ownership",
          title: "1. Ownership of Zomato Content and Proprietary Rights",
        },
        {
          id: "content-license-to-zomato",
          title: "2. Your License to Zomato Content",
        },
        {
          id: "content-zomato-license",
          title: "3. Zomato License to Your or Customer Content",
        },
        {
          id: "content-rep",
          title: "4. Representations Regarding Your or Customer Content",
        },
        { id: "content-removal", title: "5. Content Removal" },
        { id: "content-thirdparty", title: "6. Third Party Content and Links" },
        { id: "content-reviews", title: "7. Customer Reviews" },
      ],
    },
    {
      id: "content-guidelines",
      title: "IX. Content guidelines and privacy policy",
      children: [
        { id: "guidelines", title: "1. Content Guidelines" },
        { id: "privacy", title: "2. Privacy Policy" },
      ],
    },
    { id: "restrictions", title: "X. Restrictions on use" },
    { id: "feedback", title: "XI. Customer feedback" },
    { id: "advertising", title: "XII. Advertising" },
    {
      id: "additional",
      title:
        "XIII. Additional Terms and Conditions for Customers using the various services offered by Zomato:",
      children: [
        { id: "food-ordering", title: "1. FOOD ORDERING AND DELIVERY" },
        { id: "zomato-pay", title: "2. ZOMATO PAY" },
        { id: "book-service", title: "3. BOOK SERVICE/TABLE RESERVATIONS" },
        { id: "gold", title: "4. ZOMATO GOLD" },
        { id: "hygiene", title: "5. FOOD HYGIENE RATINGS" },
        { id: "wallet", title: "6. EDITION WALLET" },
        { id: "delivery-offer", title: "7. DELIVERY OFFER / PLAN" },
      ],
    },
    {
      id: "disclaimer",
      title:
        "XIV. Disclaimer of warranties, limitation of liability, and Indemnification",
      children: [
        { id: "disclaimer-warranty", title: "1. Disclaimer of Warranties" },
        { id: "limitation", title: "2. Limitation of Liability" },
      ],
    },
    {
      id: "termination",
      title: "XV. Termination of your access to the services",
    },
    { id: "general", title: "XVI. General terms" },
    { id: "copyright", title: "XVII. Notice of copyright infringement" },
    {
      id: "contact",
      title: "XVIII. Contact Us",
      children: [
        { id: "company-details", title: "1. Details of the Company" },
        { id: "grievance", title: "2. Grievance Redressal Mechanism" },
      ],
    },
    { id: "company", title: "COMPANY" },
  ];

  const flatIds = useMemo(() => {
    const ids = [];
    sections.forEach((s) => {
      ids.push(s.id);
      if (s.children) s.children.forEach((c) => ids.push(c.id));
    });
    return ids;
  }, [sections]);

  const [activeId, setActiveId] = useState(flatIds[0] || "");
  const articleRef = useRef(null);

  useEffect(() => {
    const rootEl = articleRef.current;
    if (!rootEl) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      {
        root: rootEl,
        rootMargin: "0px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    flatIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [flatIds]);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const rootEl = articleRef.current;
    const target = document.getElementById(id);
    if (!rootEl || !target) return;

    const top =
      target.getBoundingClientRect().top -
      rootEl.getBoundingClientRect().top +
      rootEl.scrollTop;

    rootEl.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative min-h-[420px] bg-gradient-to-r from-emerald-900 via-green-800 to-amber-700"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/img/Terms-and-conditions.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 pt-32 text-center">
          <h1 className="mb-6 text-5xl font-bold leading-[70px] text-white">
            Empowering Your Experience <br />
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-green-500 to-amber-400 bg-clip-text text-transparent">
              Our Terms &amp; Conditions
            </span>
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-white/90">
            Welcome to GreeNox! Our Terms &amp; Conditions outline the rules and
            guidelines for using our services.
          </p>
        </div>
      </div>

      <main className="terms-page scroll-smooth">
        <div className="terms-container fixed-left max-w-8xl mx-auto px-6 py-12 md:gap-8">
          {/* LEFT: TOC */}
          <nav className="terms-sidebar order-1 mb-6 md:order-1 md:mb-0">
            <div className="hidden md:block">
              <div className="sticky top-28">
                <div className="thin-scroll max-h-[70vh] w-64 overflow-y-auto rounded-md border-l border-slate-200 bg-white px-6 py-5 pr-2">
                  <h3 className="text-sm font-semibold text-slate-500">
                    On this page
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {sections.map((s) => {
                      const activeTop = s.id === activeId;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            onClick={(e) => handleTocClick(e, s.id)}
                            className={
                              "block rounded-sm px-2 py-1 text-sm " +
                              (activeTop
                                ? "border-l-4 border-emerald-500 pl-3 font-semibold text-slate-900"
                                : "text-slate-600 hover:text-slate-900")
                            }
                          >
                            {s.title}
                          </a>

                          {s.children && (
                            <ul className="ml-3 mt-2 space-y-1">
                              {s.children.map((c) => {
                                const activeChild = c.id === activeId;
                                return (
                                  <li key={c.id}>
                                    <a
                                      href={`#${c.id}`}
                                      onClick={(e) => handleTocClick(e, c.id)}
                                      className={
                                        "block text-sm " +
                                        (activeChild
                                          ? "pl-2 font-semibold text-slate-900"
                                          : "text-slate-500 hover:text-slate-900")
                                      }
                                    >
                                      {c.title}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* mobile TOC */}
            <div className="mt-6 md:hidden">
              <details className="rounded-md border border-slate-100 bg-white p-3">
                <summary className="text-sm font-semibold text-slate-700">
                  On this page
                </summary>
                <ul className="mt-3 space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => handleTocClick(e, s.id)}
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        {s.title}
                      </a>
                      {s.children && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {s.children.map((c) => (
                            <li key={c.id}>
                              <a
                                href={`#${c.id}`}
                                onClick={(e) => handleTocClick(e, c.id)}
                                className="text-sm text-slate-500 hover:text-slate-900"
                              >
                                {c.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </nav>

          {/* RIGHT: Article content (scrollable on md+) */}
          <article
            ref={articleRef}
            className="terms-content thin-scroll order-2 rounded-lg bg-white p-8 md:order-2 md:max-h-[70vh] md:overflow-y-auto md:pr-4"
          >
            <h1
              id="terms-title"
              className="text-2xl font-extrabold text-slate-900"
            >
              Terms of Service
            </h1>

            <p className="mt-4 text-sm text-slate-600">
              These Terms govern your access to and use of our services.
            </p>

            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="terms-section mt-10 pt-6"
              >
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900">
                  {s.title}
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  Placeholder content for {s.title}. Replace with your final
                  legal text. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Integer nec odio. Praesent libero. Sed cursus ante
                  dapibus diam.
                </p>

                {s.children &&
                  s.children.map((c) => (
                    <div key={c.id} id={c.id} className="mt-6">
                      <h3 className="mb-2 text-lg font-semibold text-slate-800">
                        {c.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        Placeholder for {c.title}. Provide the specific details
                        for this subsection.
                      </p>
                    </div>
                  ))}
              </section>
            ))}

            <div className="terms-footer mt-8">
              <button
                onClick={() => window.history.back()}
                className="font-medium text-green-600"
              >
                ← Back
              </button>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
