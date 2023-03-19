import {
  doc,
  documentId,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { User } from '@model/domain';
import { getDB } from '@model/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../auth';
import { BaseService } from '../base.service';

export type UserModel = {
  id: string;
  userIds: string[];
  userId: string;
  email: string;
  lastname: string;
  firstname: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class UserService extends BaseService<UserModel> {
  private authService: AuthService;

  constructor() {
    super('users');
    this.authService = new AuthService();
  }

  async getCurrentUser(): Promise<User> {
    const user = await this.authService.getCurrentUser();

    if (!user) {
      return null;
    }

    let queryData = query(this.collection, where('userIds', 'array-contains', user.uid));
    let userSnapshots = await getDocs(queryData);

    if (userSnapshots.empty) {
      queryData = query(this.collection, where('userId', '==', user.uid));
      userSnapshots = await getDocs(queryData);

      if (userSnapshots.empty) {
        return null;
      }

      const userRef = doc(
        getDB(),
        'users',
        userSnapshots.docs[0].id
      ) as DocumentReference<UserModel>;
      const userId = userSnapshots.docs[0].data().userId;

      await updateDoc(userRef, {
        userIds: [userId],
      });

      await this.setUserId(userSnapshots.docs[0].id);
      return userSnapshots.docs[0].data();
    }
  }

  async getUserByUserId(userId: string): Promise<User> {
    const queryData = query(this.collection, where(documentId(), '==', userId));
    const userSnapshots = await getDocs(queryData);

    if (userSnapshots.empty) {
      return null;
    }

    return userSnapshots[0].data();
  }

  // async createUserWithEmailAndPassword(
  //   firstname: string,
  //   lastname: string,
  //   email: string,
  //   password: string
  // ): Promise<User> {
  //   const user = await this.authService.registration(email, password);

  //   return this.createUser(user.uid, email, password);
  // }

  async createUser(
    // userId: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string
    // fullname?: { firstname: string; lastname: string }
  ): Promise<User> {
    // const id = await this.getUserId();
    // const user = await this.getUserByUserId(id);
    const savedUser = await this.authService.registration(email, password);
    console.log('savedUser: ', savedUser);
    const user = await this.getUserByUserId(savedUser.uid);
    console.log('user: ', user);
    const userRef = doc(getDB(), 'users', user.id) as DocumentReference<UserModel>;

    if (user) {
      await updateDoc(userRef, {
        userIds: user?.userIds ? [...user.userIds, user.userId] : [user.userId],
      });
    } else {
      const userData: Partial<UserModel> = {
        userIds: [user.userId],
        email,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      userData.firstname = firstname;
      userData.lastname = lastname;

      await setDoc(userRef, userData);
    }

    const userSnapshot = await getDoc(userRef);

    return userSnapshot.data();
  }

  async updateBasicDetails(userId: string, data: Partial<User>): Promise<User> {
    const docRef = doc(this.collection, userId);

    let userData: Partial<User> = {
      lastname: data.lastname.trim(),
      firstname: data.lastname.trim(),
    };

    await updateDoc(docRef, { ...userData, updatedAt: Timestamp.now() });

    const userSnapshot = await getDoc(docRef);

    return userSnapshot.data();
  }

  private async getUserId() {
    const STORAGE_KEY = 'clientId';

    try {
      let userId = await AsyncStorage.getItem(STORAGE_KEY);

      if (!userId) {
        userId = uuid.v4() as string;

        await AsyncStorage.setItem(STORAGE_KEY, userId);
      }

      return userId;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async setUserId(userId: string) {
    const STORAGE_KEY = 'clientId';

    try {
      return await AsyncStorage.setItem(STORAGE_KEY, userId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
