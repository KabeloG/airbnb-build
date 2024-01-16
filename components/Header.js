import React, { Fragment, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { Combobox, Transition } from "@headlessui/react";
import { format } from "date-fns";
import { SearchContext } from "../context/SearchContext";

function Header({ cities, placeholderText }) {
  const today = new Date();
  const date = today.setDate(today.getDate() + 1); // returns timestamp
  const tomorrowDate = new Date(date); // convert date to tomorrow object

  const [selectedCity, setSelectedCity] = useState("");
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrowDate);
  const [mobileSearch, setMobileSearch] = useState(false);
  const context = useContext(SearchContext);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const router = useRouter();

  const formatCheckin = format(new Date(startDate), "yyyy-MM-dd");
  const formatCheckout = format(new Date(endDate), "yyyy-MM-dd");

  const handleSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        location: selectedCity,
        checkin: formatCheckin,
        checkout: formatCheckout,
        adults: context.noOfGuests,
      },
    });
    setSelectedCity("");
  };

  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) =>
          city
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      {/* Left */}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto max-w-[130px]"
        onClick={() => router.push("/")}
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle */}
      <div
        className="flex items-center justify-between md:border-2 rounded-full py-2 md:shadow-sm
      max-lg:invisible"
      >
        <div className="flex-1 mx-5">
          <Combobox value={selectedCity} onChange={setSelectedCity}>
            <div className="relative mt-1">
              <div
                className="relative w-full cursor-default mb-1 overflow-hidden rounded-lg 
                bg-white text-left shadow-none focus:outline-none focus-visible:ring-2 
              focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
              focus-visible:ring-offset-red-400 sm:text-sm"
              >
                <Combobox.Input
                  placeholder={placeholderText || "Start your search"}
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0
                  placeholder:text-base"
                  displayValue={(city) => city}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black 
                ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {filteredCities.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found
                    </div>
                  ) : (
                    filteredCities.map((city, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-red-400 text-white" : "text-gray-900"
                          }`
                        }
                        value={city}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {city}
                            </span>
                            {selected ? (
                              <span
                                className={
                                  "absolute inset-y-0 left-0 flex items-center pl-3"
                                }
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <SearchIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white 
        rounded-full p-2 cursor-pointer md:mx-2"
          {...(selectedCity && startDate && endDate && context.noOfGuests
            ? {
                onClick: () => {
                  handleSearch();
                },
              }
            : {})}
        />
      </div>

      {/* Right */}
      <div className="flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer text-black">
          Become a host
        </p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Subheader */}
      <div
        className="absolute top-24 left-0 right-0 bg-red-400 h-9 w-screen py-1
      lg:hidden"
      >
        <h2
          className="text-center text-white cursor-pointer"
          onClick={() => setMobileSearch(!mobileSearch)}
        >
          Start Your Search
        </h2>

        {mobileSearch && (
          <div className="flex flex-col col-span-3 mx-auto bg-white px-2 mt-2 z-50">
            <div className="flex-1 mx-5">
              <Combobox value={selectedCity} onChange={setSelectedCity}>
                <div className="relative mt-1">
                  <div
                    className="relative w-full cursor-default mb-1 overflow-hidden rounded-lg 
                bg-white text-left shadow-none focus:outline-none focus-visible:ring-2 
              focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
              focus-visible:ring-offset-red-400 sm:text-sm"
                  >
                    <Combobox.Input
                      placeholder={placeholderText || "Where are you going?"}
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0
                  placeholder:text-base"
                      displayValue={(city) => city}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options
                      className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black 
                ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {filteredCities.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found
                        </div>
                      ) : (
                        filteredCities.map((city, index) => (
                          <Combobox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-red-400 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={city}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {city}
                                </span>
                                {selected ? (
                                  <span
                                    className={
                                      "absolute inset-y-0 left-0 flex items-center pl-3"
                                    }
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            {/* Mobile Search Functionality */}
            {selectedCity && (
              <>
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#FD5B61"]}
                  onChange={handleSelect}
                />
                <div className="flex items-center border-b mb-4">
                  <h2 className="text-2xl flex-1 font-semibold">
                    Number of Guests
                  </h2>
                  <UsersIcon className="h-5" />
                  <input
                    value={context.noOfGuests}
                    onChange={(e) => context.setNoOfGuests(e.target.value)}
                    min={1}
                    type="number"
                    className="w-12 pl-2 text-lg outline-none text-red-400"
                  />
                </div>
                <div className="flex pb-4 shadow-md">
                  <button
                    className="flex-grow text-gray-500"
                    onClick={() => {
                      setSelectedCity("");
                      setMobileSearch(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-grow text-red-400"
                    {...(selectedCity &&
                    startDate &&
                    endDate &&
                    context.noOfGuests
                      ? {
                          onClick: () => {
                            handleSearch();
                          },
                        }
                      : {})}
                  >
                    Search
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {selectedCity && !mobileSearch && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-1 font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5" />
            <input
              value={context.noOfGuests}
              onChange={(e) => context.setNoOfGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500"
              onClick={() => setSelectedCity("")}
            >
              Cancel
            </button>
            <button className="flex-grow text-red-400" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
