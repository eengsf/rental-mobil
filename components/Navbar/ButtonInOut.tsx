'use client';

import { useEffect, useState } from 'react';
import { monitorAuthState } from '@/lib/controller/authController';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { UserData } from '@/model/UserData';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setBurger } from '@/store/slice/counterSlice';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { IoIosLogOut } from 'react-icons/io';

function ButtonInOut() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState<UserData>();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUserFound = (userData: UserData) => {
      setIsLoggedIn(true);
      setData(userData);
    };

    const handleUserNotFound = () => {
      setIsLoggedIn(false);
    };

    const unsubscribe = monitorAuthState(handleUserFound, handleUserNotFound);

    return () => unsubscribe();
  }, []);

  const handleLogInOut = async () => {
    dispatch(setBurger());
    setLoading(true);
    try {
      if (isLoggedIn) {
        await signOut(auth);
        router.push('/');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during login/logout:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = () => {
    dispatch(setBurger());
    setLoading(true);
    router.push('/register');
  };

  const handleDashboard = () => {
    dispatch(setBurger());
    setLoading(true);
    router.push('/dashboard');
  };

  return (
    <div
      className={`flex ${
        isLoggedIn ? 'xs:flex-row-reverse flex-col' : 'flex-row'
      } gap-3 items-center relative`}
    >
      {isLoggedIn && (
        <button
          onClick={handleDashboard}
          className="w-full h-full cursor-pointer md:static absolute -top-[68px] md:top-0"
        >
          <div className="w-fit flex items-center gap-1 border border-custom-main1 rounded-full p-1.5 bg-white">
            <Image
              src={`${
                data?.profilePhotoUrl ? data?.profilePhotoUrl : '/user.png'
              }`}
              alt="Logo"
              width={30}
              height={30}
              className=" object-cover rounded-full"
            />
          </div>
        </button>
      )}

      <Button
        onClick={handleLogInOut}
        variant={'outline'}
        className="font-bold w-full lg:block md:hidden block"
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </Button>
      <span className="cursor-pointer border border-custom-main1 rounded-full p-2.5 lg:hidden md:block hidden">
        <IoIosLogOut size={16} />
      </span>

      {!isLoggedIn && (
        <Button onClick={handleRegister} className="font-bold w-full">
          {loading ? 'Loading...' : 'Register'}
        </Button>
      )}
    </div>
  );
}

export default ButtonInOut;
