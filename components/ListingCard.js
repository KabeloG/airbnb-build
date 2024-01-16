import React from "react";

function ListingCard({ Icon, typeBedroom, typeBed }) {
  return (
    <div className="p-5 border rounded-md min-w-[200px]">
      <Icon className="h-8 w-8" />

      <div className="mt-2">
        <h2 className="font-semibold">{typeBedroom}</h2>
        <p className="text-[#717171]">{typeBed}</p>
      </div>
    </div>
  );
}

export default ListingCard;
