"use client";
import Navbar from "@/components/Navbar";
import { Menu, Search, ChevronLeft, ChevronRight, User } from "lucide-react";

const tags = ["NEW", "SHIRTS", "POLO SHIRTS", "SHORTS", "T-SHIRTS", "JEANS", "JACKETS"];

const products = Array(6).fill({
  title: "Basic Slim Fit T-Shirt",
  price: "$199",
  type: "Cotton T Shirt",
});

export default function ProductsPage() {
  return (
    <div className="bg-[#f5f5f5] text-black min-h-screen font-beatrice">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="px-6 lg:px-20 py-10">
        {/* Breadcrumb */}
        <p className="text-sm text-gray-600 mb-2">Home / Products</p>

        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6 uppercase">Products</h1>

        {/* Search + Tags */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-[#E0E0E0] rounded focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className="border px-3 py-1 text-sm hover:bg-black hover:text-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="text-center">
              <img
                src="/assets/landing-img-1.png"
                alt="Product"
                className="w-full max-h-[60vh] object-cover mb-4"
              />
              <p className="text-xs text-gray-600">{product.type}</p>
              <h3 className="text-sm font-medium">{product.title}</h3>
              <p className="text-sm font-semibold mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
