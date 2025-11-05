import React from "react";
import { useParams, Link } from "react-router-dom";
import { menuItems } from "../data/menuItems";

const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function MenuItemDetails() {
  const params = useParams();
  const categoryParam = decodeURIComponent(params.category || "");
  const idParam = decodeURIComponent(params.id || "");

  const categorySlug = slugify(categoryParam);

  // find the group in menuItems whose key slug matches categorySlug
  const groupEntry = Object.entries(menuItems).find(
    ([groupName]) => slugify(groupName) === categorySlug,
  );
  const group = groupEntry ? groupEntry[1] : [];

  const item = group.find((it) => String(it.id) === String(idParam));

  if (!item) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Item not found</h2>
        <p className="mt-2 text-sm text-gray-600">
          Category: {categoryParam || "(unknown)"} — ID:{" "}
          {idParam || "(unknown)"}
        </p>

        {group.length > 0 ? (
          <>
            <p className="mt-4">Available items in this category:</p>
            <ul className="mt-2 list-disc pl-5">
              {group.map((g) => (
                <li key={String(g.id)}>
                  <Link
                    to={`/menu/${encodeURIComponent(categoryParam)}/${encodeURIComponent(
                      String(g.id),
                    )}`}
                    className="text-blue-600"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-4 text-sm text-gray-500">Category not found.</p>
        )}

        <div className="mt-4">
          <Link to="/menu" className="text-blue-600">
            Back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{item.name}</h1>
      {item.img && (
        // keep same path convention used elsewhere
        // browser will load placeholder via onError if needed
        <img
          src={item.img}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/img/Sandwich.jpg";
          }}
          className="mb-4 mt-4 max-w-xs rounded"
        />
      )}
      <p className="text-gray-700">{item.description}</p>
      <p className="mt-4 font-semibold">
        Price: {item.price ? `₹${item.price}` : "—"}
      </p>

      <div className="mt-6">
        <Link to="/menu" className="text-blue-600">
          Back to menu
        </Link>
      </div>
    </div>
  );
}
