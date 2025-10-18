import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { getStyle } from '../text-input/style';
import { modalStyles } from './style';
import { RadioInputProps } from './type';

// Animasi for Modal
const { height } = Dimensions.get('window');

// Tentukan posisi awal (di luar layar)
const START_POSITION = height;
const END_POSITION = 0;
const RadioInput: React.FunctionComponent<RadioInputProps> = (props) => {
    const {
        value,
        label,
        errorMessage,
        helperMessage,
        isError,
        selectOptions,
        onSelect,
        ...rest
    } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [labelWidth, setLabelWidth] = useState(0);
    const [focused, setFocused] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

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

    // Inisialisasi Animated Value
    const slideAnim = useRef(new Animated.Value(START_POSITION));

    const handleOnFocus = () => {
        setIsModalVisible(true);
        Animated.timing(slideAnim.current, {
            toValue: END_POSITION,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    
    const getLabelWidth = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setLabelWidth(width + 24);
    };

    const computedValue = useMemo(() => {
        return value;
    }, [value]);

    const handleSubmit = () => {
        onSelect?.(selectedValue);
        onClose();
    };

    const animatedStyle = {
        transform: [{
            translateY: slideAnim.current
        }],
    };

    const onClose = () => {
        Animated.timing(slideAnim.current, {
            toValue: START_POSITION,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            slideAnim.current.setValue(START_POSITION);
        });
        setIsModalVisible(false);
        setFocused(false);
    }

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
                <Pressable onPress={() => handleOnFocus()} style={computedStyle.inputWrapper} >
                    <Text style={computedStyle.textField}>{computedValue}</Text>
                </Pressable>
            </View>
            {errorMessage && (
                <Text style={computedStyle.messageHelper}>
                    {errorMessage}
                </Text>
            )}

            <Modal
                animationType="none"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={onClose}
            >
                <TouchableOpacity
                    style={modalStyles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                >
                    <Animated.View
                        style={[modalStyles.modalContent, animatedStyle]}
                        onStartShouldSetResponder={() => true}
                    >

                        {/* Header */}
                        <View style={modalStyles.header}>
                            <Text style={modalStyles.title}>{label}</Text>
                            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {/* Daftar Opsi Radio */}
                        <View style={modalStyles.optionsContainer}>
                            {selectOptions.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={modalStyles.optionItem}
                                    onPress={() => setSelectedValue(option)}
                                >
                                    <Text style={modalStyles.optionLabel}>{option}</Text>

                                    {/* Ikon Radio Button (Checked/Unchecked) */}
                                    <Ionicons
                                        name={selectedValue === option ? "radio-button-on" : "radio-button-off"}
                                        size={22}
                                        color={selectedValue === option ? Colors.tealKuvera : "#ccc"}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={modalStyles.buttonSave} onPress={() => handleSubmit()}>
                            <Text style={{color: "white", fontSize: 15, fontWeight: '500'}}>Simpan</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default RadioInput;
