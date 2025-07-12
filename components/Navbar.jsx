import { ChevronLeft, ChevronRight, Menu, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <Menu className="w-5 h-5" />
            <div className="hidden md:flex space-x-8 font-medium">
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">Collections</a>
              <a href="#" className="hover:underline">New</a>
            </div>
          </div>

          {/* Center Arrow Logo */}
          <div className="flex items-center justify-center">
            <img src="/assets/logo.png" alt="Logo" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-1 rounded-full border font-semibold flex items-center space-x-1 bg-black text-white">
              <span>Cart</span>
            </button>
            <button className="w-8 h-8 rounded-full border bg-black flex items-center justify-center">
              <User className="w-4 h-4" color="white" />
            </button>
          </div>
        </nav>
  )
}

export default Navbar