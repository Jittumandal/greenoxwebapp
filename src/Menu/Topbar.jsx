import React from "react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="hidden rounded-md bg-gray-50 p-2 md:block">
              {/* menu icon */}
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="relative w-[420px] max-w-[60vw]">
              <input
                placeholder="Search or type command..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
