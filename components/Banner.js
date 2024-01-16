import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className="relative h-[320px] sm:h-[400px] lg:h-[500px] xl:[600px]">
      <Image
        src="https://media.cntraveler.com/photos/5db1d0dd11c1e500092e7133/master/pass/airbnb-ski-aspen-28328347.jpg"
        alt="banner"
        layout="fill"
        objectFit="cover"
      />
      <div
        className="absolute top-0 h-[308px] w-[330px] bg-black z-10 text-white
      sm:h-[400px] lg:h-[500px] xl:[600px] max-sm:top-3"
      >
        <div className="absolute bottom-10 px-5 space-y-4 sm:bottom-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Discover a new you while exploring new places
          </h2>

          <p>
            Plan a different kind of getaway to uncover the hidden gems near
            you.
          </p>

          <button
            className="bg-[#FF385C] py-3 px-3 rounded-md font-medium
          active:scale-90 transition"
          >
            Explore Nearby
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
