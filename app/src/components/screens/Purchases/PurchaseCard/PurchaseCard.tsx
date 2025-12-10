import { Icon, IconType } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import { format } from 'date-fns';
import i18n from 'i18n-js';
import React, { FC } from 'react';
import { formatAmount } from '@core/format-amount';
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

  const categoryIcon = purchase?.categoryObject?.icon ? (
    <Icon
      type={`${(purchase.categoryObject.icon + '-small') as IconType}`}
      iconColor={theme.colors.white[100]}
    />
  ) : (
    cardIcon[typeof purchase.category === 'string' ? purchase.category : purchase.category.title] ??
    cardIcon.other
  );

  return (
    <Container style={!isDarkMode && cardShadow} onPress={onPress} isDarkMode={isDarkMode}>
      <IconContainer
        style={cardShadow}
        isDarkMode={isDarkMode}
        categoryColor={purchase.categoryObject?.color}
      >
        {categoryIcon}
      </IconContainer>

      <CategoriesContainer>
        <Category isDarkMode={isDarkMode}>
          {i18n.t(`Purchases.Categories.${purchase.category}`, {
            defaultValue: purchase.category,
          })}
        </Category>
        {purchase?.secondaryCategory && (
          <SecondaryCategory>{purchase.secondaryCategory}</SecondaryCategory>
        )}
      </CategoriesContainer>

      <AmountAndDateContainer>
        <Amount>- {formatAmount(purchase.amount)} Ft</Amount>
        <PurchaseDate>{format(purchase.createdAt.toDate(), 'yyyy.MM.dd.')}</PurchaseDate>
      </AmountAndDateContainer>
    </Container>
  );
};
