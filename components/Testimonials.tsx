'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { FaStar } from 'react-icons/fa6';

const promosi = [
  {
    name: 'Charles Suyono',

    value: 4.8,
    img: '/testimoni1.png',
    test: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea expedita alias neque sed nam explicabo quidem quae facere possimus quis animi numquam, quaerat earum commodi dicta incidunt? Ducimus eaque maxime minima alias eius modi hic rerum eos nulla, neque repellat, error vel.',
  },
  {
    name: 'Jessica Putri Inem',

    value: 4.7,
    img: '/testimoni2.png',
    test: 'Ducimus eaque maxime minima alias eius modi hic rerum eos nulla, neque repellat, error vel. Recusandae, atque? Optio,  elit. Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea  delectus iure libero, dolorem nesciunt ea expedita alias neque sed nam explicabo quidem quae facere possimus quis animi numquam, quaerat earum commodi dicta incidunt? ',
  },
  {
    name: 'Putra Alex Purwoto',

    value: 4.9,
    img: '/testimoni3.png',
    test: 'Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea expedita alias neque sed nam explicabo quidem quae facere possimus quis animi numquam Lorem ipsum dolor sit amet consectetur adipisicing elit.  elit. Recusandae, atque? Optio, delectus iure libero, dolorem nesciunt ea  quaerat earum commodi dicta incidunt? , error vel.',
  },
];

function Testimonials() {
  const [prevNext, setPrevNext] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div
      id="testimonials"
      className="flex flex-col items-center md:justify-between justify-evenly gap-5 lg:px-16 md:px-10 px-5 py-8 md:py-20 h-fit bg-custom-main3 "
    >
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-custom-main2 font-bold">TESTIMONIALS</h2>
        <p className="xs:text-3xl text-2xl font-bold text-custom-dark text-center">
          What people say about us?
        </p>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        onMouseEnter={() => setPrevNext(true)}
        onMouseLeave={() => setPrevNext(false)}
        className="w-full max-w-full xs:rounded-xl rounded-none relative "
      >
        <CarouselContent>
          {promosi.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-full h-full  rounded-xl flex md:flex-row flex-col items-center"
            >
              <div className="md:w-1/2 w-full lg:p-10 p-0 flex items-center justify-center">
                <Image
                  src={`${item.img}`}
                  alt={item.name}
                  width={500}
                  height={500}
                  priority
                  className=" h-full "
                />
              </div>
              <div className="md:w-1/2 w-full flex flex-col gap-10 p-10 ">
                <p className="leading-7">{item.test}</p>
                <div className="flex flex-col gap-1">
                  <h2 className="lg:text-3xl text-2xl font-semibold text-custom-dark">
                    {item.name}
                  </h2>
                  <div className="flex gap-1 items-center">
                    <FaStar size={20} className="text-yellow-500" />
                    <FaStar size={20} className="text-yellow-500" />
                    <FaStar size={20} className="text-yellow-500" />
                    <FaStar size={20} className="text-yellow-500" />
                    <FaStar size={20} className="text-yellow-500" />
                    <span className="ms-2">{item.value}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          onMouseEnter={() => setPrevNext(true)}
          className={`absolute z-10 top-1/2 -translate-y-1/2 -left-4 translate-x-10 transition-all duration-500 ease-in-out ${
            prevNext ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
        />
        <CarouselNext
          onMouseEnter={() => setPrevNext(true)}
          className={` absolute z-10 top-1/2 -translate-y-1/2 -right-4 -translate-x-10 transition-all duration-500 ease-in-out ${
            prevNext ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
        />
      </Carousel>
      <div className="flex gap-2 ">
        <div
          className={`w-16 h-2 rounded-full transition-colors duration-300 ${
            current === 1 ? 'bg-custom-main1' : 'bg-slate-300'
          }`}
        ></div>
        <div
          className={`w-16 h-2 rounded-full transition-colors duration-300 ${
            current === 2 ? 'bg-custom-main1' : 'bg-slate-300'
          }`}
        ></div>
        <div
          className={`w-16 h-2 rounded-full transition-colors duration-300 ${
            current === 3 ? 'bg-custom-main1' : 'bg-slate-300'
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Testimonials;
