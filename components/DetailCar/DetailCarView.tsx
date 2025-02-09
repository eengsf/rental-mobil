import { ProductCar } from '@/model/ProductCar';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { BsSnow2 } from 'react-icons/bs';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import CheckOut from './CheckOut';

function DetailCarView({ cars }: { cars: ProductCar }) {
  return (
    <div className="flex lg:flex-row flex-col lg:px-10 sm:px-5 lg:pt-10 sm:pt-5 pb-10 p-0 w-full h-full">
      <div className="flex lg:flex-row flex-col  lg:gap-5 gap-3 lg:p-10 p-5 w-full h-full shadow-md rounded-lg bg-custom-light">
        <div className="flex md:flex-row flex-col md:gap-5 gap-10 lg:w-[60%] w-full lg:order-1 order-2">
          <div className="flex flex-col flex-1 md:gap-5 gap-3 md:order-1 order-2">
            <div className="flex flex-col gap-1.5">
              <span className="flex gap-2 text-custom-main2">
                {cars.yearProduction}
              </span>
              <h2 className="text-3xl font-semibold text-custom-dark">
                {cars.name}
              </h2>
              <span className="flex gap-1 items-center">
                <FaHeart size={24} className="text-custom-main1" />
                <FaHeart size={24} className="text-custom-main1" />
                <FaHeart size={24} className="text-custom-main1" />
                <FaHeart size={24} className="text-custom-main1" />
                <FaHeart size={24} className="text-custom-main1" />
                <p className="ms-2 text-sm">4.8 (5 reviews)</p>
              </span>
            </div>
            <p className="text-custom-main2">{cars.description}</p>
            <div className="grid grid-cols-4 border divide-x mt-5 rounded-md">
              <span className="flex gap-2 items-center justify-center p-2">
                <FaUser
                  size={16}
                  className="xl:block lg:hidden xs:block hidden"
                />{' '}
                <p className="whitespace-nowrap">{cars.seat} Seat</p>
              </span>
              <span className="flex gap-2 items-center justify-center p-2">
                <BsSnow2
                  size={16}
                  className="xl:block lg:hidden xs:block hidden"
                />{' '}
                <p className={`${cars.ac ? '' : 'line-through'}`}>Aircon</p>
              </span>
              <span className="flex gap-2 items-center justify-center p-2">
                <TbManualGearboxFilled
                  size={16}
                  className="xl:block lg:hidden xs:block hidden"
                />{' '}
                {cars.transmission}
              </span>
              <span className="flex gap-2 items-center justify-center p-2">
                <BsFillFuelPumpFill
                  size={16}
                  className="xl:block lg:hidden xs:block hidden"
                />{' '}
                {cars.typefuel}
              </span>
            </div>
          </div>
          <CheckOut cars={cars} />
        </div>
        <div className="lg:w-[40%] md:w-[50%] w-[70%] lg:order-2 order-1 mx-auto">
          <Image
            src={`${cars.imageurl ? cars.imageurl : '/not-image'}`}
            alt="car"
            width={800}
            height={800}
            priority
            className="object-cover w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default DetailCarView;
