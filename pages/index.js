import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResults(data.suggestions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* 🌿 HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-eco to-green-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/hero-leaves.jpg"
            alt="Eco background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Shop Sustainably. Discover Alternatives.
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Use AI to find eco-friendly alternatives to everyday products 🌱
          </p>

          <form
            onSubmit={handleSearch}
            className="flex max-w-lg mx-auto gap-2 bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., plastic toothbrush"
              className="flex-1 p-4 text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-eco text-white font-semibold hover:bg-green-600 transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </section>

      <main className="flex-grow max-w-6xl mx-auto px-6 mt-16">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* 🌎 WHY IT MATTERS SECTION */}
        <section className="grid gap-8 md:grid-cols-3 text-center mb-16">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/images/leaf-icon.png"
              alt="Reduce Waste"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Reduce Waste
            </h3>
            <p className="text-gray-600">
              Choose biodegradable products and help eliminate single-use
              plastics from the environment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/images/earth-icon.png"
              alt="Save Resources"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Save Resources
            </h3>
            <p className="text-gray-600">
              Eco-friendly alternatives use renewable materials and reduce
              energy consumption.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="/images/heart-icon.png"
              alt="Support Eco Brands"
              className="w-12 h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Support Eco Brands
            </h3>
            <p className="text-gray-600">
              Empower companies that are committed to sustainability and ethical
              production.
            </p>
          </div>
        </section>

        {/* 🌿 PRODUCT CARDS */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {results.map((s, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <img
                src={s.imageUrl || "/images/placeholder.jpg"}
                alt={s.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {s.name}
                </h3>
                <span className="inline-block mt-2 px-3 py-1 bg-eco text-white rounded-full text-sm">
                  Eco-Choice
                </span>
                <p className="text-gray-600 mt-3">{s.description}</p>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    s.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-5 py-2 bg-eco hover:bg-green-600 text-white rounded-md"
                >
                  Find Online
                </a>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-10">
            Try searching for something to start 🌍
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
