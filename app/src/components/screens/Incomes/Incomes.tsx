/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react';
import i18n from 'i18n-js';
import { FlatList } from 'react-native';
import { AddButton, Icon } from '@components/shared';
import { useUser } from '@hooks/useUser';
import { useIncome } from '@hooks/useIncome';
import { Income } from '@model/domain';
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
} from './Incomes.styles';
import { IncomeModal } from './IncomeModal';
import { IncomeCard } from './IncomeCard';

export const Incomes: FC = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { incomes } = useIncome();
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);

  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedIncome(null);
    setIsModalOpen(false);
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
