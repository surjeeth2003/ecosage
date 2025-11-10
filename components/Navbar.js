export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-eco">🌿 EcoSage</span>
        </a>
        <div className="space-x-6">
          <a href="/" className="text-gray-700 hover:text-eco">Home</a>
          <a href="/about" className="text-gray-700 hover:text-eco">About</a>
          <a href="/contact" className="text-gray-700 hover:text-eco">Contact</a>
        </div>
      </div>
    </nav>
  );
}
