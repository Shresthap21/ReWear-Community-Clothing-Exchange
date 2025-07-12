"use client";
import ApproachSection from "@/components/ApproachSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewCollection from "@/components/NewCollection";
import { ChevronLeft, ChevronRight, Menu, Search, User } from "lucide-react";

export default function Page() {
  return (
    <div className="font-beatrice min-h-screen bg-[#f5f5f5] text-black">
      {/* Navbar */}
    <Navbar/>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 lg:px-20 py-12 items-start">
        {/* Left Section - Text + Buttons */}
        <div className="space-y-6">
          <div className="space-y-2 uppercase text-sm text-gray-600">
            <div>Men</div>
            <div>Women</div>
            <div>Kids</div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 bg-[#e0e0e0] border-0 rounded focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          <div className="mt-12">
            <h1 className="text-5xl font-black leading-tight">
              NEW <br /> COLLECTION
            </h1>
            <p className="mt-4 text-lg text-gray-700">Summer<br />2024</p>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <button className="px-6 py-3 border text-sm font-medium flex items-center space-x-2 bg-[#D9D9D9] hover:bg-black hover:text-white transition">
              <span>Go To Shop</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex space-x-2">
              <button className="border p-2 hover:bg-gray-200 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="border p-2 hover:bg-gray-200 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <img src="/assets/landing-img-1.png"/>
        </div>
        <div>
          <img src="/assets/landing-img-2.png"/>
        </div>
      </div>
      <NewCollection/>
      <ApproachSection/>
      <Footer/>
    </div>
  );
}
