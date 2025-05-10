import React from 'react';

export const Marksheet = ({ student }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 mt-8 w-[500px] border border-blue-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 underline decoration-wavy">
        Marksheet
      </h2>

      <div className="space-y-4 text-gray-700 text-lg">
        <InfoRow label="Name of Devotee" value={student["Name of Devotee"]} />
        <InfoRow label="Counselor/Care Taker" value={student["Counselor/ Care Taker"]} />
        <InfoRow
          label="C.B.E Unit 1 (CH 1,2,3) out of 50"
          value={student["C.B.E Unit 1 (CH 1,2,3) out of 50"]}
        />
        <InfoRow
          label="O.B.E Unit 1 out of 10"
          value={student["O.B.E Unit 1 out of 10"]}
        />
        <InfoRow
          label="C.B.E Unit 2 (CH 4,5,6) out of 50"
          value={student["C.B.E Unit 2 CH(4,5,6) out of 50"]}
        />
        <InfoRow
          label="O.B.E Unit 2 out of 10"
          value={student["O.B.E Unit 2 out of 10"]}
        />
        <InfoRow
          label="Sloka Test 1 (Unit 1 & 2)"
          value={student["Sloka Test 1 (Unit 1 &2)"]}
        />
      </div>
    </div>
  );
};

// ✅ Reusable Row Component for better structure
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="font-semibold text-indigo-600">{label}:</span>
    <span>{value ?? <span className="italic text-gray-400">Not available</span>}</span>
  </div>
);
