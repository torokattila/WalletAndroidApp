/* eslint-disable react-native/no-inline-styles */
import { ModalBackground } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-detect';
import type { ColorFormatsObject } from 'reanimated-color-picker';
import i18n from 'i18n-js';
import ColorPicker, { HueSlider, OpacitySlider, Panel1, Swatches } from 'reanimated-color-picker';
import { buttonShadow, shadow } from '../CategoryModal';
import { UpperLine } from '../CategoryModal/CategoryModal.styles';
import { ContentContainer, StyledButton, SwatchesContainer } from './CategoryColorPickerStyle';
import { colorPickerStyle } from './colorPickerStyle';
import Divider from './components/Divider';

type CategoryColorPickerProps = {
  isVisible: boolean;
  onClose: () => void;
  pickColor: (color: string) => void;
  existingColor: string;
};

const customSwatches = [
  '#fff',
  '#000000',
  '#ff0000',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#1dc3fa',
  '#808080',
  '#964B00',
  '#A020F0',
  '#fd7289',
  '#FFA500',
];

export const CategoryColorPicker: FC<CategoryColorPickerProps> = ({
  isVisible,
  onClose,
  pickColor,
  existingColor,
}) => {
  const { isDarkMode } = useDarkMode();
  const [resultColor, setResultColor] = useState(existingColor);
  const currentColor = useSharedValue(existingColor);

  const onColorChange = (color: ColorFormatsObject) => {
    'worklet';
    currentColor.value = color.hex;
  };

  const onColorPick = (color: ColorFormatsObject) => {
    setResultColor(color.hex);
    pickColor(color.hex);
  };

  useEffect(() => {
    if (existingColor) {
      setResultColor(existingColor);
      currentColor.value = existingColor;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingColor]);

  return (
    <>
      <GestureRecognizer onSwipeDown={onClose}>
        <Modal
          animationType="slide"
          transparent
          visible={isVisible}
          onRequestClose={onClose}
          animated
        >
          <ModalBackground onHide={onClose} isVisible={isVisible} />
          <ContentContainer style={shadow} isDarkMode={isDarkMode}>
            <UpperLine />
            <ColorPicker
              value={resultColor}
              sliderThickness={25}
              thumbSize={24}
              thumbShape="circle"
              onChange={onColorChange}
              onCompleteJS={onColorPick}
              style={{ ...colorPickerStyle.picker, marginTop: '7%' }}
              boundedThumb
            >
              <Panel1 style={colorPickerStyle.panelStyle} />
              <HueSlider style={colorPickerStyle.sliderStyle} />
              <OpacitySlider style={colorPickerStyle.sliderStyle} />

              <Divider />
              <SwatchesContainer>
                <Swatches
                  style={colorPickerStyle.swatchesContainer}
                  swatchStyle={colorPickerStyle.swatchStyle}
                  colors={customSwatches}
                />
              </SwatchesContainer>
            </ColorPicker>

            <StyledButton
              size="large"
              onPress={onClose}
              style={!isDarkMode && buttonShadow}
              text={i18n.t('SaveButtonTitle')}
            />
          </ContentContainer>
        </Modal>
      </GestureRecognizer>
    </>
  );
};
