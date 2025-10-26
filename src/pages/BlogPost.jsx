import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { latestStories } from "../Blog/Blog";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaRegBookmark,
} from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";

export default function BlogPost() {
  const [isTableOpen, setIsTableOpen] = useState(true);
  const { slug } = useParams();
  const story = latestStories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-xl text-center">
          <p className="mb-4 text-red-500">Post not found.</p>
          <Link
            to="/blog"
            className="inline-block rounded bg-green-600 px-4 py-2 text-white"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(story.title);

  return (
    <div className="mt-12 min-h-screen bg-[#f7f7f7] pt-10">
      {/* Hero / Banner */}
      <header
        className="relative h-72 bg-cover bg-center md:h-96"
        style={{ backgroundImage: `url(${story.img})` }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-2xl font-bold drop-shadow md:text-4xl">
              {story.title}
            </h1>
            <div className="mt-3 flex items-center justify-center gap-3 text-sm text-white/90">
              <span>{story.date}</span>
              <span className="mx-1">·</span>
              <span>{story.author}</span>
            </div>
          </div>
        </div>
        <Link
          to="/blog"
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded bg-white/90 px-3 py-2 text-sm text-gray-800 hover:bg-white"
        >
          <FiChevronLeft /> Back to Blog
        </Link>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-10">
        <article className="px-6 py-8">
          {/* meta + share */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <img
                src={story.avatar}
                alt={story.author}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-800">
                  {story.author}
                </div>
                <div className="text-xs">{story.date}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                className="flex h-9 w-9 items-center justify-center rounded bg-[#1877F2] text-white transition hover:bg-opacity-90"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded bg-[#1DA1F2] text-white transition hover:bg-opacity-90"
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded bg-[#0A66C2] text-white transition hover:bg-opacity-90"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded bg-[#25D366] text-white transition hover:bg-opacity-90"
                href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <button
                className="flex h-9 w-9 items-center justify-center rounded bg-green-600 text-white transition hover:bg-opacity-90"
                title="Bookmark"
                aria-label="Bookmark"
              >
                <FaRegBookmark />
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="prose max-w-none text-gray-800">
            <h2 className="mb-4 text-2xl font-bold">{story.full}</h2>
            <p className="mb-6 text-gray-700">
              If you can't do without a hot Indian breakfast, there are several
              healthier options to choose from. Take a look:
            </p>

            <p className="mb-6 text-gray-700">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel,
            </p>
            {/* Table of Contents */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Table of Contents</h2>
                <button
                  onClick={() => setIsTableOpen(!isTableOpen)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={isTableOpen ? "Collapse menu" : "Expand menu"}
                >
                  <svg
                    className={`h-6 w-6 transform transition-transform ${
                      isTableOpen ? "rotate-180" : ""
                    }`}
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
              </div>
              {isTableOpen && (
                <ol className="list-decimal pl-5 text-gray-600">
                  <li className="mb-2">
                    <a href="#parathas" className="hover:text-green-600">
                      Parathas? No, please!
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#toast" className="hover:text-green-600">
                      Bye-bye buttered toast
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#noodles" className="hover:text-green-600">
                      Instant noodles? No-no
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#vada" className="hover:text-green-600">
                      Vada Pav is out
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#misal" className="hover:text-green-600">
                      Misal Pav? After a makeover
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#pancakes" className="hover:text-green-600">
                      Pancakes, only whole wheat
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#puri" className="hover:text-green-600">
                      Puri bhaji? Sorry!
                    </a>
                  </li>
                </ol>
              )}
            </div>

            {/* Article Content */}
            <div className="space-y-8">
              <section id="parathas" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Parathas? No, please!
                </h2>
                <p className="text-gray-700">
                  Stick to whole-wheat atta, and roast them instead of frying in
                  oil. Lose the butter and pickle, and add aloo stuffing.
                  Instead, add palak puree to the dough, or stuff with methi
                  greens mashed and boiled peas, beans and carrots.
                </p>
              </section>

              <section id="toast" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Bye-bye buttered toast
                </h2>
                <p className="text-gray-700">
                  Have a grilled brown bread sandwich instead with cucumber and
                  tomato and some green chutney to add some zing.
                </p>
              </section>

              <section id="noodles" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Instant noodles? No-no
                </h2>
                <p className="text-gray-700">
                  Instead, use vermicelli, mixed spices and lots of vegetables
                  to make a tasty and wholesome upma-style preparation.
                </p>
              </section>

              <section id="vada" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">Vada Pav is out</h2>
                <p className="text-gray-700">
                  Skip the vada pav, and opt for a whole grain sandwich with
                  veggies and a protein source like paneer or tofu.
                </p>
              </section>

              <section id="misal" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Misal Pav? After a makeover
                </h2>
                <p className="text-gray-700">
                  Go for a healthier misal made with sprouts, topped with
                  onions, tomatoes, and a squeeze of lemon. Skip the pav or
                  choose whole wheat pav.
                </p>
              </section>

              <section id="pancakes" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">
                  Pancakes, only whole wheat
                </h2>
                <p className="text-gray-700">
                  Enjoy pancakes made with whole wheat flour, and skip the
                  syrup. Top with fresh fruits, nuts, and a drizzle of honey or
                  maple syrup.
                </p>
              </section>

              <section id="puri" className="scroll-mt-20">
                <h2 className="mb-4 text-2xl font-bold">Puri bhaji? Sorry!</h2>
                <p className="text-gray-700">
                  Avoid puri bhaji, and choose a bowl of poha or upma loaded
                  with vegetables. It's lighter and packed with nutrients.
                </p>
              </section>
            </div>

            {/* tags / category */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/blog/category/health-tips"
                className="rounded bg-orange-500 px-4 py-3 text-sm text-gray-700 text-white transition-colors hover:bg-green-100 hover:text-green-700"
              >
                Health tips
              </Link>
              <Link
                to="/blog/category/diet"
                className="rounded bg-orange-500 px-4 py-3 text-sm text-gray-700 text-white transition-colors hover:bg-green-100 hover:text-green-700"
              >
                Diet
              </Link>
            </div>
          </div>

          {/* Author box */}
          <div className="mt-10 rounded border border-gray-100 bg-gray-50 p-6">
            <div className="flex items-center gap-4">
              <img
                src={story.avatar}
                alt={story.author}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-gray-800">
                  {story.author}
                </div>
                <div className="text-sm text-gray-600">
                  Nutrition & wellness writer at GreeNox
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
