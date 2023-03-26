import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase/auth';
import { deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { getApp, getCollection } from '../../firebase-config';

const STORAGE_KEY = 'clientId';

export class AuthService {
  private readonly auth: firebase.Auth = firebase.getAuth(getApp());

  async loginWithEmailAndPassword(email: string, password: string): Promise<firebase.User> {
    const userCredential = await firebase.signInWithEmailAndPassword(this.auth, email, password);

    const { user } = userCredential;

    return user;
  }

  async registration(email: string, password: string): Promise<firebase.User> {
    const userCredential = await firebase.createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const { user } = userCredential;

    return user;
  }

  getCurrentUser(): Promise<firebase.User> {
    const promise: Promise<firebase.User> = new Promise((resolve, reject) => {
      if (!this.auth.currentUser) {
        return resolve(this.auth.currentUser);
      }

      const unsubscribe = firebase.onAuthStateChanged(
        this.auth,
        (user) => {
          unsubscribe();
          resolve(user);
        },
        (error) => reject(error)
      );
    });

    return promise;
  }

  async signOut(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      await firebase.signOut(this.auth);
    } catch (error) {
      console.error(error);
    }
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    const credential = firebase.EmailAuthProvider.credential(user.email, oldPassword);

    const userCredential = await firebase.reauthenticateWithCredential(user, credential);
    await firebase.updatePassword(userCredential.user, newPassword);
  }

  async deleteAccount(): Promise<void | string> {
    try {
      const user = await this.getCurrentUser();
      await user.delete();

      this.deleteUser(user.uid);
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        return 'auth/requires-recent-login';
      } else {
        throw error;
      }
    }
  }

  private async deleteUser(userId: string): Promise<void> {
    const usersCollection = getCollection('users');
    const queryData = query(usersCollection, where('userIds', 'array-contains', userId));
    const snapshots = await getDocs(queryData);

    if (snapshots.empty) {
      throw new Error('There is no user with this user id');
    }

    const docRef = snapshots.docs[0].ref;

    await deleteDoc(docRef);
  }
}
