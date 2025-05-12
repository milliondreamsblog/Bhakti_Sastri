import { useState } from 'react';
import './App.css';
import { Searchbox } from './Component/Searchbox';
import { Searchresult } from './Component/Searchresult';
import { Hero } from './Component/Hero';
import { Marksheet } from './Component/Marksheet';
import { Navbar } from './Component/Navbar';


function App() {
  const [resultList, setResultList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSelect = (student) => {
    setSelectedStudent(student);
    setResultList([]); // Clear dropdown
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-300 flex flex-col">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <div className="pt-24 flex-1 w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <div className="mt-8 min-w-full max-w-lg">
          <Searchbox setResultList={setResultList} />

          {resultList.length > 0 && (
            <Searchresult resultList={resultList} onSelect={handleSelect} />
          )}
        </div>

        {/* Marksheet Section */}
        {selectedStudent && (
          <div className="mt-10 transition-all duration-500 animate-fadeIn min-w-full max-w-lg ">
            <Marksheet student={selectedStudent} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} Student Result App
      </footer>
    </div>
  );
}

export default App;
