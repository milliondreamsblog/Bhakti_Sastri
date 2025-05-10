import React from 'react';

export const Result = ({ result, onSelect }) => {
  return (
    <div onClick={() => onSelect(result)}>
      {result["Name of Devotee"]}
    </div>
  );
};

