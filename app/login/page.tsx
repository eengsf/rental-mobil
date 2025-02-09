'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaApple } from 'react-icons/fa';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      alert('Login successful');
      router.push('/dashboard');
    } catch (error) {
      alert('Login failed: login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      alert('Google login successful');
      router.push('/dashboard');
    } catch (error) {
      alert('Google login failed: google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-custom-main4">
      <div className="w-full xs:max-w-96 xs:h-fit h-full flex flex-col gap-5 bg-custom-light xs:border border-none xs:rounded-xl rounded-none xs:shadow-lg shadow-none xs:p-7 p-5 mx-auto">
        <div className="flex flex-col items-center gap-5">
          <Image src="/logo.svg" alt="logo" width={50} height={50} />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-custom-main1">
              Welcome back
            </h2>
            <p className="text-xs text-custom-main2">
              Please enter your details to login
            </p>
          </div>
        </div>

        <form action="" onSubmit={handleLogin}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label className="font-semibold">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="font-semibold">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <input type="checkbox" className="cursor-pointer" />
                  <Label className="font-semibold">Remember me</Label>
                </div>
                <p className="text-sm hover:text-custom-main1 cursor-pointer">
                  Forgot Password?
                </p>
              </div>
            </div>
            <Button
              type="submit"
              size={'lg'}
              disabled={loading}
              className="bg-gradient-to-r from-custom-main1 to-blue-200"
            >
              {loading ? 'Loading...' : 'Login'}{' '}
            </Button>
          </div>
        </form>

        <div className="flex items-center">
          <div className="flex-grow border-t border-custom-main2"></div>
          <span className="text-sm text-custom-main2 mx-4">or</span>
          <div className="flex-grow border-t border-custom-main2"></div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Button
            variant={'secondary'}
            size={'lg'}
            className="flex gap-1 items-center"
            disabled={loading}
          >
            <FaApple size={25} />
            Continue with Apple
          </Button>
          <Button
            variant={'secondary'}
            size={'lg'}
            className="flex gap-1 items-center"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Image src="/google.png" alt="google" width={28} height={28} />
            {loading ? 'Logging in with Google...' : 'Continue with Google'}
          </Button>
        </div>

        <p className="text-xs text-custom-main2 text-center">
          Don&apos;t have an account?{' '}
          <Link
            href={'/register'}
            className="text-custom-main1 hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
