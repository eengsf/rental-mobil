'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserData } from '@/model/UserData';
import { monitorAuthState } from '@/lib/controller/authController';
import DashboardView from '@/components/Dashboard/DashboardView';

const Dashboard = () => {
  const [user, setUser] = useState<UserData>({} as UserData);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = monitorAuthState(
      (userData) => {
        setUser(userData);
      },
      () => router.push('/register')
    );

    return () => unsubscribe();
  }, [router]);

  if (!user.id) {
    return (
      <div className="flex justify-center items-center w-full h-[490px]">
        <div className="loading flex justify-center items-center"></div>
      </div>
    );
  }
  return <DashboardView user={user} />;
};

export default Dashboard;
