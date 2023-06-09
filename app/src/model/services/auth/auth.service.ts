import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase/auth';
import { deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { getApp, getCollection } from '../../firebase-config';

const STORAGE_KEY = 'clientId';
const AUTH_USER_STORAGE_KEY = 'authUser';
const USER_UID = 'userUid';

export class AuthService {
  private readonly auth: firebase.Auth = firebase.getAuth(getApp());

  async loginWithEmailAndPassword(email: string, password: string): Promise<firebase.User> {
    const userCredential = await firebase.signInWithEmailAndPassword(this.auth, email, password);

    const { user } = userCredential;

    if (user && !user.emailVerified) {
      await firebase.sendEmailVerification(user);
    }

    await AsyncStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(USER_UID, JSON.stringify(user.uid));

    return user;
  }

  async registration(email: string, password: string): Promise<firebase.User> {
    const userCredential = await firebase.createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const { user } = userCredential;

    if (user && !user.emailVerified) {
      await firebase.sendEmailVerification(user);
    }

    await AsyncStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
    await AsyncStorage.setItem(USER_UID, JSON.stringify(user.uid));

    return user;
  }

  getCurrentUser(): Promise<firebase.User> {
    const promise: Promise<firebase.User> = new Promise((resolve, reject) => {
      if (this.auth.currentUser) {
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
      await AsyncStorage.removeItem(AUTH_USER_STORAGE_KEY);
      await AsyncStorage.removeItem(USER_UID);
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
      let user: firebase.User = await this.getCurrentUser();

      if (!user) {
        user = JSON.parse(await AsyncStorage.getItem(AUTH_USER_STORAGE_KEY));
      }

      if (user) {
        await user.delete();

        await this.deleteUser(user.uid);
        await this.signOut();
      }
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

  async sendVerificationEmail(): Promise<void> {
    const user = await this.getCurrentUser();

    await firebase.sendEmailVerification(user);
  }
}
