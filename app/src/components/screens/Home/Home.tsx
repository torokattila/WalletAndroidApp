/* eslint-disable react-native/no-inline-styles */
import React, { FC, useMemo } from 'react';
import i18n from 'i18n-js';
import { Dimensions, FlatList } from 'react-native';
import { useUser } from '@hooks/useUser';
import { getLocalizedName } from '@core/name';
import { CreditCard } from '@components/CreditCard';
import { usePurchase } from '@hooks/usePurchase';
import {
  Container,
  ContentContainer,
  LastFivePurchasesContainer,
  LastFivePurchasesTitle,
  ListContainer,
  scrollViewStyle,
  StyledLinearGradient,
  WelcomeText,
} from './Home.styles';
import { HomeScreenPurchaseCard } from './HomeScreenPurchaseCard';
import { PurchaseModal } from '../Purchases/PurchaseModal';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 150;
const INTERVAL = CARD_WIDTH + 10;

export const Home: FC = () => {
  const { user } = useUser();
  const localizedName = getLocalizedName(user?.lastname, user?.firstname);
  const {
    purchases,
    handleEditModalOpen,
    isModalOpen,
    handleModalClose,
    isEditModeModal,
    selectedPurchase,
  } = usePurchase();
  const lastFivePurchases = useMemo(() => {
    return purchases.slice(0, 5);
  }, [purchases]);

  return (
    <>
      <Container contentContainerStyle={scrollViewStyle}>
        <StyledLinearGradient
          colors={['#2C1F5F', '#4c397a', '#9068ee', '#b296f1', '#ffffff', '#3f087a57']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <WelcomeText>Hello {user?.firstname}!</WelcomeText>

          <ContentContainer>
            <CreditCard name={localizedName} balance={user?.balance} />

            <LastFivePurchasesContainer>
              <LastFivePurchasesTitle>
                {i18n.t('Home.LastFivePurchasesTitle')}
              </LastFivePurchasesTitle>

              <ListContainer>
                <FlatList
                  contentContainerStyle={{ paddingRight: 20, paddingLeft: 15, paddingBottom: 40 }}
                  showsHorizontalScrollIndicator={false}
                  data={lastFivePurchases}
                  keyExtractor={(item) => item.id}
                  scrollEnabled
                  snapToInterval={INTERVAL}
                  horizontal
                  pagingEnabled
                  decelerationRate="fast"
                  renderItem={({ item }) => (
                    <HomeScreenPurchaseCard
                      purchase={item}
                      onPress={() => handleEditModalOpen(item)}
                    />
                  )}
                />
              </ListContainer>
            </LastFivePurchasesContainer>
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
      <PurchaseModal
        isVisible={isModalOpen}
        onClose={handleModalClose}
        isEditMode={isEditModeModal}
        purchase={selectedPurchase}
      />
    </>
  );
};
