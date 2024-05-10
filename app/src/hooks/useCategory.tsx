/* eslint-disable react-hooks/exhaustive-deps */
import { Category } from '@model/domain';
import { useUser } from './useUser';
import { useUserId } from './useUserId';
import { useEffect, useState } from 'react';
import i18n from 'i18n-js';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { CategoryService } from '@model/services/category';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export const useCategory = (category?: Category) => {
  const { retry: fetchUser, user } = useUser();
  const { userId } = useUserId();

  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);
  const [screenRefreshing, setScreenRefreshing] = useState(false);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
    } else {
      setTitle('');
    }
  }, [category]);

  const toast = useToastNotificationStore();
  const categoryService = new CategoryService();

  const fetchCategories = async () => {
    setIsLoading(true);

    try {
      const allCategories = await categoryService.getAllCategories(user.id);

      setCategories(allCategories);
    } catch (error) {
      console.error(`Error during fetching categies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);

    await fetchCategories();
  };

  const stopRefreshing = () => setScreenRefreshing(false);

  const verifyForm = (): boolean => {
    if (title.trim() === '') {
      setErrors({
        amount: i18n.t('Dialog.Categories.TitleError'),
      });
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const handleCreateCategory = async (): Promise<void> => {
    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
        await categoryService.createCategory(userId, title);
        fetchUser();
        setTitle('');
        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.NewCategorySuccess'),
        });
      } catch (error: any) {
        setErrors({
          generalError: error,
        });
        toast.show({
          type: 'error',
          title: i18n.t('ToastNotification.SomethingWentWrong'),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateCategory = async (): Promise<void> => {
    if (!category) {
      return;
    }

    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
        await categoryService.updateCategory(category?.id, { title });
        fetchUser();
        fetchCategories();
        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.EditCategorySuccess'),
        });
      } catch (error: any) {
        setErrors({
          generalError: error,
        });
        toast.show({
          type: 'error',
          title: i18n.t('ToastNotification.SomethingWentWrong'),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteCategory = async (): Promise<void> => {
    if (!category) {
      return;
    }

    try {
      setIsLoading(true);
      await categoryService.deleteCategory(category?.id);
      fetchUser();
      fetchCategories();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.DeleteCategorySuccess'),
      });
    } catch (error: any) {
      setErrors({
        generalError: error,
      });
      toast.show({
        type: 'error',
        title: i18n.t('ToastNotification.SomethingWentWrong'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setIsModalOpen(false);
    setIsEditModeModal(false);
  };

  const handleEditModalOpen = (editableCategory: Category) => {
    handleModalOpen();
    setSelectedCategory(editableCategory);
    setIsEditModeModal(true);
  };

  const handleTitleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTitle(e.nativeEvent.text);
  };

  const handleConfirmDialogOpen = () => setIsConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setIsConfirmDialogOpen(false);

  const handleConfirmDialogDelete = async () => {
    await handleDeleteCategory();
    handleConfirmDialogClose();
  };

  useEffect(() => {
    if (userId) {
      fetchCategories();
    } else {
      setCategories([]);
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!isLoading && screenRefreshing) {
      stopRefreshing();
    }
  }, [isLoading, categories, screenRefreshing]);

  return {
    title,
    fetchCategories,
    handlePullToRefresh,
    stopRefreshing,
    verifyForm,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    errors,
    setErrors,
    isLoading,
    categories,
    isConfirmDialogOpen,
    isModalOpen,
    selectedCategory,
    isEditModeModal,
    screenRefreshing,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    handleTitleChange,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
  };
};
