import DetailCarView from '@/components/DetailCar/DetailCarView';
import { db } from '@/lib/firebase';
import { ProductCar } from '@/model/ProductCar';
import { doc, getDoc } from 'firebase/firestore';

async function Page({ params }: { params: { id: string } }) {
  const carDoc = doc(db, 'cars', params.id);
  const carSnapshot = await getDoc(carDoc);

  if (!carSnapshot.exists()) {
    return <div>Car not found</div>;
  }

  const carData = carSnapshot.data() as ProductCar;
  const { createAt, ...cars } = carData;

  return <DetailCarView cars={cars} />;
}

export default Page;
