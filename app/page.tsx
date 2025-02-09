'use client';

import ChooseUs from '@/components/ChooseUs';
import Coba from '@/components/Coba';
import ListCar from '@/components/ListCar';
import Step from '@/components/Step';
import Testimonials from '@/components/Testimonials';
import { monitorAuthState } from '@/lib/controller/authController';
import { UserData } from '@/model/UserData';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<UserData | null>(null);
  useEffect(() => {
    const handleUserFound = (userData: UserData) => {
      setData(userData);
    };
    const handleUserNotFound = () => {
      setData(null);
    };

    const unsubscribe = monitorAuthState(handleUserFound, handleUserNotFound);
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full">
      <Coba />
      <Step />
      <ChooseUs />
      <ListCar dataLogin={data} />
      <Testimonials />
    </div>
  );
}
