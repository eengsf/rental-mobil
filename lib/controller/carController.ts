import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ProductCar } from '@/model/ProductCar';

export const getCars = async (): Promise<ProductCar[]> => {
  const carDocs = await getDocs(collection(db, 'cars'));

  if (!carDocs) {
    return [];
  }

  const carsData = carDocs.docs.map((doc) => {
    const data = doc.data() as ProductCar;
    return { ...data, id: doc.id };
  });

  return carsData;
};
