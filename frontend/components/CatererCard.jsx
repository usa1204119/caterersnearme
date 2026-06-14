export default function CatererCard({ caterer }) {
  const { name, location, pricePerPlate, cuisines, rating } = caterer;

  const stars = Math.round(rating);
  const ratingColor =
    rating >= 4.5
      ? "text-green-600 bg-green-50"
      : rating >= 4.0
      ? "text-orange-600 bg-orange-50"
      : "text-yellow-600 bg-yellow-50";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group">
      {/* Card top accent */}
      <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-500 transition-colors truncate">
              {name}
            </h2>
            <div className="flex items-center gap-1.5 mt-1.5 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>

          {/* Rating badge */}
          <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-sm font-bold shrink-0 ${ratingColor}`}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        </div>

        {/* Star row */}
        <div className="flex items-center gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < stars ? "text-amber-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">({rating.toFixed(1)})</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4" />

        {/* Cuisines */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Cuisines</p>
          <div className="flex flex-wrap gap-1.5">
            {cuisines.map((cuisine) => (
              <span
                key={cuisine}
                className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium border border-orange-100"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mt-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price per Plate</span>
          <span className="text-xl font-extrabold text-gray-900">
            ₹{pricePerPlate.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
