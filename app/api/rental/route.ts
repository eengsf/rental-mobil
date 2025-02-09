import { db } from '@/lib/firebase';
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { days, startTime, endTime, withDriver, carId, userId, totalPrice } =
      await req.json();

    if (!days || !startTime || !endTime || !carId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const dbRef = doc(collection(db, 'rental'));
    const docRef = {
      id: dbRef.id,
      days,
      startTime,
      endTime,
      withDriver,
      carId,
      userId,
      totalPrice,

      createdAt: Timestamp.fromDate(new Date()),
    };
    await setDoc(dbRef, docRef);

    return NextResponse.json({ message: 'Rental data saved successfully!' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
