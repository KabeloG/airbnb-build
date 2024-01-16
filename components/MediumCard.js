import React from "react";
import Image from "next/image";

function MediumCard({ img, title, subtitle }) {
  return (
    <div
      className="cursor-pointer hover:scale-105 transform transition 
      duration-300 ease-out bg-white rounded-xl shadow-md"
    >
      <div className="relative h-80 w-80">
        <Image className="rounded-t-xl" src={img} layout="fill" alt="image" />
      </div>

      <div className="px-3 pb-3">
        <h3 className="text-xl font-sans font-semibold mt-3">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export default MediumCard;
