import React from "react";
import {
  BiSolidBusiness,
  BiWifi,
  BiSolidWasher,
  BiSolidCarGarage,
} from "react-icons/bi";
import { BsFillCupHotFill } from "react-icons/bs";
import { FaKitchenSet } from "react-icons/fa6";
import { HiKey } from "react-icons/hi2";

function AmenityListItem({ amenity }) {
  return (
    <>
      {(() => {
        switch (amenity) {
          case "Hosted by a business":
            return (
              <div className="flex items-center space-x-4">
                <BiSolidBusiness className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          case "Heating":
            return (
              <div className="flex items-center space-x-4">
                <BsFillCupHotFill className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          case "Wifi":
            return (
              <div className="flex items-center space-x-4">
                <BiWifi className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          case "Free parking":
            return (
              <div className="flex items-center space-x-4">
                <BiSolidCarGarage className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          case "Kitchen":
            return (
              <div className="flex items-center space-x-4">
                <FaKitchenSet className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          case "Self check-in":
            return (
              <div className="flex items-center space-x-4">
                <HiKey className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          case "Washer":
            return (
              <div className="flex items-center space-x-4">
                <BiSolidWasher className="h-9 w-9" />
                <p>{amenity}</p>
              </div>
            );
          default:
            return null;
        }
      })()}
    </>
  );
}

export default AmenityListItem;
