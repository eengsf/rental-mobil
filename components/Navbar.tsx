'use client';

import Image from 'next/image';
import Link from 'next/link';
import Hamburger from './Hamburger';
import { useSelector } from 'react-redux';
import ButtonInOut from './Navbar/ButtonInOut';
import { useDispatch } from 'react-redux';
import { setBurger } from '@/store/slice/counterSlice';

const List = ({ trigger }: any) => {
  return (
    <>
      <div onClick={trigger} className="w-fit whitespace-nowrap">
        <Link
          href={'#step'}
          className="md:text-custom-dark text-custom-light text-sm"
        >
          How it work?
        </Link>
      </div>
      <div onClick={trigger} className="w-fit whitespace-nowrap">
        <Link
          href={'#chooseus'}
          className="md:text-custom-dark text-custom-light text-sm"
        >
          Why choose us
        </Link>
      </div>
      <div onClick={trigger} className="w-fit whitespace-nowrap">
        <Link
          href={'#listcar'}
          className="md:text-custom-dark text-custom-light text-sm"
        >
          Reantal deals
        </Link>
      </div>
      <div onClick={trigger} className="w-fit whitespace-nowrap">
        <Link
          href={'#testimonials'}
          className="md:text-custom-dark text-custom-light text-sm"
        >
          Testimonials
        </Link>
      </div>
    </>
  );
};

function Navbar() {
  const { burger } = useSelector((state: any) => state.counterSlice);
  const dispatch = useDispatch();

  return (
    <nav className="flex sticky top-0 items-center py-3 md:px-10 lg:px-16 px-5 justify-between shadow-sm bg-custom-main3 md:bg-transparent md:backdrop-blur-3xl z-30 gap-3 ">
      <div className="flex">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h2 className="text-xl font-semibold text-custom-dark">Carentall</h2>
        </Link>
      </div>

      <div
        className={`w-3/4 h-full md:hidden bg-blue-500 fixed flex flex-col top-0 right-0 transition-all duration-700 ${
          burger ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } gap-10 shadow-lg px-5 pt-20`}
      >
        <ButtonInOut />
        <List trigger={() => dispatch(setBurger())} />
      </div>

      <div className="md:flex lg:gap-6 md:gap-3 hidden">
        <List trigger={() => dispatch(setBurger())} />
      </div>

      <div className="md:block hidden">
        <ButtonInOut />
      </div>
      <div className="md:hidden block relative ">
        <Hamburger />
      </div>
    </nav>
  );
}

export default Navbar;
