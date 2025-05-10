import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const Searchbox = ({setResultList}) => {
    const [input , setInput] = useState("");

    const fetchData = (value) => {
      fetch('https://raw.githubusercontent.com/milliondreamsblog/Student_result_api/refs/heads/main/student_results.json')
          .then(response => response.json())
          .then(json => {
              console.log(json);
              const results = json.filter((user) => {
                  return (
                      value &&
                      user &&
                      user["Name of Devotee"] &&
                      user["Name of Devotee"].toLowerCase().includes(value.toLowerCase())
                  );
              });
              console.log(json);
              setResultList(results);
          });
  }
  

    const handleChange = (value) =>{
      setInput(value)
      setResultList("");
      fetchData(value);
    }
  
  return (
    <div className="flex items-center bg-white rounded-md h-10 w-[500px] px-4 shadow border border-gray-300  focus-within:ring-blue-500 transition-all duration-200">
      <div>
        <FaSearch id="Search-icon" className="text-red-500 mr-2 w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Full name"
        value = {input}
        onChange={(e) => handleChange(e.target.value)}
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
}
