/* eslint-disable react-native/no-inline-styles */
import { theme } from '@styles/theme';
import React, { FC } from 'react';
import { formatAmount } from '@core/format-amount';
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
import { Icon, IconType } from '@components/shared';

type Props = {
  donutChartData: {
    label: string;
    value: number;
    percentage: number;
    color: string;
    icon?: string;
  };
  onPress?: () => void;
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

const PieChartPurchaseCard: FC<Props> = ({ donutChartData, onPress }) => {
  const { isDarkMode } = useDarkMode();
  const isWhiteCategoryColor =
    donutChartData.color === '#ffffff' || donutChartData.color === '#ffffffff';
  const icon = donutChartData?.icon
    ? (`${donutChartData?.icon}-small` as IconType)
    : 'other-purchase';

  return (
    <Container style={!isDarkMode && cardShadow} isDarkMode={isDarkMode} onPress={onPress}>
      <View
        style={{
          width: 40,
          height: 40,
          padding: 7,
          borderRadius: 100,
          backgroundColor: donutChartData.color,
          marginRight: 10,
          ...cardShadow,
        }}
      >
        <Icon
          style={{ marginLeft: 1.2 }}
          type={icon}
          iconColor={!isWhiteCategoryColor ? theme.colors.white[100] : theme.colors.black[100]}
        />
      </View>
      <CategoryContainer>
        <Category isDarkMode={isDarkMode}>{donutChartData.label}</Category>
        <Percentage>{donutChartData.percentage}%</Percentage>
      </CategoryContainer>
      <AmountContainer>
        <Amount>-{formatAmount(donutChartData.value)} Ft</Amount>
      </AmountContainer>
    </Container>
  );
};

export default PieChartPurchaseCard;
