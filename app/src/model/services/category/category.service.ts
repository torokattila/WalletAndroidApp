import { Category } from '@model/domain';
import { getDB } from '@model/firebase-config';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { BaseService } from '../base.service';

export type CategoryModel = {
  id: string;
  userId: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export class CategoryService extends BaseService<CategoryModel> {
  constructor() {
    super('categories');
  }

  async createCategory(userId: string, title: string): Promise<Category> {
    const categoriesCollectionRef = collection(getDB(), 'categories');
    const insertedCategory = await addDoc(categoriesCollectionRef, {
      userId,
      title,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const categoryRef = doc(
      getDB(),
      'categories',
      insertedCategory?.id
    ) as DocumentReference<CategoryModel>;
    const categorySnapshot = await getDoc(categoryRef);

    return CategoryService.toDomainObject(categorySnapshot);
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const queryData = doc(this.collection, categoryId);
    const categorySnapshot = await getDoc(queryData);

    return CategoryService.toDomainObject(categorySnapshot);
  }

  async updateCategory(categoryId: string, data: Partial<Category>): Promise<Category> {
    const docRef = doc(this.collection, categoryId);
    const categoryData: Partial<Category> = {
      title: data?.title?.trim(),
    };

    await updateDoc(docRef, { ...categoryData, updatedAt: Timestamp.now() });

    const categorySnap = await getDoc(docRef);

    return CategoryService.toDomainObject(categorySnap);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const docRef = doc(this.collection, categoryId);
    const categorySnapshot = await getDoc(docRef);

    if (!categorySnapshot.exists()) {
      return;
    }

    await deleteDoc(docRef);
  }

  async getAllCategories(userId: string): Promise<Category[]> {
    const queryData = query(
      this.collection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
      limit(9998)
    );

    const snapshot = await getDocs(queryData);

    if (snapshot.empty) {
      return [];
    }

    return snapshot?.docs?.map(CategoryService.toDomainObject);
  }

  static toDomainObject(category: QueryDocumentSnapshot<Category>): Category {
    const { ...categoryData } = category.data();

    return new Category({
      ...categoryData,
      id: category.id,
    });
  }
}
