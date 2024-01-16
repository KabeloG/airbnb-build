import Image from "next/image";
import React, { useContext, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import { HiHeart } from "react-icons/hi";
import { IoBedSharp, IoDiamond } from "react-icons/io5";
import { FaShower } from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { SearchContext } from "../context/SearchContext";
import toast from "react-hot-toast";

function InfoCard({
  id,
  address,
  bathrooms,
  bedrooms,
  beds,
  images,
  isSuperhost,
  rareFind,
  hostThumbnail,
  lat,
  lng,
  name,
  reviewsCount,
  persons,
  previewAmenities,
  price,
  rating,
  type,
  linkId,
  guests,
  checkin,
  checkout,
}) {
  const [heartClicked, setHeartClicked] = useState(false);
  const context = useContext(SearchContext);

  return (
    <div
      className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:shadow-lg 
      transition duration-300 ease-out first:border-t"
    >
      <div className="h-24 w-40 md:h-52 md:w-80">
        <Carousel showThumbs={false} showIndicators={false} showStatus={false}>
          {images?.map((image) => (
            <div
              className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0"
              key={image}
            >
              <Image
                src={image}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
              {isSuperhost && (
                <div
                  className="absolute top-3 right-1 bg-white text-sm rounded-md 
                py-1 px-2 mx-2 border border-gray-400 z-30"
                >
                  <p className="font-medium">Superhost</p>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="hidden justify-end z-10 sm:inline-flex">
          {heartClicked ? (
            <HiHeart
              className={"h-7 w-7 cursor-pointer text-red-500"}
              onClick={() => {
                setHeartClicked(!heartClicked);
              }}
            />
          ) : (
            <HeartIcon
              className={"h-7 cursor-pointer"}
              onClick={() => {
                setHeartClicked(!heartClicked);
                toast.success(`You have liked ${name}`, {
                  duration: 4000,
                  position: "bottom-center",
                });
              }}
            />
          )}
        </div>

        <div className="-mt-5 space-y-2">
          <Link
            href={{
              pathname: `/stay/${linkId}`,
              query: {
                name: name,
                address: address,
                bathrooms: bathrooms,
                bedrooms: bedrooms,
                beds: beds,
                isSuperhost: isSuperhost.toString(),
                rare: rareFind.toString(),
                type: type,
                reviewsCount: reviewsCount,
                hostThumbnail: hostThumbnail,
                images: JSON.stringify(images),
                reviewsCount: reviewsCount,
                persons: persons,
                rating: rating,
                price: JSON.stringify(price),
                amenities: JSON.stringify(previewAmenities),
                checkin: checkin,
                checkout: checkout,
                guests: guests,
              },
            }}
            target="_blank"
          >
            <div className="mt-4 sm:mt-0">
              <h4 className="text-base">{`${type} in ${address}`}</h4>
              <h4
                className="text-lg md:text-xl mt-2 max-sm:max-w-[200px] 
              max-sm:break-words font-medium"
              >
                {name}
              </h4>
            </div>
          </Link>

          <div className="border-b w-10 pt-1" />
          <div className="pt-2 text-[15px] text-gray-500 flex-grow lg:flex">
            <p className="mb-2 max-sm:max-w-[180px]">{`${bathrooms} bathroom ‧ 
            ${bedrooms} bedroom ‧ ${beds} beds`}</p>

            {previewAmenities.map((item, index) => (
              <p key={index} className="lg:ml-1">{`‧ ${item}`}</p>
            ))}
          </div>

          {rareFind && (
            <p
              className="flex items-center border rounded-md w-fit p-1 text-[15px] 
            tracking-wide"
            >
              <IoDiamond className="h-5 w-5 mr-1" /> Rare Find
            </p>
          )}
        </div>

        <div
          className="flex flex-col pt-5 sm:flex-row sm:justify-between 
        sm:items-end"
        >
          <div className="flex items-center space-x-4">
            <p className="flex items-center gap-1">
              <StarIcon className="h-6 text-red-400" />
              {rating ? `${rating}` : "0"}
            </p>

            <p className="flex items-center gap-2">
              <IoBedSharp className="h-7 w-5" />
              {bedrooms}
            </p>

            <p className="flex items-center gap-2">
              <FaShower className="h-5 w-[18px]" />
              {bathrooms}
            </p>
          </div>

          <div className="mt-3">
            <p className="text-sm font-semibold pb-2 lg:text-2xl">
              <span>R{price.rate}</span> / night
            </p>
            <p className="sm:text-right text-gray-600">
              {`R${price.total.toLocaleString("en-ZA")} total`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
