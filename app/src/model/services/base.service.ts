import { CollectionReference, doc, getDoc, getDocs } from 'firebase/firestore';
import { getCollection } from '../firebase-config';

export class BaseService<T> {
  protected readonly collection: CollectionReference<T>;

  constructor(collectionName: string) {
    this.collection = getCollection<T>(collectionName);
  }

  async getAll(): Promise<(T & { id: string })[]> {
    const snapshots = await getDocs(this.collection);

    return snapshots.docs.map((data) => ({ ...data.data(), id: data.id }));
  }

  async getById(id: string): Promise<T & { id: string }> {
    const docRef = doc(this.collection, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error('Document not found');
    }

    return { ...snapshot.data(), id: snapshot.id };
  }
}
