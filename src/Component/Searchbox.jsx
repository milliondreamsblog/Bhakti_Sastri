import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';  

export const Searchbox = ({ setResultList }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced fetch data function to prevent excessive API calls
  const fetchData = (value) => {
    if (value.trim() === '') {
      setResultList([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Set new timeout
    debounceTimeout.current = setTimeout(() => {
      fetch('https://raw.githubusercontent.com/milliondreamsblog/Student_result_api/refs/heads/main/student_results.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(json => {
          const results = json.filter((user) => {
            return (
              user &&
              user["Name of Devotee"] &&
              user["Name of Devotee"].toLowerCase().includes(value.toLowerCase())
            );
          });
          setResultList(results);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
          setResultList([]);
        });
    }, 300); // 300ms debounce
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (input.trim()) {
      fetchData(input);
    }
  };

  return (
    <div 
      ref={searchRef}
      className={`relative mx-auto ${isFocused ? 'z-10' : ''}`}
    >
      <div 
        className={`flex items-center bg-white rounded-md h-10 w-full max-w-md md:max-w-lg lg:max-w-xl px-4 
          ${isLoading ? 'shadow-md' : 'shadow'} 
          ${isFocused 
            ? 'border-2 border-amber-500 ring-2 ring-amber-200' 
            : 'border border-gray-300 hover:border-amber-300'} 
          transition-all duration-200`}
      >
        <div className="flex items-center justify-center">
          {isLoading ? (
            <div className="animate-spin h-5 w-5">
              <div className="h-full w-full rounded-full border-2 border-t-transparent border-amber-500"></div>
            </div>
          ) : (
            <FaSearch className="text-amber-500 mr-2 w-5 h-5" />
          )}
        </div>
        <input
          type="text"
          placeholder="Search by devotee name..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 py-2"
          aria-label="Search devotees"
        />
        {input && (
          <button
            onClick={() => {
              setInput('');
              setResultList([]);
            }}
            className="ml-2 text-gray-400 hover:text-amber-500 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}