export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} EcoSage. All rights reserved.</p>
        <p className="mt-1">Made with ♻️ for a sustainable future.</p>
      </div>
    </footer>
  );
}
