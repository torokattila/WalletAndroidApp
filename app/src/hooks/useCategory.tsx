/* eslint-disable react-hooks/exhaustive-deps */
import { IconType } from '@components/shared';
import { getLocale } from '@core/translation-utils';
import { Category } from '@model/domain';
import { defaultCategories, ExtendedCategory } from '@model/domain/constants/categories';
import { CategoryService } from '@model/services/category';
import { useCategoriesStore } from '@stores/categories.store';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import translate from 'google-translate-api-x';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useUser } from './useUser';
import useVibration from './useVibration';

export const useCategory = (category?: Category) => {
  const { retry: fetchUser, user } = useUser();
  const { vibrateLight } = useVibration();
  const userId = user?.id;
  const { categories, setCategories, isDirty, invalidate } = useCategoriesStore();

  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>(category?.color ?? '#fff');
  const [icon, setIcon] = useState<IconType | null>(category?.icon ?? null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);
  const [screenRefreshing, setScreenRefreshing] = useState(false);

  const locale = getLocale();

  useEffect(() => {
    if (category) {
      setTitle(category.title);

      if (category?.color) {
        setColor(category.color);
      }

      if (category?.icon) {
        setIcon(category.icon);
      }
    } else {
      setTitle('');
      setIcon(null);
    }
  }, [category]);

  const toast = useToastNotificationStore();
  const categoryService = new CategoryService();

  const fetchCategories = async () => {
    if (!isDirty && categories.length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      const allCategories = await categoryService.getAllCategories(user.id);
      const translatedCategories: Category[] = [];

      for (const categ of allCategories) {
        try {
          const translated = (await translate(categ.title, { to: locale === 'hun' ? 'hu' : 'en' }))
            .text;
          translatedCategories.push({ ...categ, title: translated });
        } catch {
          translatedCategories.push(categ);
        }
      }

      setCategories([...defaultCategories, ...translatedCategories]);
    } catch (error) {
      console.error(`Error during fetching categories: ${error?.stack}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);
    invalidate();
    vibrateLight();
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
    vibrateLight();
    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
        await categoryService.createCategory(userId, title, color, icon);
        fetchUser();
        invalidate();
        setTitle('');
        setIcon(null);
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
    vibrateLight();
    if (!category) {
      return;
    }

    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
        await categoryService.updateCategory(category?.id, { title, color, icon });
        fetchUser();
        invalidate();
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
      invalidate();
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

  const handleEditModalOpen = (editableCategory: Category | ExtendedCategory) => {
    if (!('isDefault' in editableCategory && editableCategory.isDefault)) {
      handleModalOpen();
      setSelectedCategory(editableCategory);
      setIsEditModeModal(true);
    }
  };

  const handleTitleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTitle(e.nativeEvent.text);
  };

  const handleColorChange = (c: string) => setColor(c);

  const handleIconChange = (iconName: IconType) => {
    vibrateLight();
    setIcon(iconName);
  };

  const handleConfirmDialogOpen = () => {
    vibrateLight();
    setIsConfirmDialogOpen(true);
  };
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
    color,
    icon,
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
    handleColorChange,
    handleIconChange,
  };
};
