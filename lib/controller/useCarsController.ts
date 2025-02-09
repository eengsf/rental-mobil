import { useEffect, useState } from 'react';
import {
  collection,
  query,
  limit,
  startAfter,
  getDocs,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ProductCar } from '@/model/ProductCar';
import { WishListData } from '@/model/WishListData';

export const useCarsController = () => {
  const [cars, setCars] = useState<ProductCar[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [wishList, setWishList] = useState<WishListData[]>([]);
  const [wlLoading, setWlLoading] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const carCollection = collection(db, 'cars');
      const q = query(carCollection, limit(5));

      const snapshot = await getDocs(q);
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      const newCars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductCar[];

      setCars(newCars);

      if (snapshot.docs.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreCars = async () => {
    if (!lastVisible || !hasMore) return;

    setLoading(true);
    try {
      const carCollection = collection(db, 'cars');
      const q = query(carCollection, startAfter(lastVisible), limit(5));

      const snapshot = await getDocs(q);
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      const moreCars = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductCar[];

      setCars((prevCars) => [...prevCars, ...moreCars]);

      if (snapshot.docs.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishList = async (userId: string, carId: string) => {
    if (!userId) {
      alert('You need to login to add to wishlist');
      return;
    }

    setWlLoading(true);

    try {
      const wishListRef = collection(db, 'wishlists');
      const q = query(
        wishListRef,
        where('userId', '==', userId),
        where('carId', '==', carId)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(wishListRef, {
          userId: userId,
          carId: carId,
          status: 'yes',
        });
        setWishList([
          ...wishList,
          { userId: userId, carId: carId, status: 'yes' },
        ]);
      } else {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setWishList(wishList.filter((wish) => wish.carId !== carId));
      }
    } catch (error) {
      console.error('Error updating wishlist: ', error);
    } finally {
      setWlLoading(false);
    }
  };

  return {
    cars,
    loading,
    fetchMoreCars,
    wishList,
    wlLoading,
    handleWishList,
  };
};
