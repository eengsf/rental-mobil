'use client';

import Image from 'next/image';

import { FaLocationDot } from 'react-icons/fa6';
import { MdSecurityUpdate } from 'react-icons/md';
import { MdOutlineSecurityUpdateGood } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

function Coba() {
  const [location, setLocation] = useState('');
  const [pickUpDate, setPickUpDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleLocation = (type: string) => {
    setLocation(type);
  };
  const handleSearch = () => {
    if (location === '' || pickUpDate === '' || returnDate === '') {
      setTimeout(() => {
        setShowPopup(false);
      }, 700);
      setShowPopup(true);
      return;
    }
  };

  return (
    <div
      id="home"
      className="flex flex-col md:gap-24 gap-10 lg:px-16 md:px-10 px-5 py-8 md:py-20 lg:h-screen h-full items-center bg-custom-main3 overflow-x-hidden"
    >
      <div className="flex flex-col md:flex-row items-center md:justify-between justify-evenly">
        <div className="text-center md:text-left md:w-1/2 space-y-6 ">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
            Car Rental – Search, Compare & Save
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            quasi consectetur dolorem eum repellat recusandae
          </p>
          <div>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/main.png"
            alt="Main Website Image"
            width={500}
            height={500}
            priority
            className="w-full max-w-2xl md:max-w-lg lg:max-w-xl xl:max-w-3xl "
          />
        </div>
      </div>

      <div className="w-full xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-2xl max-w-xl flex justify-between gap-2 bg-custom-light sm:py-3 sm:px-5 py-1.5 px-2.5 rounded-xl shadow-xl ">
        <div className="flex xs:gap-2 gap:0.5 items-center md:w-40 w-fit">
          <FaLocationDot className="sm:text-3xl text-xl text-custom-main1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none">
              <button className="flex flex-col ">
                <span className="sm:text-sm text-xs font-bold text-custom-dark">
                  Location
                </span>
                <span className="text-xs text-custom-main2 truncate">
                  {location ? (
                    location
                  ) : (
                    <div className="flex gap-1">
                      <span className="sm:block hidden">Search</span> your
                      location
                    </div>
                  )}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuLabel>Location</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={location ? location : 'Bangkalan'}
                onValueChange={handleLocation}
              >
                <DropdownMenuRadioItem value="Bangkalan">
                  Bangkalan
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Gresik">
                  Gresik
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Malang">
                  Malang
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Sidoarjo">
                  Sidoarjo
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Surabaya">
                  Surabaya
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex xs:gap-2 gap:0.5 items-center">
          <MdSecurityUpdate className="sm:text-3xl text-xl text-custom-main1" />
          <div className="flex flex-col ">
            <h2 className="flex gap-1 sm:text-sm text-xs font-bold text-custom-dark ">
              Pick up <span className="sm:block hidden">date</span>
            </h2>
            <input
              id="pickup-date"
              type="date"
              value={pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
              className="text-xs p-0 focus:outline-none border-none xs:block hidden"
            />
            <span className="xs:hidden block text-xs">hh/bb/tttt</span>
          </div>
        </div>
        <div className=" flex xs:gap-2 gap:0.5 items-center">
          <MdOutlineSecurityUpdateGood className="sm:text-3xl text-xl text-custom-main1" />
          <div className="flex flex-col">
            <h2 className="flex gap-1 sm:text-sm text-xs font-bold text-custom-dark">
              Return <span className="sm:block hidden">date</span>
            </h2>
            <input
              id="return-date"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-xs p-0 focus:outline-none border-none xs:block hidden"
            />
            <span className="xs:hidden block text-xs">hh/bb/tttt</span>
          </div>
        </div>
        <div className="flex items-center w-fit relative">
          <span
            className={`text-xs text-white py-1 px-3 rounded-full bg-red-500 whitespace-nowrap absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 ${
              showPopup === true ? 'opacity-100' : ''
            }`}
          >
            Pick date and your location!
          </span>
          <a
            onClick={handleSearch}
            href={location === '' ? '' : '#listcar'}
            className=" focus:outline-none bg-custom-main1 text-white px-6 py-2 rounded-lg hover:bg-custom-main1/60 sm:block hidden"
          >
            Search
          </a>
          <a
            onClick={handleSearch}
            href={location === '' ? '' : '#listcar'}
            className="sm:hidden block"
          >
            <FiSearch className="text-2xl text-custom-main1 " />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Coba;
