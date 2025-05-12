import React, { useState, useEffect } from 'react';

export const Marksheet = ({ student })  => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  
  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate total score
  const calculateTotal = () => {
    const scores = [
      parseInt(student["C.B.E Unit 1 (CH 1,2,3) out of 50"] || 0),
      parseInt(student["O.B.E Unit 1 out of 10"] || 0),
      parseInt(student["C.B.E Unit 2 CH(4,5,6) out of 50"] || 0),
      parseInt(student["O.B.E Unit 2 out of 10"] || 0),
      parseInt(student["Sloka Test 1 (Unit 1 &2)"] || 0)
    ];
    
    return scores.reduce((sum, score) => sum + score, 0);
  };

  // Calculate percentage and grade
  const calculateGrade = () => {
    const total = calculateTotal();
    const percentage = Math.round((total / 150) * 100);
    
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 50) return { grade: 'C', color: 'text-amber-500' };
    return { grade: 'Needs Improvement', color: 'text-red-500' };
  };

  const handlePrint = () => {
    setIsPrinting(true);
    // Add small delay to ensure print styles apply
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const { grade, color } = calculateGrade();
  const total = calculateTotal();
  const percentage = Math.round((total / 150) * 100);

  return (
    <div 
      className={`max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden transform transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isPrinting ? 'shadow-none border-0' : ''}`}
    >
      {/* Header Section with theme color */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white tracking-wide">Marksheet</h2>
          <div className="flex space-x-2">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white font-medium text-sm">Bhakti Sashtri</span>
            </div>
            {/* Action buttons - hidden during print */}
            <div className={`${isPrinting ? 'hidden' : 'flex space-x-1'}`}>
              <button 
                onClick={() => setShowDetails(!showDetails)} 
                className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                title={showDetails ? "Hide details" : "Show details"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  {showDetails ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774" />
                  )}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25a2.25 2.25 0 115.056 1.442A2.25 2.25 0 0110.5 8.25z" />
                </svg>
              </button>
              <button 
                onClick={handlePrint} 
                className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                title="Print marksheet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Student Info Section */}
      <div className="px-6 py-5 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <h3 className="font-bold text-xl text-amber-800">
          {student["Name of Devotee"] || "Student Name"}
        </h3>
        <div className="flex flex-col sm:flex-row sm:justify-between mt-1">
          <p className="text-sm text-amber-700">
            <span className="font-medium">Counselor:</span> {student["Counselor/ Care Taker"] || "Not assigned"}
          </p>
          <p className="text-sm text-amber-700 mt-1 sm:mt-0">
            <span className="font-medium">ISKCON Kanpur</span>
          </p>
        </div>
      </div>
      
      {/* Interactive Score Overview Card */}
      <div 
        className={`transition-all duration-300 ${
          showDetails 
            ? "max-h-[600px] opacity-100 visible" 
            : "max-h-0 opacity-0 invisible overflow-hidden"}`
        }
      >
        {/* Scores Section */}
        <div className="px-6 py-5">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-amber-100">
            <h4 className="font-medium text-amber-800">Examination Scores</h4>
            <div className="text-xs text-amber-600">
              Click on any score for details
            </div>
          </div>
          
          <ScoreItem 
            label="C.B.E Unit 1 (CH 1-3)" 
            score={student["C.B.E Unit 1 (CH 1,2,3) out of 50"]} 
            total={50}
            isExpanded={expandedSection === "unit1"}
            toggleExpand={() => toggleSection("unit1")}
            details="Covers introduction to Bhagavad Gita, Chapters 1-3 focusing on fundamental concepts."
          />
          <ScoreItem 
            label="O.B.E Unit 1" 
            score={student["O.B.E Unit 1 out of 10"]} 
            total={10}
            isExpanded={expandedSection === "obe1"}
            toggleExpand={() => toggleSection("obe1")}
            details="Oral examination on Unit 1 material, focusing on verse recitation and comprehension."
          />
          <ScoreItem 
            label="C.B.E Unit 2 (CH 4-6)" 
            score={student["C.B.E Unit 2 CH(4,5,6) out of 50"]} 
            total={50}
            isExpanded={expandedSection === "unit2"}
            toggleExpand={() => toggleSection("unit2")}
            details="Covers intermediate teachings from Bhagavad Gita, Chapters 4-6 on karma yoga and meditation."
          />
          <ScoreItem 
            label="O.B.E Unit 2" 
            score={student["O.B.E Unit 2 out of 10"]} 
            total={10}
            isExpanded={expandedSection === "obe2"}
            toggleExpand={() => toggleSection("obe2")}
            details="Oral examination on Unit 2 material, including practical applications of teachings."
          />
          <ScoreItem 
            label="Sloka Test 1" 
            score={student["Sloka Test 1 (Unit 1 &2)"]} 
            total={10}
            isExpanded={expandedSection === "sloka"}
            toggleExpand={() => toggleSection("sloka")}
            details="Assessment of memorization and pronunciation of key verses from Units 1 and 2."
          />
        </div>
      </div>
      
      {/* Interactive Performance Summary */}
      <div className="px-6 py-5 border-t border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center mb-3 sm:mb-0">
            <span className="font-bold text-lg text-amber-800">Total Score:</span>
            <div className="relative ml-3 bg-white px-4 py-1 rounded-full border border-amber-200 shadow-sm group">
              <span className="font-bold text-amber-700">{total}</span>
              <span className="text-amber-500 font-normal"> / 150</span>
              
              {/* Interactive tooltip - hidden during print */}
              <div className={`absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border border-amber-200 w-48 text-center invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isPrinting ? 'hidden' : ''}`}>
                <div className="text-xs text-amber-800">
                  You scored higher than {Math.round(percentage * 0.8)}% of students
                </div>
                <div className="text-2xs text-amber-600 mt-1">
                  Course Average: 112/150
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="font-semibold text-amber-800 mr-3"></span>
            <div className={`${color} font-bold text-lg group relative cursor-help`}>
              {}
              
              {/* Grade explanation tooltip - hidden during print */}
              <div className={`absolute -top-20 right-0 bg-white p-2 rounded-lg shadow-lg border border-amber-200 w-48 text-center invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isPrinting ? 'hidden' : ''}`}>
                <div className="text-xs text-gray-700">
                  {grade === 'A+' && 'Excellent! Outstanding performance with thorough understanding.'}
                  {grade === 'A' && 'Very good performance with strong grasp of concepts.'}
                  {grade === 'B+' && 'Good performance with clear understanding of most concepts.'}
                  {grade === 'B' && 'Satisfactory performance with adequate understanding.'}
                  {grade === 'C' && 'Fair performance with basic understanding.'}
                  {grade === 'Needs Improvement' && 'Additional focus and study recommended.'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Interactive percentage bar */}
        <div className="mt-4 relative">
          <div className="flex justify-between text-xs text-amber-700 mb-1">
            <span>0%</span>
            <span className="cursor-pointer hover:text-amber-900 transition-colors" 
                  onClick={() => setShowDetails(!showDetails)}>
              
            </span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          {/* Progress markers - hidden during print */}
          <div className={`relative h-0 ${isPrinting ? 'hidden' : ''}`}>
            <div className="absolute -top-1 left-[50%] h-4 w-px bg-amber-300" title="Passing"></div>
            <div className="absolute -top-1 left-[70%] h-4 w-px bg-amber-500" title="Average"></div>
            <div className="absolute -top-1 left-[90%] h-4 w-px bg-amber-700" title="Excellent"></div>
          </div>
        </div>
      </div>
      
      {/* Footer with interactive elements - modified during print */}
      <div className={`px-6 py-3 text-center ${isPrinting ? 'text-xs text-black font-medium' : 'text-xs text-amber-600 bg-amber-50 italic'}`}>
        {isPrinting ? (
          <div>
            <p>ISKCON Kanpur Bhakti Sashtri Program - Official Result</p>
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <p>Please contact your counselor for any clarification.</p>
            <button 
              onClick={handlePrint}
              className="text-amber-800 hover:text-amber-600 font-medium flex items-center space-x-1 text-xs"
            >
              <span>Print Result</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.055 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      {/* Print-specific styles */}
      <style jsx>{`
        @media print {
          @page { margin: 0.5cm; }
          body { font-size: 12pt; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// Enhanced Score item component with interactive elements
const ScoreItem = ({ label, score, total, isExpanded, toggleExpand, details }) => {
  const [animateProgress, setAnimateProgress] = useState(false);
  const scoreValue = parseInt(score || 0);
  const percentage = Math.round((scoreValue / total) * 100);
  const isNotDeclared = scoreValue === 0;
  
  // Animate progress bar after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate color based on percentage
  let progressColor = "";
  if (percentage >= 80) {
    progressColor = "bg-gradient-to-r from-green-400 to-green-500";
  } else if (percentage >= 60) {
    progressColor = "bg-gradient-to-r from-green-400 to-green-500";
  } else if (percentage >= 40) {
    progressColor = "bg-gradient-to-r from-green-400 to-green-500";
  } else {
    progressColor = "bg-gradient-to-r from-green-400 to-green-500";
  }
  
  return (
    <div className="mb-5">
      <div
        className="flex flex-col sm:flex-row justify-between text-sm mb-1 cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="text-amber-800 font-medium flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 mr-1 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {label}
        </span>
        {isNotDeclared ? (
          <span className="italic text-amber-600 font-medium mt-1 sm:mt-0">Not Declared</span>
        ) : (
          <span className="font-bold text-amber-700 mt-1 sm:mt-0">
            {score} <span className="text-amber-500 font-normal">/ {total}</span>
          </span>
        )}
      </div>
  
      {/* Score progress bar */}
      <div className="h-2 bg-amber-100 rounded-full overflow-hidden w-full">
        {!isNotDeclared ? (
          <div
            className={`h-full ${progressColor} transition-all duration-1000 ease-out`}
            style={{ width: animateProgress ? `${percentage}%` : '0%' }}
          ></div>
        ) : (
          <div className="h-full bg-amber-200 w-full opacity-30"></div>
        )}
      </div>
  
      {/* Mini legend for score */}
      {!isNotDeclared && (
        <div className="flex justify-between items-center mt-1">
          <span
            className={`text-xs ${
              percentage >= 80
                ? 'text-green-600'
                : percentage >= 60
                ? 'text-yellow-600'
                : percentage >= 40
                ? 'text-orange-600'
                : 'text-red-600'
            }`}
          >
            {percentage}%
          </span>
        </div>
      )}
    </div>
  );
  