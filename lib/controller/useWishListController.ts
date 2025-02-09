import { auth, db } from '../firebase';
import { WishListData } from '@/model/WishListData';

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

export const getWishListForUser = async () => {
  const userAuth = auth.currentUser?.uid;
  if (!userAuth) {
    throw new Error('User ID tidak ditemukan. Silakan login terlebih dahulu.');
  }

  try {
    const wishLishsCollection = collection(db, 'wishlists');
    const q = query(wishLishsCollection, where('userId', '==', userAuth));
    const wishLishsSnapshot = await getDocs(q);
    const wishLishsData = wishLishsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as WishListData[];
    return wishLishsData;
  } catch (error) {
    console.error('Error fetching wishlist for user:', error);
    throw error;
  }
};

export const getCarsForWishList = async () => {
  try {
    const wishList = await getWishListForUser();

    const carIds = wishList.map((wish) => wish.carId);

    const carPromises = carIds.map(async (carId) => {
      const carDocRef = doc(db, 'cars', carId);
      const carSnapshot = await getDoc(carDocRef);
      if (carSnapshot.exists()) {
        return { id: carSnapshot.id, ...carSnapshot.data() };
      }
      return null;
    });

    // Tunggu semua data mobil selesai diambil
    const cars = await Promise.all(carPromises);

    // Kembalikan hanya mobil yang ditemukan (tidak null)
    return cars.filter((car) => car !== null);
  } catch (error) {
    console.error('Error fetching cars for wishlist:', error);
    throw error;
  }
};
