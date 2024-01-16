import Image from "next/image";
import React from "react";

function LargeCard({ img, title, description, buttonText }) {
  return (
    <section
      className="relative py-16 h-96 min-w-[300px]
    my-10"
    >
      <Image
        className="rounded-2xl"
        src={img}
        alt="image"
        layout="fill"
        objectFit="cover"
      />

      <div
        className="absolute top-20 left-10 md:pt-8 text-white
      bg-black p-7 md:bg-transparent rounded-lg"
      >
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p className="text-lg">{description}</p>

        <button
          className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5
        font-medium"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;
