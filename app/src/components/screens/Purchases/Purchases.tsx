/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import i18n from 'i18n-js';
import { theme } from '@styles/theme';
import { formatDate } from '@core/date-utils';
import { AddButton, Icon } from '@components/shared';
import { usePurchase } from '@hooks/usePurchase';
import {
  AllPurchasesTitle,
  Container,
  ContentContainer,
  DatePickerButton,
  DatePickerButtonContainer,
  DatePickerButtonLabel,
  DatePickerText,
  DeleteFiltersButton,
  DownloadButton,
  FiltersContainer,
  ListContainer,
  PurchasesThisMonth,
  PurchasesThisMonthContainer,
  PurchasesThisMonthTitle,
  ScreenTitleContainer,
  ScreenTitleText,
  StyledLinearGradient,
} from './Purchases.styles';
import { PurchaseModal } from './PurchaseModal';
import { FlatList } from 'react-native';

const shadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Purchases: FC = () => {
  const {
    handleModalOpen,
    handleModalClose,
    isModalOpen,
    isEditModeModal,
    selectedPurchase,
    purchases,
  } = usePurchase();

  return (
    <>
      <Container>
        <StyledLinearGradient
          colors={['#8E65F7', '#4547B8']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Purchases.ScreenTitle')}</ScreenTitleText>
            <Icon type="purchase" iconColor="#fff" />
          </ScreenTitleContainer>

          <PurchasesThisMonthContainer>
            <PurchasesThisMonthTitle>
              {i18n.t('Purchases.PurchasesThisMonthTitle')}
            </PurchasesThisMonthTitle>
            <PurchasesThisMonth>0 Ft</PurchasesThisMonth>
          </PurchasesThisMonthContainer>

          <ContentContainer>
            <AllPurchasesTitle>{i18n.t('Purchases.AllPurchasesTitle')}</AllPurchasesTitle>

            <FiltersContainer>
              <DatePickerButtonContainer>
                <DatePickerButtonLabel>
                  {i18n.t('DatePicker.FilterFromDateText')}
                </DatePickerButtonLabel>
                <DatePickerButton style={shadow} onPress={() => {}}>
                  <DatePickerText>{formatDate(new Date())}</DatePickerText>
                </DatePickerButton>
              </DatePickerButtonContainer>

              <DatePickerButtonContainer>
                <DatePickerButtonLabel>
                  {i18n.t('DatePicker.FilterToDateText')}
                </DatePickerButtonLabel>
                <DatePickerButton style={shadow} onPress={() => {}}>
                  <DatePickerText>{formatDate(new Date())}</DatePickerText>
                </DatePickerButton>
              </DatePickerButtonContainer>

              {/* {isFilterChanged && ( */}
              <>
                <DeleteFiltersButton onPress={() => {}}>
                  <Icon type="delete-filters" iconColor={theme.colors.purple[100]} />
                </DeleteFiltersButton>
              </>
              {/* )} */}
              <DownloadButton onPress={() => {}}>
                <Icon type="download" iconColor={theme.colors.purple[100]} />
              </DownloadButton>
            </FiltersContainer>

            <ListContainer>
              {/* <FlatList
                contentContainerStyle={{ paddingBottom: 40 }}
                style={{
                  paddingHorizontal: 10,
                  marginTop: -15,
                }}
                showsVerticalScrollIndicator={false}
                data={purchases}
                keyExtractor={(item) => item.id}
                scrollEnabled
                renderItem={({item}) => (

                )}
              /> */}
            </ListContainer>
            <AddButton onPress={handleModalOpen} />
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
