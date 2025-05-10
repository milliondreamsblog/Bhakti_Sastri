import React from 'react';
import { Result } from './Result';

export const Searchresult = ({ resultList, onSelect }) => {
  return (
    <div
      className='bg-white w-[500px] flex flex-col py-0.5 pr-4 shadow rounded-2xl mt-2 max-h-52 overflow-y-auto'
      aria-label="Search Results"
    >
      {resultList.length === 0 ? (
        <div className="px-3 py-2 text-gray-400 text-sm">No results found</div>
      ) : (
        resultList.map((result, id) => (
          <div key={result["Sr No."] || id} className='px-3 py-1.5 hover:bg-amber-50 cursor-pointer'>
            <Result result={result} onSelect={onSelect} />
          </div>
        ))
      )}
    </div>
  );
};
