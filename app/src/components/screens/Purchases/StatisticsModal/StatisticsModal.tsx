import { ModalBackground } from '@components/shared';
import { formatAmount } from '@core/format-amount';
import { useDarkMode } from '@hooks/useDarkMode';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC, useMemo } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import GestureRecognizer from 'react-native-swipe-detect';
import {
  ChartSubTitle,
  ChartTitle,
  ContentContainer,
  LoaderWrapper,
  TooltipAmountText,
  TooltipBox,
  TooltipMonthLabel,
  UpperLine,
} from './StatisticsModal.styles';

type StatisticsModalProps = {
  onClose: () => void;
  isOpen: boolean;
  monthlyData: { month: string; value: number }[];
  isLoadingStatistics: boolean;
};

const shadow = {
  elevation: 8,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -8, height: 20 },
  shadowOpacity: 0.6,
  shadowRadius: 35,
};

const formatYAxisLabel = (label: string): string => {
  const num = Number(label);
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${Math.round(num / 1_000)}k`;
  }
  return `${num}`;
};

const yAxisTextStyleDark = {
  color: 'rgba(255,255,255,0.45)',
  fontSize: 11,
  fontFamily: 'NunitoSans-Regular',
};

const yAxisTextStyleLight = {
  color: 'rgba(0,0,0,0.4)',
  fontSize: 10,
  fontFamily: 'NunitoSans-Regular',
};

const xAxisLabelTextStyleDark = {
  color: 'rgba(255,255,255,0.45)',
  fontSize: 11,
  fontFamily: 'NunitoSans-Regular',
};

const xAxisLabelTextStyleLight = {
  color: 'rgba(0,0,0,0.4)',
  fontSize: 11,
  fontFamily: 'NunitoSans-Regular',
};

type PointerItem = { label: string; value: number };

const YAXIS_LABEL_WIDTH = 44;
const INITIAL_SPACING = 15;
const END_SPACING = 5;

const makePointerLabel = (isDarkMode: boolean) => (items: PointerItem[]) =>
  (
    <TooltipBox isDarkMode={isDarkMode} style={shadow}>
      <TooltipMonthLabel isDarkMode={isDarkMode}>{items[0]?.label ?? ''}</TooltipMonthLabel>
      <TooltipAmountText>{formatAmount(items[0]?.value ?? 0)} Ft</TooltipAmountText>
    </TooltipBox>
  );

export const StatisticsModal: FC<StatisticsModalProps> = ({
  onClose,
  isOpen,
  monthlyData,
  isLoadingStatistics,
}) => {
  const { isDarkMode } = useDarkMode();
  const { width: screenWidth } = useWindowDimensions();

  const chartData = useMemo(
    () => monthlyData.map(({ month, value }) => ({ label: month, value })),
    [monthlyData]
  );

  const chartMaxValue = useMemo(() => {
    const rawMax = chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0;
    return rawMax > 0 ? Math.ceil(rawMax / 100_000) * 100_000 : 1_000_000;
  }, [chartData]);

  const { chartWidth, dynamicSpacing } = useMemo(() => {
    const nGaps = Math.max(chartData.length - 1, 1);
    const width = screenWidth - 40 - YAXIS_LABEL_WIDTH;
    const spacing = Math.floor((width - INITIAL_SPACING - END_SPACING) / nGaps);
    return { chartWidth: width, dynamicSpacing: spacing };
  }, [screenWidth, chartData.length]);

  // eslint-disable-next-line curly
  if (!isOpen) return null;

  return (
    <>
      <GestureRecognizer onSwipeDown={onClose}>
        <Modal visible={isOpen} onRequestClose={onClose} animationType="slide" transparent>
          <ModalBackground onHide={onClose} isVisible={isOpen} />
          <ContentContainer style={shadow} isDarkMode={isDarkMode}>
            <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="position" enabled>
              <UpperLine isDarkMode={isDarkMode} />
              <ChartTitle isDarkMode={isDarkMode}>{i18n.t('Purchases.StatisticsTitle')}</ChartTitle>
              <ChartSubTitle isDarkMode={isDarkMode}>
                {i18n.t('Purchases.StatisticsSubTitle')}
              </ChartSubTitle>
              {isLoadingStatistics ? (
                <LoaderWrapper>
                  <ActivityIndicator color={theme.colors.magenta[100]} size="large" />
                </LoaderWrapper>
              ) : (
                <LineChart
                  isAnimated
                  areaChart
                  curved
                  width={chartWidth}
                  yAxisLabelWidth={YAXIS_LABEL_WIDTH}
                  spacing={dynamicSpacing}
                  initialSpacing={INITIAL_SPACING}
                  endSpacing={END_SPACING}
                  startFillColor={theme.colors.magenta[100]}
                  endFillColor={isDarkMode ? theme.colors.grey[800] : theme.colors.white[100]}
                  startOpacity={0.45}
                  endOpacity={0.02}
                  thickness={3}
                  noOfSections={4}
                  animateOnDataChange
                  animationDuration={1600}
                  xAxisThickness={0}
                  yAxisThickness={0}
                  rulesColor={isDarkMode ? theme.colors.grey[950] : theme.colors.grey[100]}
                  rulesType="dashed"
                  color={theme.colors.magenta[100]}
                  dataPointsColor="transparent"
                  dataPointsRadius={0}
                  yAxisTextStyle={isDarkMode ? yAxisTextStyleDark : yAxisTextStyleLight}
                  xAxisLabelTextStyle={
                    isDarkMode ? xAxisLabelTextStyleDark : xAxisLabelTextStyleLight
                  }
                  formatYLabel={formatYAxisLabel}
                  maxValue={chartMaxValue}
                  data={chartData}
                  pointerConfig={{
                    pointer1Color: theme.colors.magenta[100],
                    pointerStripUptoDataPoint: true,
                    pointerStripColor: 'rgba(232, 67, 147, 0.35)',
                    pointerStripWidth: 2,
                    strokeDashArray: [4, 4],
                    pointerLabelWidth: 140,
                    pointerLabelHeight: 64,
                    activatePointersOnLongPress: false,
                    autoAdjustPointerLabelPosition: true,
                    radius: 6,
                    pointerLabelComponent: makePointerLabel(isDarkMode),
                  }}
                />
              )}
            </KeyboardAvoidingView>
          </ContentContainer>
        </Modal>
      </GestureRecognizer>
    </>
  );
};
