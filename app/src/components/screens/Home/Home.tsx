/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useMemo } from 'react';
import i18n from 'i18n-js';
import { Dimensions, FlatList, RefreshControl } from 'react-native';
import { CreditCard } from '@components/CreditCard';
import { usePurchase } from '@hooks/usePurchase';
import { useHome } from '@hooks/useHome';
import { theme } from '@styles/theme';
import { PurchaseModal } from '../Purchases/PurchaseModal';
import {
  Container,
  ContentContainer,
  LastFivePurchasesContainer,
  LastFivePurchasesTitle,
  ListContainer,
  NoLastFivePurchasesText,
  NoLastFivePurchasesContainer,
  scrollViewStyle,
  StyledLinearGradient,
  WelcomeText,
  RedirectToPurchasesButton,
} from './Home.styles';
import { HomeScreenPurchaseCard } from './HomeScreenPurchaseCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 150;
const INTERVAL = CARD_WIDTH + 10;

const buttonShadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Home: FC = () => {
  const { screenRefreshing, setScreenRefreshing } = useHome();
  const {
    purchases,
    handleEditModalOpen,
    isModalOpen,
    handleModalClose,
    isEditModeModal,
    selectedPurchase,
    retry: reloadPurchases,
    isLoading,
  } = usePurchase();
  const { user, localizedName, navigation } = useHome();
  const lastFivePurchases = useMemo(() => {
    return purchases.slice(0, 5);
  }, [purchases]);

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);

    await reloadPurchases();
  };

  useEffect(() => {
    if (!isLoading && screenRefreshing) {
      setScreenRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, purchases, screenRefreshing]);

  return (
    <>
      <Container
        overScrollMode="never"
        contentContainerStyle={scrollViewStyle}
        refreshControl={
          <RefreshControl refreshing={screenRefreshing} onRefresh={handlePullToRefresh} />
        }
      >
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

              {lastFivePurchases.length > 0 && (
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
              )}
            </LastFivePurchasesContainer>

            {!lastFivePurchases.length && (
              <NoLastFivePurchasesContainer>
                <NoLastFivePurchasesText>{i18n.t('NoPurchasesText')}</NoLastFivePurchasesText>
                <RedirectToPurchasesButton
                  style={buttonShadow}
                  onPress={() => navigation.navigate('Purchases')}
                  text={i18n.t('Home.RedirectToPurchasesButtonText')}
                  size="small"
                />
              </NoLastFivePurchasesContainer>
            )}
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
