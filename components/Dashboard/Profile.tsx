'use client';

import { UserData } from '@/model/UserData';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useState } from 'react';
import { updateUserData, uploadImage } from '@/lib/controller/userController';
import { SlPencil } from 'react-icons/sl';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const Profile = ({ data }: { data: UserData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserData>(data);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [changeData, setChangeData] = useState({
    name: true,
    email: true,
    address: true,
    phone: true,
    sim: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, profilePhotoUrl: imageUrl });
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let profilePhotoUrl = formData.profilePhotoUrl;

      if (selectedFile) {
        profilePhotoUrl = await uploadImage(selectedFile, data.id);
      }

      await updateUserData(data.id, { ...formData, profilePhotoUrl });
      alert('Update successful');
      setChangeData({
        name: true,
        email: true,
        address: true,
        phone: true,
        sim: true,
      });

      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const image = formData.profilePhotoUrl
    ? formData.profilePhotoUrl
    : '/user.png';

  return (
    <div className="flex lg:flex-row flex-col gap-10">
      <div className="flex flex-col w-full max-w-64 lg:mx-0 mx-auto">
        <div className="w-full h-full">
          <Image
            src={`${image}`}
            alt="Profile"
            width={200}
            height={200}
            priority
            className="object-cover w-full bg-transparent"
          />
        </div>
        <Input
          type="file"
          id="profile"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="profile"
          className="cursor-pointer border border-custom-main2 px-4 py-2 rounded-lg text-center text-sm"
        >
          {image ? 'Ganti Foto Profil' : 'Pilih Foto Profil'}
        </label>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col w-full ">
          <Label className="font-semibold text-sm">Name</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              disabled={changeData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <span
              onClick={() => setChangeData({ ...changeData, name: false })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <Label className="font-semibold text-sm">Email</Label>
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              disabled={changeData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <span
              onClick={() => setChangeData({ ...changeData, email: false })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <Label className="font-semibold text-sm">Address</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              disabled={changeData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <span
              onClick={() => setChangeData({ ...changeData, address: false })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <Label className="font-semibold text-sm">Number Phone</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={formData.phone}
              disabled={changeData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <span
              onClick={() => setChangeData({ ...changeData, phone: false })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <Label className="font-semibold text-sm">Number SIM</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your SIM number"
              value={formData.noSIM}
              disabled={changeData.sim}
              onChange={(e) =>
                setFormData({ ...formData, noSIM: e.target.value })
              }
            />
            <span
              onClick={() => setChangeData({ ...changeData, sim: false })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <Button
          onClick={handleUpdateProfile}
          className="w-fit bg-custom-main1 hover:bg-custom-main1/70"
        >
          {loading ? 'Loading...' : 'Update Profile'}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
