'use client';

import Image from 'next/image';
import { FaUser } from 'react-icons/fa6';
import { BsSnow2 } from 'react-icons/bs';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { Button } from './ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdHeart } from 'react-icons/io';
import { UserData } from '@/model/UserData';
import { Skeleton } from '@/components/ui/skeleton';
import { useCarsController } from '@/lib/controller/useCarsController';

function ListCar({ dataLogin }: { dataLogin: UserData | null }) {
  const { cars, loading, fetchMoreCars, wishList, wlLoading, handleWishList } =
    useCarsController();
  // const [moveLoading, setMoveLoading] = useState(false);
  const router = useRouter();

  const handleDetailCar = (id: string) => {
    // setMoveLoading(true);
    router.push(`/car/${id}`);
  };

  if (!cars.length) {
    return (
      <div className="w-full h-full flex flex-col gap-5 px-5 md:px-10 lg:px-16 bg-custom-main4 py-[5vh]">
        <div className="flex flex-col">
          <h2 className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
            Vehicle Rental Prices
          </h2>
          <p className="text-custom-main2 text-center xs:text-base text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
            nisi.
          </p>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-80 flex flex-col p-1.5 pb-3 shadow-lg rounded-xl bg-custom-light justify-between"
            >
              <Skeleton className="w-full h-1/2 rounded-lg" />
              <Skeleton className="w-3/4 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <Skeleton className="w-full h-6 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // if (moveLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <div className="loading flex justify-center items-center"></div>
  //     </div>
  //   );
  // }

  return (
    <div
      id="listcar"
      className="w-full h-full flex flex-col gap-5 px-5 md:px-10 lg:px-16 bg-custom-main4 py-[5vh] scroll-mt-20"
    >
      <div className="flex flex-col">
        <h2 className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
          Most popular cars rental deals
        </h2>
        <p className="text-custom-main2 text-center xs:text-base text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
          nisi.
        </p>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
        {cars.map((item, index) => (
          <div
            key={index}
            className="h-80 flex flex-col gap-3 p-1.5 pb-3 shadow-lg rounded-xl bg-custom-light border border-custom-main1"
          >
            <span className="flex justify-center items-center h-1/2 rounded-lg overflow-hidden bg-custom-main3 relative">
              <Image
                src={`${item.imageurl}`}
                alt="image"
                width={200}
                height={200}
                className="object-cover w-full rounded-lg "
              />
              <span
                onClick={() => handleWishList(dataLogin?.id || '', item.id)}
                className="p-1 rounded-full border border-custom-main2 absolute right-1 top-1 cursor-pointer"
              >
                <IoMdHeart
                  size={16}
                  className={`${
                    wishList.some(
                      (wish) =>
                        wish?.carId === item.id && wish?.status === 'yes'
                    )
                      ? 'text-custom-main1'
                      : 'text-slate-400'
                  } `}
                />
              </span>
            </span>
            <div className="flex flex-col h-1/2 justify-between">
              <div className="w-full flex flex-col gap-3 px-1 ">
                <div className="flex flex-col">
                  <span className="flex gap-1 items-center text-custom-main2 text-xs">
                    <FaStar size={14} className="text-yellow-500" /> 4.8 (5
                    reviews)
                  </span>
                  <span
                    onClick={() => handleDetailCar(item.id)}
                    className="text-sm font-semibold text-custom-dark truncate cursor-pointer hover:text-custom-main1"
                  >
                    {item.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="flex gap-1 items-center text-xs text-custom-main2">
                    <FaUser size={14} className=" text-custom-main2" />{' '}
                    {item.seat} Seat
                  </span>
                  <span className="flex gap-1 items-center text-xs text-custom-main2">
                    <BsSnow2 size={14} className=" text-custom-main2" />{' '}
                    {item.ac ? 'AC' : 'Non AC'}
                  </span>
                  <span className="flex gap-1 items-center text-xs text-custom-main2">
                    <TbManualGearboxFilled
                      size={14}
                      className=" text-custom-main2"
                    />{' '}
                    {item.transmission}
                  </span>
                  <span className="flex gap-1 items-center text-xs text-custom-main2">
                    <BsFillFuelPumpFill
                      size={14}
                      className=" text-custom-main2"
                    />{' '}
                    {item.typefuel}
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-1">
                <h2 className="text-xs font-semibold text-custom-dark">
                  ${item.price}/day
                </h2>
                <span
                  onClick={() => handleDetailCar(item.id)}
                  className="flex gap-1 items-center text-xs text-custom-dark cursor-pointer hover:text-custom-main1"
                >
                  Rent Now <FaArrowRight size={14} className="" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          disabled={loading}
          onClick={fetchMoreCars}
          size={'lg'}
          className="px-20 bg-custom-main1 text-custom-light hover:bg-custom-main1/70"
        >
          {loading ? 'Loading...' : 'Show More'}
        </Button>
      </div>
    </div>
  );
}

export default ListCar;
