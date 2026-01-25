/* eslint-disable react-hooks/exhaustive-deps */
import { IconType } from '@components/shared';
import { getLocale } from '@core/translation-utils';
import { Category } from '@model/domain';
import { defaultCategories, ExtendedCategory } from '@model/domain/constants/categories';
import { getCategoryService } from '@model/services';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import translate from 'google-translate-api-x';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useAsyncAction } from './common/useAsyncAction';
import { useModal } from './common/useModal';
import { useUser } from './useUser';

export const useCategory = (category?: Category) => {
  const { retry: fetchUser, user } = useUser();
  const userId = user?.id;

  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>(category?.color ?? '#fff');
  const [icon, setIcon] = useState<IconType | null>(category?.icon ?? null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isLoading, execute } = useAsyncAction();
  const [categories, setCategories] = useState<(Category | ExtendedCategory)[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const modal = useModal<Category>();
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
  const categoryService = getCategoryService();

  const fetchCategories = async () => {
    await execute(async () => {
      const allCategories = await categoryService.getAllCategories(user.id);
      const translatedCategories: Category[] = [];

      for (const categ of allCategories) {
        translatedCategories.push({
          ...categ,
          title: (await translate(categ.title, { to: locale === 'hun' ? 'hu' : 'en' })).text,
        });
      }

      setCategories([...defaultCategories, ...allCategories]);
    });
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
      await execute(async () => {
        await categoryService.createCategory(userId, title, color, icon);
        fetchUser();
        setTitle('');
        setIcon(null);
        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.NewCategorySuccess'),
        });
      });
    }
  };

  const handleUpdateCategory = async (): Promise<void> => {
    if (!category) {
      return;
    }

    const isFormVerified = verifyForm();

    if (isFormVerified) {
      await execute(async () => {
        await categoryService.updateCategory(category?.id, { title, color, icon });
        fetchUser();
        fetchCategories();
        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.EditCategorySuccess'),
        });
      });
    }
  };

  const handleDeleteCategory = async (): Promise<void> => {
    if (!category) {
      return;
    }

    await execute(async () => {
      await categoryService.deleteCategory(category?.id);
      fetchUser();
      fetchCategories();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.DeleteCategorySuccess'),
      });
    });
  };

  const handleModalOpen = (): void => modal.open();

  const handleModalClose = (): void => {
    modal.close();
    setTitle('');
    setIcon(null);
  };

  const handleEditModalOpen = (editableCategory: Category | ExtendedCategory) => {
    if (!('isDefault' in editableCategory && editableCategory.isDefault)) {
      modal.open(editableCategory as Category);
    }
  };

  const handleTitleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTitle(e.nativeEvent.text);
  };

  const handleColorChange = (c: string) => setColor(c);

  const handleIconChange = (iconName: IconType) => setIcon(iconName);

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
    isModalOpen: modal.isOpen,
    selectedCategory: modal.data,
    isEditModeModal: modal.isEditMode,
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
