import { Icon } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import { Category } from '@model/domain';
import { theme } from '@styles/theme';
import React, { FC } from 'react';
import { Container, IconContainer, Title, TitleAndAmountContainer } from './CategoryCard.styles';
import { ExtendedCategory } from '@model/domain/constants/categories';

type CategoryCardProps = {
  category: Category | ExtendedCategory;
  onPress: () => void;
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const CategoryCard: FC<CategoryCardProps> = ({ category, onPress }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Container style={!isDarkMode && cardShadow} onPress={onPress} isDarkMode={isDarkMode}>
      <IconContainer style={cardShadow} isDarkMode={isDarkMode} color={category.color}>
        <Icon type="category" iconColor={theme.colors.white[100]} />
      </IconContainer>

      <TitleAndAmountContainer>
        {category.title && <Title>{category.title}</Title>}
      </TitleAndAmountContainer>
    </Container>
  );
};
