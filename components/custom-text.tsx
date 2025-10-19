import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface CustomTextProps extends TextProps {
  style?: TextStyle;
  children: React.ReactNode;
}

export default function CustomText({
    style,
    children,
    ...rest
}: CustomTextProps): React.JSX.Element {
  return (
    <Text 
        style={[styles.base, style]} 
        {...rest}
    >
        {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Roboto-Flex',
  },
});