import React, { FC } from 'react';
import { format } from 'date-fns';
import { Income } from '@model/domain';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import { formatAmount } from '@core/format-amount';
import {
  Amount,
  AmountAndDateContainer,
  Container,
  IconContainer,
  IncomeDate,
  Title,
  TitleAndAmountContainer,
} from './IncomeCard.styles';

type IncomeCardProps = {
  income: Income;
  onPress: () => void;
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const IncomeCard: FC<IncomeCardProps> = ({ income, onPress }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Container style={!isDarkMode && cardShadow} onPress={onPress} isDarkMode={isDarkMode}>
      <IconContainer style={cardShadow} isDarkMode={isDarkMode}>
        <Icon type="dollar" iconColor={theme.colors.white[100]} />
      </IconContainer>

      <TitleAndAmountContainer>
        {income.title && <Title>{income.title}</Title>}
      </TitleAndAmountContainer>

      <AmountAndDateContainer>
        <Amount>+ {formatAmount(income.amount)} Ft</Amount>
        <IncomeDate>{format(income.updatedAt.toDate(), 'yyyy.MM.dd.')}</IncomeDate>
      </AmountAndDateContainer>
    </Container>
  );
};
