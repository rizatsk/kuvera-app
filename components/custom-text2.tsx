import React from 'react';
import { Text, TextStyle } from 'react-native';

type NumericFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950 | 1000;

const FONT_MAPPING = {
  100: 'Nunito-ExtraLight',
  200: 'Nunito-ExtraLight',
  300: 'Nunito-Light',
  400: 'Nunito-Reguler',
  500: 'Nunito-Medium',
  600: 'Nunito-SemiBold',
  700: 'Nunito-Bold',
  800: 'Nunito-ExtraBold',
  900: 'Nunito-Black',
  950: 'Nunito-Black',
  1000: 'Nunito-Black',
} as const;

const getFontFamilyByWeight = (weight: NumericFontWeight): string => {
  return FONT_MAPPING[weight] || 'Nunito-Reguler';
};

type CustomTextProps = {
  style?: TextStyle;
  children: React.ReactNode;
}

export default function CustomText({
  style,
  children,
  ...rest
}: CustomTextProps): React.JSX.Element {
  const fontFamilyName = getFontFamilyByWeight(style?.fontWeight as NumericFontWeight);

  return (
    <Text
      style={[
        style,
        {
          fontFamily: fontFamilyName,
        }
      ]}
    >
      {children}
    </Text>
  );
};
