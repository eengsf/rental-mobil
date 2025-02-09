import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { UserData } from '@/model/UserData';
import { getUserData } from './userController';

export const monitorAuthState = (
  onUserFound: (userData: UserData) => void,
  onUserNotFound: () => void
) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getUserData(user.uid);
      if (userDoc) {
        onUserFound(userDoc);
      } else {
        onUserNotFound();
      }
    } else {
      onUserNotFound();
    }
  });

  return unsubscribe;
};
