import React from 'react';
import myImage from '../assets/1.png';
import myImage2 from '../assets/2.png';

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-amber-50">
      {/* Left logo */}
      <div className="w-26 h-26 ml-4">
        <img src={myImage} alt="Logo Left" className="object-contain w-full h-full" />
      </div>

      {/* Center heading */}
      <div className="font-playfair text-7xl text-center flex-1">
        ISKCON KANPUR
        <div className='text-3xl font-light font-sans'>presents online bhakti sashtri</div>
      </div>

      {/* Right logo */}
      <div className="w-26 h-26 mr-4">
        <img src={myImage2} alt="Logo Right" className="object-contain w-full h-full" />
      </div>
      
      
    </div>
  );
};
