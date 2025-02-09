import {
  SiNissan,
  SiFord,
  SiMercedes,
  SiBmw,
  SiVolkswagen,
  SiAudi,
  SiMazda,
} from 'react-icons/si';

import { FaLocationDot } from 'react-icons/fa6';
import { BsCalendar2Date } from 'react-icons/bs';
import { BiSolidBookReader } from 'react-icons/bi';
import { Button } from './ui/button';
import { MdSecurityUpdate } from 'react-icons/md';
import { MdOutlineSecurityUpdateGood } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

const logos = [
  <SiNissan key="nissan" />,
  <SiFord key="ford" />,
  <SiMercedes key="mercedes" />,
  <SiBmw key="bmw" />,
  <SiVolkswagen key="volkswagen" />,
  <SiAudi key="audi" />,
  <SiMazda key="mazda" />,
];

const Inputcod = () => {
  return (
    <>
      <div className="flex xs:gap-2 gap:0.5 items-center">
        <FaLocationDot className="sm:text-3xl text-xl text-custom-main1" />
        <div className="flex flex-col ">
          <h2 className="sm:text-sm text-xs font-bold text-custom-dark">
            Location
          </h2>
          <p className="text-xs text-custom-main2 truncate sm:block hidden">
            Search your location
          </p>
        </div>
      </div>
      <div className="flex xs:gap-2 gap:0.5 items-center">
        <MdSecurityUpdate className="sm:text-3xl text-xl text-custom-main1" />
        <div className="flex flex-col ">
          <h2 className="sm:text-sm text-xs font-bold text-custom-dark">
            Pick up date
          </h2>
          <p className="text-xs text-custom-main2 truncate sm:block hidden">
            Tue 15 Feb, 09.00
          </p>
        </div>
      </div>
      <div className=" flex xs:gap-2 gap:0.5 items-center">
        <MdOutlineSecurityUpdateGood className="sm:text-3xl text-xl text-custom-main1" />
        <div className="flex flex-col">
          <h2 className="sm:text-sm text-xs font-bold text-custom-dark">
            Return date
          </h2>
          <p className="text-xs text-custom-main2 truncate sm:block hidden">
            Thu 16 Feb, 11.00
          </p>
        </div>
      </div>
      <div className="flex items-center w-fit">
        <Button size={'lg'} className="md:block hidden text-sm">
          Search
        </Button>
        <Button className="md:hidden sm:block hidden text-sm">Search</Button>
        <FiSearch className="text-2xl text-custom-main1 sm:hidden block" />
      </div>
    </>
  );
};

function Step() {
  return (
    <div
      id="step"
      className="w-full lg:h-screen h-full flex flex-col gap-10 justify-evenly items-center bg-custom-main4 px-5 md:px-10 lg:px-16 py-8 md:py-14 lg:py-20 relative"
    >
      <div className="w-full flex justify-between  gap-3">
        {logos.map((logo) => (
          <div key={logo.key} className="md:text-5xl text-3xl">
            {logo}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-custom-main2 font-bold">HOW IT WORK</p>
        <h2 className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
          Rent with following 3 working steps
        </h2>
      </div>
      <div className="flex xs:flex-row flex-col items-center justify-evenly w-full max-w-5xl gap-3">
        <div className="w-64 flex flex-col items-center gap-3 ">
          <div className="sm:w-24 sm:h-24 w-20 h-20 flex justify-center items-center rounded-lg shadow-xl">
            <FaLocationDot color="#0782ff" size={40} />
          </div>
          <h2 className="sm:text-xl text-sm text-center font-bold text-custom-dark">
            Choose location
          </h2>
          <p className=" text-custom-main2 text-center sm:text-sm text-xs">
            Choose your location and find your best car
          </p>
        </div>
        <div className="w-64 flex flex-col items-center gap-3">
          <div className="sm:w-24 sm:h-24 w-20 h-20 flex justify-center items-center rounded-lg shadow-xl bg-custom-main1">
            <BsCalendar2Date color="white" size={40} />
          </div>
          <h2 className="sm:text-xl text-sm text-center font-bold text-custom-dark">
            Pick up date
          </h2>
          <p className=" text-custom-main2 text-center sm:text-sm text-xs">
            Select your pick up date and time to book your car
          </p>
        </div>
        <div className="w-64 flex flex-col items-center gap-3">
          <div className="sm:w-24 sm:h-24 w-20 h-20 flex justify-center items-center rounded-lg shadow-xl">
            <BiSolidBookReader color="#0782ff" size={40} />
          </div>
          <h2 className="sm:text-xl text-sm text-center font-bold text-custom-dark">
            Book your car
          </h2>
          <p className=" text-custom-main2 text-center sm:text-sm text-xs">
            Book your car and we will deliver it to you
          </p>
        </div>
      </div>
    </div>
  );
}

export default Step;
