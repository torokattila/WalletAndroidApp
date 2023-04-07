/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react';
import i18n from 'i18n-js';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import { AddButton, Icon } from '@components/shared';
import { useUser } from '@hooks/useUser';
import { useIncome } from '@hooks/useIncome';
import { Income } from '@model/domain';
import { theme } from '@styles/theme';
import {
  BalanceContainer,
  BalanceTitle,
  Balance,
  Container,
  ContentContainer,
  ScreenTitleContainer,
  ScreenTitleText,
  scrollViewStyle,
  StyledLinearGradient,
  AllIncomeTitle,
  ListContainer,
  DatePickerContainer,
  DatePickerButton,
  DatePickerText,
  DatePickerButtonContainer,
  DatePickerButtonLabel,
  DeleteFiltersButton,
} from './Incomes.styles';
import { IncomeModal } from './IncomeModal';
import { IncomeCard } from './IncomeCard';

const shadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Incomes: FC = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    incomes,
    isFromDatePickerOpen,
    handleFromDatePickerOpen,
    handleFromDatePickerClose,
    fromDate,
    setFromDate,
    isToDatePickerOpen,
    handleToDatePickerOpen,
    handleToDatePickerClose,
    toDate,
    setToDate,
  } = useIncome();
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);

  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedIncome(null);
    setIsModalOpen(false);
    setIsEditModeModal(false);
  };

  const handleEditModalOpen = (income: Income) => {
    handleModalOpen();
    setSelectedIncome(income);
    setIsEditModeModal(true);
  };

  return (
    <>
      <Container contentContainerStyle={scrollViewStyle}>
        <StyledLinearGradient
          colors={['#4547B8', '#8E65F7']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Incomes.ScreenTitle')}</ScreenTitleText>
            <Icon type="income" iconColor="#fff" />
          </ScreenTitleContainer>

          <BalanceContainer>
            <BalanceTitle>{i18n.t('BalanceTitle')}</BalanceTitle>
            <Balance>{user.balance} Ft</Balance>
          </BalanceContainer>
          <ContentContainer>
            <AllIncomeTitle>{i18n.t('Incomes.AllIncomeTitle')}</AllIncomeTitle>

            <DatePickerContainer>
              <DatePickerButtonContainer>
                <DatePickerButtonLabel>
                  {i18n.t('DatePicker.FilterFromDateText')}
                </DatePickerButtonLabel>
                <DatePickerButton style={shadow} onPress={handleFromDatePickerOpen}>
                  <DatePickerText>{format(fromDate, 'yyyy-MM.dd.')}</DatePickerText>
                </DatePickerButton>
              </DatePickerButtonContainer>

              <DatePickerButtonContainer>
                <DatePickerButtonLabel>
                  {i18n.t('DatePicker.FilterToDateText')}
                </DatePickerButtonLabel>
                <DatePickerButton style={shadow} onPress={handleToDatePickerOpen}>
                  <DatePickerText>{format(toDate, 'yyyy-MM.dd.')}</DatePickerText>
                </DatePickerButton>
              </DatePickerButtonContainer>

              <DeleteFiltersButton>
                <Icon type="delete-filters" iconColor={theme.colors.purple[100]} />
              </DeleteFiltersButton>
            </DatePickerContainer>

            <DatePicker
              modal
              mode="date"
              title={null}
              open={isFromDatePickerOpen}
              date={fromDate}
              androidVariant="iosClone"
              onConfirm={(date) => {
                handleFromDatePickerClose();
                setFromDate(date);
              }}
              onCancel={handleFromDatePickerClose}
              cancelText={i18n.t('DatePicker.CancelButtonText')}
              confirmText={i18n.t('DatePicker.ConfirmButtonText')}
            />
            <DatePicker
              modal
              mode="date"
              title={null}
              open={isToDatePickerOpen}
              date={toDate}
              androidVariant="iosClone"
              onConfirm={(date) => {
                handleToDatePickerClose();
                setToDate(date);
              }}
              onCancel={handleToDatePickerClose}
              cancelText={i18n.t('DatePicker.CancelButtonText')}
              confirmText={i18n.t('DatePicker.ConfirmButtonText')}
            />

            <ListContainer>
              <FlatList
                contentContainerStyle={{ paddingBottom: 40 }}
                style={{ paddingHorizontal: 10, marginTop: -15 }}
                showsVerticalScrollIndicator={false}
                data={incomes}
                keyExtractor={(item) => item.id}
                scrollEnabled
                renderItem={({ item }) => (
                  <IncomeCard
                    key={item.id}
                    income={item}
                    onPress={() => handleEditModalOpen(item)}
                  />
                )}
              />
            </ListContainer>
            <AddButton onPress={handleModalOpen} />
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
      <IncomeModal
        isVisible={isModalOpen}
        onClose={handleModalClose}
        income={selectedIncome}
        isEditMode={isEditModeModal}
      />
    </>
  );
};
