import React from "react";

function FilterButton({ title }) {
  return (
    <div
      className="px-4 py-2 border rounded-full max-w-[230px] 
    cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100
    transition-transform duration-100 ease-out"
    >
      <p className="text-center">{title}</p>
    </div>
  );
}

export default FilterButton;
