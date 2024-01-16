import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import FilterButton from "../components/FilterButton";
import { useRouter } from "next/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import MapView from "../components/MapView";

function Search({ cities, searchResults }) {
  const router = useRouter();

  // ES6 destructuring
  const { location, checkin, checkout, adults } = router.query;
  const formattedCheckIn = format(new Date(checkin), "dd MMMM yyyy");
  const formattedCheckOut = format(new Date(checkout), "dd MMMM yyyy");
  const range = `${formattedCheckIn} - ${formattedCheckOut}`;

  return (
    <div>
      <Head>
        <title>Search | Stays In {location}</title>
        <link rel="icon" href="/airbnb.ico" />
      </Head>

      <Header
        cities={cities}
        placeholderText={`${location} | ${range} | ${adults} guests`}
      />

      <main className="flex pb-5 max-sm:overflow-x-hidden">
        <section className="flex-grow pt-14 px-6">
          <p className="text-sm">
            {`300+ Stays - ${range} for ${adults} guest(s)`}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays In {location}
          </h1>

          <div
            className="hidden space-x-3 lg:inline-flex mb-5 text-gray-800
          whitespace-nowrap"
          >
            <FilterButton title="Cancellation Flexibility" />
            <FilterButton title="Type of Place" />
            <FilterButton title="Price" />
            <FilterButton title="Rooms and Beds" />
            <FilterButton title="More filters" />
          </div>

          {searchResults?.results.length < 1 ? (
            <h1 className="text-3xl font-semibold">No stays were found</h1>
          ) : (
            <div className="flex flex-col">
              {searchResults?.results.map(
                ({
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
                }) => (
                  <InfoCard
                    key={id}
                    address={address}
                    bathrooms={bathrooms}
                    bedrooms={bedrooms}
                    beds={beds}
                    images={images}
                    isSuperhost={isSuperhost}
                    rareFind={rareFind}
                    hostThumbnail={hostThumbnail}
                    name={name}
                    reviewsCount={reviewsCount}
                    persons={persons}
                    previewAmenities={previewAmenities}
                    price={price}
                    rating={rating}
                    type={type}
                    linkId={id}
                    guests={adults}
                    checkin={checkin}
                    checkout={checkout}
                  />
                )
              )}
            </div>
          )}
        </section>

        <section
          className="hidden xl:inline-flex xl:min-w-[600px]
        overflow-y-hidden"
        >
          <MapView searchResults={searchResults} />
        </section>
      </main>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const location = context.query.location;
  const checkin = context.query.checkin;
  const checkout = context.query.checkout;
  const adults = context.query.adults;
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${location}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&page=1&currency=ZAR`;

  const searchResults = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  const cities = await fetch("https://api.npoint.io/eb5569e875931c04fc89").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
      cities,
    },
  };
}
