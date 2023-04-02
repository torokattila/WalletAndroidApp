import React, { FC, useState } from 'react';
import i18n from 'i18n-js';
import { FlatList } from 'react-native';
import { AddButton, Icon } from '@components/shared';
import { useUser } from '@hooks/useUser';
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
import { useIncome } from '@hooks/useIncome';
import { IncomeCard } from './IncomeCard';

export const Incomes: FC = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { incomes } = useIncome();

  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => setIsModalOpen(false);

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
                data={incomes}
                keyExtractor={(item) => item.id}
                scrollEnabled
                renderItem={({ item }) => <IncomeCard key={item.id} income={item} />}
              />
            </ListContainer>
            <AddButton onPress={handleModalOpen} />
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
      <IncomeModal isVisible={isModalOpen} onClose={handleModalClose} onSave={() => {}} />
    </>
  );
};
