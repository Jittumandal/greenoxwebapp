import React from "react";
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
        <article className="rounded-md bg-white px-6 py-8 shadow">
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
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-100"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-100"
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-100"
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-100"
                href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp />
              </a>
              <button
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-100"
                title="Bookmark"
                aria-label="Bookmark"
              >
                <FaRegBookmark />
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="prose max-w-none text-gray-800">
            {/* If story.full contains HTML, switch to dangerouslySetInnerHTML */}
            <p className="leading-7">{story.full}</p>

            {/* Example numbered list styling for multi-point content (if needed) */}
            <ol className="blog_list mt-6 list-decimal pl-6">
              <li>
                In 2015 the USDA published their most recent Dietary Guidelines.
                One of the recommendations was to fill about one quarter of our
                plates with grains. They also recommended that at least half of
                those grains be whole grains. Can you tell the difference
                between whole grains and refined grains? Grains are defined as
                the seed of a plant that is harvested for food. A whole grain
                product includes all three parts of the grain: the bran,
                endosperm, and germ. A refined grain is a milled product that
                takes away the bran and germ and leaves only the endosperm.
              </li>
              <li>
                Why is it healthful to eat all three parts of the grain? It
                turns out that stripping the grain of the bran and germ also
                strips the grain of important nutrients. Compared to the
                endosperm, the bran contains twice the amount of protein and 10
                times the amount of fiber. Yes, grains do have protein and
                fiber, but not very much if you only eat refined grains. As for
                the germ, it contains three times as much protein and nearly
                three times as much fiber than the endosperm. It also contains
                healthy fats, like omega-3 and omega-6 fatty acids, which are
                absent in the endosperm. Lastly, the bran and germ contain many
                of the Vitamin B complex whereas the endosperm does not.
              </li>
              <li>
                In addition to being generally good for our bodies, the fiber,
                protein and healthy fats found in whole grains give us a sense
                of fullness when we are eating and help us not to overeat.
                Because grains are broken down in our digestive system to simple
                sugars, eating refined grains can cause a spike in our blood
                sugar followed by a rapid drop in blood sugar. Whole grains,
                with their fiber, protein and fats, take longer for our bodies
                to digest which allows sugar to be absorbed in a more stable
                manner. What does this mean for our kids? Less craving of
                starches and sugars and perhaps less moodiness in between meals
                (though I can’t blame that solely on refined grains and sugars
                in teenagers!)
              </li>
              <li>
                Examples of Whole Grains brown rice quinoa oatmeal popcorn oat
                bran bulgur (cracked wheat) barley buckwheat 100% whole
                wheat/whole grain bread, pasta or crackers Examples of Refined
                Grains white or “wheat” bread (not 100% whole wheat) white rice
                corn flakes couscous pasta (not 100% whole grain) grits pretzels
                most crackers and snack foods
              </li>
              <li>
                Including Whole Grains into Your Diet Chances are you eat some
                food from each of the lists above and that’s okay. What you
                might want to try is taking a look at all the grains you and
                your family eat and figuring out which ones are whole grains vs.
                refined. If you find that more than half are not whole grains,
                you are not alone. Most Americans eat plenty – if not too many –
                grains, but do not eat the recommended portion of whole grains.
              </li>
              <li>
                To move in a healthier direction, consider making some
                substitutes for your favorite refined grains. For instance, try
                switching your white rice to brown rice. It takes a little
                longer to cook, so consider batch cooking at the beginning of
                the week and reheating it with your favorite meals later in the
                week. Try whole wheat pasta instead of white pasta. There’s
                little to no difference in cooking time and they even sell whole
                wheat pasta made with white whole wheat, so it doesn’t even look
                different! Consider a bowl of oatmeal for breakfast instead of
                reaching for your typical cereal. You may really enjoy it with
                some fruit and cinnamon on top.
              </li>
              <li>
                There are many ways to put whole grains into your diet without
                making major changes. For more ideas and tips take a look at the
                Choose My Plate website. Happy eating!
              </li>
            </ol>

            {/* tags / category */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
                Health tips
              </span>
              <span className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
                Diet
              </span>
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
