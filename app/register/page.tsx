'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
      alert('Registration successful');
      router.push('/login');
    } catch (error) {
      alert('Registration failed: registrasi');
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
              Create an account
            </h2>
            <p className="text-xs text-custom-main2">
              Please enter your details to register
            </p>
          </div>
        </div>
        <form action="" onSubmit={handleRegister}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label className="font-semibold">Your Name</Label>
              <Input
                type="text"
                placeholder="Enter your first name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-semibold">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-semibold">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-semibold">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              {form.confirmPassword && (
                <span
                  className={`text-xs ${
                    form.password !== form.confirmPassword
                      ? 'block text-red-500'
                      : 'hidden'
                  }`}
                >
                  password wrong
                </span>
              )}
            </div>

            <Button
              type="submit"
              size={'lg'}
              disabled={loading}
              className="bg-gradient-to-r from-custom-main1 to-blue-200"
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
        <p className="text-xs text-custom-main2 text-center">
          Have an account?{' '}
          <Link
            href={'/login'}
            className="text-custom-main1 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
