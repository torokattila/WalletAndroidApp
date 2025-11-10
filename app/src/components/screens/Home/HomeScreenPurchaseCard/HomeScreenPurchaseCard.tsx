import { Icon } from '@components/shared';
import { getLocale } from '@core/translation-utils';
import { useDarkMode } from '@hooks/useDarkMode';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import { format } from 'date-fns';
import translate from 'google-translate-api-x';
import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import {
  Amount,
  Category,
  CategoryAndAmountContainer,
  Container,
  IconContainer,
  PurchaseDate,
  SecondaryCategory,
} from './HomeScreenPurchaseCard.styles';

type HomeScreenPurchaseCardProps = { purchase: Purchase; onPress: () => void };

const cardIcon = {
  food: <Icon type="hamburger-big" iconColor={theme.colors.white[100]} />,
  clothing: <Icon type="clothing-big" iconColor={theme.colors.white[100]} />,
  entertainment: <Icon type="entertainment-big" iconColor={theme.colors.white[100]} />,
  other: <Icon type="other-purchase-big" iconColor={theme.colors.white[100]} />,
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const HomeScreenPurchaseCard: FC<HomeScreenPurchaseCardProps> = ({ purchase, onPress }) => {
  const { isDarkMode } = useDarkMode();
  const locale = getLocale();
  const [translatedCategory, setTranslatedCategory] = useState(purchase.category);

  useEffect(() => {
    const translateCategory = async () => {
      const categoryText =
        typeof purchase.category === 'string' ? purchase.category : purchase.category.title;
      const temporaryTranslatedCategory = (
        await translate(categoryText, {
          to: locale === 'hun' ? 'hu' : 'en',
        })
      ).text;

      setTranslatedCategory(temporaryTranslatedCategory);
    };

    translateCategory();
  }, [locale, purchase.category]);

  return (
    <Container
      style={!isDarkMode && cardShadow}
      onPress={onPress}
      underlayColor={isDarkMode ? theme.colors.grey[700] : '#DDDDDD'}
      isDarkMode={isDarkMode}
    >
      <>
        <IconContainer
          isDarkMode={isDarkMode}
          style={cardShadow}
          categoryColor={purchase.categoryObject?.color}
        >
          {cardIcon[
            typeof purchase.category === 'string' ? purchase.category : purchase.category.title
          ] ?? cardIcon.other}
        </IconContainer>

        <CategoryAndAmountContainer>
          <Category>
            {i18n.t(`Purchases.Categories.${purchase.category}`, {
              defaultValue: translatedCategory,
            })}
          </Category>
          {purchase?.secondaryCategory && (
            <SecondaryCategory>{purchase.secondaryCategory}</SecondaryCategory>
          )}

          <Amount>- {purchase.amount} Ft</Amount>
        </CategoryAndAmountContainer>

        <PurchaseDate>{format(purchase.updatedAt.toDate(), 'yyyy.MM.dd.')}</PurchaseDate>
      </>
    </Container>
  );
};
