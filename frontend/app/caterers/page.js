"use client";

import { useState, useEffect, useMemo } from "react";
import CatererCard from "../../components/CatererCard";
import Navbar from "../../components/Navbar";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹400", min: 0, max: 400 },
  { label: "₹400 – ₹600", min: 400, max: 600 },
  { label: "₹600 – ₹800", min: 600, max: 800 },
  { label: "Above ₹800", min: 800, max: Infinity },
];

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    async function fetchCaterers() {
      try {
        const res = await fetch("/api/caterers");
        if (!res.ok) throw new Error("Failed to fetch caterers");
        const json = await res.json();
        setCaterers(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCaterers();
  }, []);

  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[priceRange];
    return caterers
      .filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
        const matchesPrice = c.pricePerPlate >= min && c.pricePerPlate <= max;
        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price_asc") return a.pricePerPlate - b.pricePerPlate;
        if (sortBy === "price_desc") return b.pricePerPlate - a.pricePerPlate;
        return 0;
      });
  }, [caterers, search, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Find Your Perfect Caterer
          </h1>
          <p className="text-orange-100 text-lg">
            Browse {caterers.length > 0 ? caterers.length : "curated"} top-rated
            caterers across India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search caterers by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-12"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Price filter */}
            <div className="relative lg:w-56">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="input-base pl-10 appearance-none cursor-pointer"
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative lg:w-52">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-base pl-10 appearance-none cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing{" "}
              <span className="font-semibold text-gray-800">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "caterer" : "caterers"}
              {search && (
                <> for &ldquo;<span className="text-orange-500 font-semibold">{search}</span>&rdquo;</>
              )}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="h-1.5 bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded-lg animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-lg animate-pulse w-1/2" />
                  <div className="h-4 bg-gray-100 rounded-lg animate-pulse w-1/3" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-6 bg-gray-100 rounded-lg animate-pulse w-20" />
                    <div className="h-6 bg-gray-100 rounded-lg animate-pulse w-16" />
                  </div>
                  <div className="h-12 bg-gray-100 rounded-xl animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Failed to load caterers</h3>
            <p className="text-gray-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No caterers found</h3>
            <p className="text-gray-500 text-sm mb-4">
              Try adjusting your search or filter criteria.
            </p>
            <button
              onClick={() => { setSearch(""); setPriceRange(0); }}
              className="btn-primary text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Caterer grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((caterer) => (
              <CatererCard key={caterer.id} caterer={caterer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
