import React from 'react';

export function Marksheet({ student }) {
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

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section with accent color */}
      <div className="bg-indigo-600 py-4 px-6">
        <h2 className="text-xl font-medium text-white">Marksheet</h2>
      </div>
      
      {/* Student Info Section */}
      <div className="px-6 py-4 bg-indigo-50">
        <h3 className="font-semibold text-lg text-gray-800">
          {student["Name of Devotee"] || "Student Name"}
        </h3>
        <p className="text-sm text-gray-600">
          Counselor: {student["Counselor/ Care Taker"] || "Not assigned"}
        </p>
      </div>
      
      {/* Scores Section */}
      <div className="px-6 py-4">
        <ScoreItem 
          label="C.B.E Unit 1 (CH 1-3)" 
          score={student["C.B.E Unit 1 (CH 1,2,3) out of 50"]} 
          total={50}
        />
        <ScoreItem 
          label="O.B.E Unit 1" 
          score={student["O.B.E Unit 1 out of 10"]} 
          total={10}
        />
        <ScoreItem 
          label="C.B.E Unit 2 (CH 4-6)" 
          score={student["C.B.E Unit 2 CH(4,5,6) out of 50"]} 
          total={50}
        />
        <ScoreItem 
          label="O.B.E Unit 2" 
          score={student["O.B.E Unit 2 out of 10"]} 
          total={10}
        />
        <ScoreItem 
          label="Sloka Test 1" 
          score={student["Sloka Test 1 (Unit 1 &2)"]} 
          total={30}
        />
      </div>
      
      {/* Total Score Section */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Total Score</span>
          <div className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-800 font-medium">
            {calculateTotal()} / 150
          </div>
        </div>
      </div>
    </div>
  );
}

// Score item component with progress indicator
const ScoreItem = ({ label, score, total }) => {
  const scoreValue = parseInt(score || 0);
  const percentage = Math.round((scoreValue / total) * 100);
  const isNotDeclared = scoreValue === 0;
  
  // Calculate color based on percentage
  let progressColor = "bg-green-500";
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        {isNotDeclared ? (
          <span className="italic text-amber-600 font-medium">Not Declared</span>
        ) : (
          <span className="font-medium text-gray-800">
            {score} <span className="text-gray-500 font-normal">/ {total}</span>
          </span>
        )}
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        {!isNotDeclared && (
          <div 
            className={`h-full ${progressColor}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        )}
        {isNotDeclared && (
          <div className="h-full bg-amber-300 w-full opacity-30"></div>
        )}
      </div>
    </div>
  );
};