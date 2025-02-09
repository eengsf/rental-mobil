import { collection, query, getDocs, where } from 'firebase/firestore';
import { Rental } from '@/model/Rental';
import { ProductCar } from '@/model/ProductCar';
import { auth, db } from '../firebase';

export const getRentals = async (): Promise<Rental[]> => {
  const user = auth.currentUser;
  try {
    const rentalsCollection = collection(db, 'rental');
    const q = query(rentalsCollection, where('userId', '==', user?.uid));

    const rentalsSnapshot = await getDocs(q);
    const rentalsData = rentalsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Rental[];
    return rentalsData;
  } catch (error) {
    console.error('Error fetching rentals:', error);
    throw error;
  }
};

export const getCarsForRentals = async (
  carIds: string[]
): Promise<ProductCar[]> => {
  try {
    if (carIds.length === 0) return [];
    const carsCollection = collection(db, 'cars');
    const q = query(carsCollection, where('id', 'in', carIds));

    const carsSnapshot = await getDocs(q);
    const carsData = carsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ProductCar[];
    return carsData;
  } catch (error) {
    console.error('Error fetching cars for rentals:', error);
    throw error;
  }
};
