/* eslint-disable react-native/no-inline-styles */
import { theme } from '@styles/theme';
import React, { FC } from 'react';
import { View } from 'react-native';
import {
  Amount,
  AmountContainer,
  Category,
  CategoryContainer,
  Container,
  Percentage,
} from './PieChartPurchaseCard.styles';
import { useDarkMode } from '@hooks/useDarkMode';

type Props = {
  donutChartData: {
    label: string;
    value: number;
    percentage: number;
    color: string;
  };
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

const PieChartPurchaseCard: FC<Props> = ({ donutChartData }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Container style={!isDarkMode && cardShadow} isDarkMode={isDarkMode}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
          backgroundColor: donutChartData.color,
          marginRight: 10,
        }}
      />
      <CategoryContainer>
        <Category isDarkMode={isDarkMode}>{donutChartData.label}</Category>
        <Percentage>{donutChartData.percentage}%</Percentage>
      </CategoryContainer>
      <AmountContainer>
        <Amount>-{donutChartData.value} Ft</Amount>
      </AmountContainer>
    </Container>
  );
};

export default PieChartPurchaseCard;
