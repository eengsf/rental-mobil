import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Rental } from '@/model/Rental';

export const getRentals = async (): Promise<Rental[]> => {
  const rentalDocs = await getDocs(collection(db, 'rental'));

  if (!rentalDocs) {
    return [];
  }

  const rentalData = rentalDocs.docs.map((doc) => {
    const data = doc.data() as Rental;
    return { ...data, id: doc.id };
  });
  return rentalData;
};
