import React, { useEffect, useState } from 'react';
import myImage from '../assets/1.png';
import myImage2 from '../assets/2.png';

export const navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Handle resize for responsiveness
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine if we're on mobile
  const isMobile = windowWidth < 768;

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between px-2 md:px-5 py-3 md:py-4 transition-all duration-300 ${
      scrolled 
        ? "bg-gradient-to-r from-amber-100 to-orange-100 shadow-md" 
        : "bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm"
    }`}>
      {/* Left logo with hover effect */}
      <div className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24 md:w-28 md:h-28'} ml-2 md:ml-6 transition-all duration-300 hover:scale-105`}>
        <img 
          src={myImage} 
          alt="ISKCON Logo" 
          className="object-contain w-full h-full" 
        />
      </div>

      {/* Center heading with enhanced typography */}
      <div className={`flex-1 text-center ${isMobile ? 'my-2' : ''}`}>
        <h1 className={`font-serif ${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'} font-bold tracking-wider text-amber-800 mb-1 transition-all duration-300 hover:text-amber-700`}>
          ISKCON KANPUR
        </h1>
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <p className={`font-sans ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-semibold tracking-wide text-amber-700 mt-2 pt-2 transition-colors duration-300`}>
            Online Bhakti Sashtri
          </p>
        </div>
      </div>

      {/* Right logo with hover effect */}
      <div className={`${isMobile ? 'w-20 h-20' : 'w-24 h-24 md:w-28 md:h-28'} mr-2 md:mr-6 transition-all duration-300 hover:scale-105`}>
        <img 
          src={myImage2} 
          alt="Bhakti Sashtri Logo" 
          className="object-contain w-full h-full" 
        />
      </div>
    </div>
  );
}