import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Find Caterers for Your Event
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Caterers
            <span className="block text-yellow-300">Near Me</span>
          </h1>

          <p className="text-xl md:text-2xl text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the finest caterers for weddings, corporate events, and
            celebrations. Taste the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/caterers"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-200 shadow-2xl hover:shadow-orange-900/30 hover:-translate-y-0.5"
            >
              Browse Caterers
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {[
              { label: "Caterers", value: "500+" },
              { label: "Cities", value: "50+" },
              { label: "Events Done", value: "10K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-orange-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-white py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🔍", title: "Easy Search", desc: "Find caterers by name instantly" },
            { icon: "💰", title: "Price Filter", desc: "Filter by your budget range" },
            { icon: "⭐", title: "Verified Ratings", desc: "Honest reviews from real clients" },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="font-bold text-gray-800 text-lg">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
