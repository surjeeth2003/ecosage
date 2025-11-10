import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-eco mb-6 text-center">
          About EcoSage
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          <strong>EcoSage</strong> is your AI-powered companion for sustainable living.
          Our mission is to help you discover eco-friendly alternatives to
          everyday products — making it easier to shop consciously and reduce
          your carbon footprint.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Whether it’s replacing plastic toothbrushes with bamboo ones, or finding
          biodegradable cleaning products, we connect you to green options that
          align with your values.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Together, we can promote sustainable habits that protect our planet for
          future generations 🌎.
        </p>
      </main>
      <Footer />
    </div>
  );
}
