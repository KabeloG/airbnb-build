import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { FaSwimmingPool } from "react-icons/fa";
import { LuBedSingle } from "react-icons/lu";
import { BiSolidFlagAlt, BiSolidGrid } from "react-icons/bi";
import { PiMedalMilitary } from "react-icons/pi";
import { TbTrophy } from "react-icons/tb";
import { ChevronDownIcon } from "@heroicons/react/outline";
import ListingCard from "../../components/ListingCard";
import AmenityListItem from "../../components/AmenityListItem";
import Head from "next/head";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";
import FsLightbox from "fslightbox-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoDiamond } from "react-icons/io5";

function StayDetails({ cities }) {
  const router = useRouter();
  const query = router.query;

  const slashCheckIn = format(new Date(query.checkin), "dd/MM/yyyy");
  const slashCheckOut = format(new Date(query.checkout), "dd/MM/yyyy");

  const parsedImages = JSON.parse(query.images);
  const parsedPrice = JSON.parse(query.price);
  const parsedAmenities = JSON.parse(query.amenities);

  const [openLightbox, setOpenLightbox] = useState(false);
  const [generatedName, setGeneratedName] = useState("");

  const addValues = (accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  };

  useEffect(() => {
    const config = {
      dictionaries: [names],
      style: "capital",
      separator: " ",
    };

    setGeneratedName(uniqueNamesGenerator(config));
  }, []);

  return (
    <div>
      <Head>
        <title>{`${query.name} in ${query.address} | Airbnb`}</title>
        <link rel="icon" href="/airbnb.ico" />
      </Head>

      <Header cities={cities} />

      <main className="flex flex-col max-w-[1400px] mx-auto overflow-x-hidden">
        <div className="relative mx-auto">
          <div className="lg:hidden h-[400px] w-[450px] sm:h-[500px] sm:w-[700px]">
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
            >
              {parsedImages.map((image) => (
                <div
                  key={image}
                  className="relative flex-shrink-0
                  h-[400px] w-[450px] sm:h-[500px] sm:w-[700px]"
                >
                  <Image src={image} alt="image" fill objectFit="cover" />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="hidden lg:inline-block px-7 py-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Image
                  src={parsedImages[0]}
                  alt="image"
                  fill
                  className="object-cover rounded-s-xl hover:opacity-90
                  transition duration-200 ease-in-out cursor-pointer
                  max-w-[668px] max-h-[448.333px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Image
                    src={parsedImages[1]}
                    alt="image"
                    height={333}
                    width={500}
                    className="hover:opacity-90 transition
                    duration-200 ease-in-out cursor-pointer
                    max-w-[330px] max-h-[220.167px]"
                  />
                </div>

                <div className="relative">
                  <Image
                    src={parsedImages[2]}
                    alt="image"
                    height={333}
                    width={500}
                    className="rounded-e-xl hover:opacity-90 transition
                    duration-200 ease-in-out cursor-pointer max-w-[330px] 
                    max-h-[220.167px]"
                  />
                </div>

                <div className="relative">
                  <Image
                    src={parsedImages[3]}
                    alt="image"
                    height={333}
                    width={500}
                    className="hover:opacity-90 transition
                    duration-200 ease-in-out cursor-pointer
                    max-w-[330px] max-h-[220.167px]"
                  />
                </div>

                <div className="relative">
                  <Image
                    src={parsedImages[4]}
                    alt="image"
                    height={333}
                    width={500}
                    className="rounded-e-xl hover:opacity-90 transition
                    duration-200 ease-in-out cursor-pointer
                    max-w-[330px] max-h-[220.167px]"
                  />

                  <div
                    className="absolute bottom-3 right-6 flex 
                    items-center bg-white text-black p-2 border 
                    border-black rounded-lg cursor-pointer"
                  >
                    <BiSolidGrid className="h-5 w-5 lg:mr-1" />
                    <h2
                      className="text-center"
                      onClick={() => setOpenLightbox(!openLightbox)}
                    >
                      Show all photos
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex relative overflow-x-hidden md:mx-5">
          {/* Left Start */}
          <div className="max-w-4xl">
            <div className="p-5 divide-y divide-y-reverse">
              <h1 className="text-[25px] leading-7 font-semibold">
                {query.name}
              </h1>

              <div className="flex pb-4">
                <div>
                  <h2 className="mt-2 underline font-medium">
                    {query.address}
                  </h2>
                </div>

                {query.isSuperhost === "true" && (
                  <div className="flex items-center mx-5 py-2">
                    <PiMedalMilitary className="h-5 w-5 mr-1" />{" "}
                    <h2>Superhost</h2>
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 divide-y divide-y-reverse">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] leading-7 font-semibold">
                  {query.type} hosted by {generatedName}
                </h1>

                <div className="relative">
                  <img
                    src={query.hostThumbnail}
                    alt="image"
                    width={50}
                    height={50}
                    className="rounded-full lg:h-[60px] w-[60px]"
                  />
                </div>
              </div>

              <p className="pb-5">{`${query.guests} guests · ${query.bedrooms} bedrooms · ${query.beds} beds · ${query.bathrooms} baths`}</p>

              {query.rare === "true" && (
                <div className="flex items-center justify-between py-5">
                  <p>
                    <span className="font-semibold mr-1">
                      This is a rare find.
                    </span>
                    This place is usually booked
                  </p>

                  <IoDiamond className="h-7 w-7 text-teal-400" />
                </div>
              )}
            </div>

            <div className="p-5 divide-y divide-y-reverse space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex space-x-5">
                  <FaSwimmingPool className="h-7 w-7" />
                  <div className="space-y-1">
                    <h2 className="font-semibold">Dive right in</h2>
                    <p className="text-[#717171]">
                      This is one of the few places in the area with a pool.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-5">
                  <TbTrophy className="h-7 w-7" />
                  <div className="space-y-1">
                    <h2 className="font-semibold">Highly rated host</h2>
                    <p className="text-[#717171] pb-5">
                      {generatedName}&apos;s place has received a {query.rating}{" "}
                      from {query.reviewsCount} of recent guests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 divide-y divide-y-reverse space-y-1">
              <h2 className="font-semibold">The space</h2>
              <p className="pb-5">
                Fully self catering, free standing Villa sleeping a maximum of{" "}
                {query.persons} people <br />
                Main bedroom has a king size bed with en-suite bathroom <br />
                Second bedroom has twin beds with a en-suite
              </p>
            </div>

            <div className="p-5 divide-y divide-y-reverse space-y-6">
              <h2 className="font-semibold">Where you&apos;ll sleep</h2>

              <div className="flex space-x-3 pb-5">
                <ListingCard
                  Icon={LuBedSingle}
                  typeBedroom="Bedroom 1"
                  typeBed="1 king bed"
                />

                {query.bedrooms > 1 && (
                  <ListingCard
                    Icon={LuBedSingle}
                    typeBedroom="Bedroom 2"
                    typeBed="2 single beds"
                  />
                )}
              </div>
            </div>

            {!parsedAmenities.length == 0 && (
              <div className="p-5 space-y-6">
                <h2 className="font-semibold">What this place offers</h2>

                <div className="grid grid-cols-2 space-y-2">
                  {parsedAmenities.map((item, i) => (
                    <AmenityListItem key={i} amenity={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Left End */}

          {/* Right Start */}
          <div
            className="absolute top-8 right-1 border rounded-md min-w-[372.333px] 
            p-5 hidden xl:inline-block shadow-lg"
          >
            <p>
              <span className="text-[22px] font-semibold">
                R{parsedPrice.rate} ZAR
              </span>{" "}
              / night
            </p>

            <div className="border border-gray-400 mt-5 rounded-lg">
              <div className="grid grid-cols-2 items-center border-b">
                <div className="py-3 px-4 border-r">
                  <h3 className="font-semibold">CHECK-IN</h3>
                  <p>{slashCheckIn}</p>
                </div>

                <div className="py-3 px-4">
                  <h3 className="font-semibold">CHECKOUT</h3>
                  <p>{slashCheckOut}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="py-3 px-4">
                  <h3 className="font-semibold">GUESTS</h3>
                  {query.guests > 1 ? (
                    <p>{`${query.guests} guests`}</p>
                  ) : (
                    <p>{`${query.guests} guest`}</p>
                  )}
                </div>

                <ChevronDownIcon className="h-5 w-5 mr-5" />
              </div>
            </div>

            <button
              className="bg-[#FF385C] text-white py-4 w-full rounded-lg 
              mt-5 font-semibold tracking-wide"
            >
              Reserve
            </button>

            <div>
              <p className="text-center text-[#222] mt-4">
                You won&apos;t be charged yet
              </p>
            </div>

            {parsedPrice.priceItems.map(({ title, amount }) => (
              <div
                className="flex justify-between border-b
            mt-5 pb-4"
                key={title}
              >
                <p className="underline">{title}</p>
                <p>R{amount} ZAR</p>
              </div>
            ))}

            <div
              className="flex justify-between my-4
            font-semibold"
            >
              <h2>Total (incl. taxes & fees)</h2>
              <h2>R{parsedPrice.priceItems.reduce(addValues, 0)} ZAR</h2>
            </div>

            <div className="flex items-center mt-5 px-20">
              <BiSolidFlagAlt className="h-5 w-5 mr-4" />
              <p className="text-center underline cursor-pointer">
                Report this listing
              </p>
            </div>
          </div>
          {/* Right Start */}
        </div>

        <FsLightbox toggler={openLightbox} sources={parsedImages} />
      </main>
    </div>
  );
}

export default StayDetails;

export async function getServerSideProps() {
  const cities = await fetch("https://api.npoint.io/eb5569e875931c04fc89").then(
    (res) => res.json()
  );

  return {
    props: {
      cities,
    },
  };
}
