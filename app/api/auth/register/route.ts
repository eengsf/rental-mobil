// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const userData = {
      id: user.uid,
      name: name,
      email: email,
      createdAt: new Date(),
    };
    await setDoc(doc(db, 'users', user.uid), userData);

    return NextResponse.json({ message: 'Register Success', status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
