import React, { FC } from 'react';
import { Text } from 'react-native';
import { Income } from '@model/domain';
import { Container } from './IncomeCard.styles';

type IncomeCardProps = {
  income: Income;
};

export const IncomeCard: FC<IncomeCardProps> = ({ income }) => {
  return (
    <Container>
      <Text>{income.amount}</Text>
    </Container>
  );
};
