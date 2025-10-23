import React, { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import i18n from 'i18n-js';
import translate from 'google-translate-api-x';
import { getLocale } from '@core/translation-utils';
import { Icon } from '@components/shared';
import { Purchase } from '@model/domain';
import { useDarkMode } from '@hooks/useDarkMode';
import { theme } from '@styles/theme';
import {
  Amount,
  AmountAndDateContainer,
  CategoriesContainer,
  Category,
  Container,
  IconContainer,
  PurchaseDate,
  SecondaryCategory,
} from './PurchaseCard.styles';

type PurchaseCardProps = {
  purchase: Purchase;
  onPress: () => void;
};

const cardIcon = {
  food: <Icon type="hamburger" iconColor={theme.colors.white[100]} />,
  clothing: <Icon type="clothing" iconColor={theme.colors.white[100]} />,
  entertainment: <Icon type="entertainment" iconColor={theme.colors.white[100]} />,
  other: <Icon type="other-purchase" iconColor={theme.colors.white[100]} />,
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const PurchaseCard: FC<PurchaseCardProps> = ({ purchase, onPress }) => {
  const { isDarkMode } = useDarkMode();
  const locale = getLocale();
  const [translatedCategory, setTranslatedCategory] = useState(purchase.category);

  useEffect(() => {
    const translateCategory = async () => {
      const temporaryTranslatedCategory = (
        await translate(purchase.category, {
          to: locale === 'hun' ? 'hu' : 'en',
        })
      ).text;

      setTranslatedCategory(temporaryTranslatedCategory);
    };

    translateCategory();
  }, [locale, purchase.category]);

  return (
    <Container style={!isDarkMode && cardShadow} onPress={onPress} isDarkMode={isDarkMode}>
      <IconContainer style={cardShadow} isDarkMode={isDarkMode}>
        {cardIcon[purchase.category] ?? cardIcon.other}
      </IconContainer>

      <CategoriesContainer>
        <Category isDarkMode={isDarkMode}>
          {i18n.t(`Purchases.Categories.${purchase.category}`, {
            defaultValue: translatedCategory,
          })}
        </Category>
        {purchase?.secondaryCategory && (
          <SecondaryCategory>{purchase.secondaryCategory}</SecondaryCategory>
        )}
      </CategoriesContainer>

      <AmountAndDateContainer>
        <Amount>- {purchase.amount} Ft</Amount>
        <PurchaseDate>{format(purchase.createdAt.toDate(), 'yyyy.MM.dd.')}</PurchaseDate>
      </AmountAndDateContainer>
    </Container>
  );
};
