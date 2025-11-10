import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon 🌿");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-eco mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have feedback or suggestions? We’d love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-eco focus:border-eco"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-eco focus:border-eco"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-eco focus:border-eco"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-eco text-white font-semibold py-3 rounded-md hover:bg-green-600 transition"
          >
            Send Message
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
