import React from 'react';
import { Menu, User } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="">
        <Navbar/>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <img 
                src="/assets/landing-img-2.png" 
                alt="Abstract Print Shirt"
                className="w-full"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm p-8 flex items-center">
            <div className="space-y-6">
              {/* Product Title and Price */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  ABSTRACT PRINT SHIRT
                </h1>
                <p className="text-3xl font-bold text-gray-900">$99</p>
                <p className="text-sm text-gray-600 mt-1">MRP incl. of all taxes</p>
              </div>

              {/* Product Description */}
              <div>
                <p className="text-gray-700 leading-relaxed">
                  Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
                </p>
              </div>
              <div className='flex gap-x-2'>

              <div className='bg-black text-white text-[10px] rounded-2xl px-2 py-1 w-fit'>Swappable</div>
              <div className='bg-[#36583d] text-white text-[10px] rounded-2xl px-2 py-1 w-fit'>Points Redeemable</div>
              </div>
            

              {/* Add to Cart Button */}
              <button className="w-full bg-gray-200 hover:bg-black hover:text-white text-gray-800 font-medium py-3 px-6 rounded-none transition duration-200">
                ADD
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;