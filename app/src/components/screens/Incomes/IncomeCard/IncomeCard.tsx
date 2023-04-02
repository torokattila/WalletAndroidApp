import React, { FC } from 'react';
import { Income } from '@model/domain';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import {
  Amount,
  Container,
  IconContainer,
  IncomeDate,
  Title,
  TitleAndAmountContainer,
} from './IncomeCard.styles';
import { format } from 'date-fns';

type IncomeCardProps = {
  income: Income;
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const IncomeCard: FC<IncomeCardProps> = ({ income }) => {
  return (
    <Container style={cardShadow}>
      <IconContainer>
        <Icon type="dollar" iconColor={theme.colors.white} />
      </IconContainer>

      <TitleAndAmountContainer>
        {income.title && <Title>{income.title}</Title>}
        <Amount>+ {income.amount} Ft</Amount>
      </TitleAndAmountContainer>

      <IncomeDate>{format(income.updatedAt.toDate(), 'yyyy-MM.dd.')}</IncomeDate>
    </Container>
  );
};
