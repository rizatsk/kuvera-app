import { Colors } from "@/constants/theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, GestureResponderEvent, LayoutChangeEvent, Modal, Text, TouchableOpacity, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { getStyle, modalStyles } from "./style";
import { TextInputProps } from "./type";

export const TextInput: React.FunctionComponent<TextInputProps> = (props) => {
  const {
    value,
    label,
    onBlur = () => null,
    onFocus = () => null,
    errorMessage,
    helperMessage,
    isError,
    counter = 0,
    inputIcon = null,
    onTouchStart,
    showSoftInputOnFocus = true,
    inputType = 'text',
    onChangeText,
    selectOptions,
    onSelect,
    ...rest
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const [focused, setFocused] = useState(false);

  const computedStyle = getStyle(props, focused);

  const animation = useRef(new Animated.Value(0));
  const scale = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const translateY = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const translateX = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, labelWidth * -0.1],
  });

  const animate = (toValue: 0 | 1) =>
    Animated.spring(animation.current, {
      useNativeDriver: true,
      toValue,
    }).start();

  useEffect(() => {
    if (focused || !!value) {
      animate(1);
    } else {
      animate(0);
    }
  }, [value, focused]);

  const handleOnFocus = () => {
    if (selectOptions && onSelect) {
      setIsModalVisible(true);
    } else {
      setFocused(true);
    }
  };
  const handleOnBlur = () => {
    setFocused(false);
  };

  const getLabelWidth = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setLabelWidth(width + 24);
  };

  const computedValue = useMemo(() => {
    if (inputType === 'date' && typeof value === 'object') {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      };

      const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(
        value
      );

      // Capitalize the first letter of the weekday and month for consistency with the example format.
      return formattedDate.replace(/(^\w{1})|(\s\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
    }
    return value;
  }, [value, inputType]);

  const handleOnTouchStart = (e: GestureResponderEvent) => {
    if (!selectOptions || !onSelect) onTouchStart?.(e);
  };

  const handleOnchangeText = (
    masked: string,
    unmasked: string,
    obfuscated: string
  ) => {
    if (unmasked.length <= counter) {
      onChangeText?.(masked, unmasked, obfuscated);
    } else {
      console.log("Batas input maksimum terlampaui!");
    }
  }

  const handleOptionSelect = (value: string) => {
    onSelect?.(value);
    setIsModalVisible(false);
    setFocused(false)
  };

  return (
    <View style={computedStyle.fieldWrapper}>
      <View style={computedStyle.fieldContainer}>
        {label && (
          <Animated.View
            style={[
              computedStyle.labelContainer,
              {
                transform: [{ scale }, { translateY }, { translateX }],
              },
            ]}
            onLayout={getLabelWidth}
            pointerEvents="none"
          >
            <Text style={computedStyle.label}>
              {label}
            </Text>
          </Animated.View>
        )}
        <View style={computedStyle.inputWrapper}>
          <MaskInput
            value={computedValue}
            style={[computedStyle.textField]}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholderTextColor={
              focused ? Colors.black[500] : 'transparent'
            }
            showSoftInputOnFocus={showSoftInputOnFocus}
            onTouchStart={handleOnTouchStart}
            onChangeText={handleOnchangeText}
            {...rest}
          />
          {counter > 0 && (
            <Text style={computedStyle.counter}>
              {`${computedValue?.length}/${counter}`}
            </Text>
          )}
        </View>
      </View>
      {errorMessage && (
        <Text style={computedStyle.messageHelper}>
          {errorMessage}
        </Text>
      )}

      {/* Modal Pop up */}
      {selectOptions && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalTitle}>Pilih {label}</Text>

              {selectOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={modalStyles.optionButton}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={modalStyles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={modalStyles.closeText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}