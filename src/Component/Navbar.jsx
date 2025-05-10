import React from 'react';
import myImage from '../assets/1.png';
import myImage2 from '../assets/2.png';

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm">
      {/* Left logo */}
      <div className="w-28 h-28 ml-6">
        <img src={myImage} alt="Logo Left" className="object-contain w-full h-full" />
      </div>

      {/* Center heading with enhanced typography */}
      <div className="flex-1 text-center">
        <h1 className="font-serif text-6xl font-bold tracking-wider text-amber-800 mb-1">
          ISKCON KANPUR
        </h1>
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className="font-sans text-2xl font-semibold font-stretch-100% font-stretch-extra-condensed tracking-wide text-amber-700 mt-2 pt-2">
            Online Bhakti Sashtri
          </p>
        </div>
      </div>

      {/* Right logo */}
      <div className="w-28 h-28 mr-6">
        <img src={myImage2} alt="Logo Right" className="object-contain w-full h-full" />
      </div>
    </div>
  );
};