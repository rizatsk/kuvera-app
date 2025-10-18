import ModalKuvera from '@/components/modal-bottom';
import { formatDateTimeVerbose } from '@/helper/validation/formate-date-time';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { getStyle } from '../text-input/style';
import { modalStyles } from './style';
import { CalenderInputProps } from './type';

const DateTimeInput: React.FunctionComponent<CalenderInputProps> = (props) => {
    const {
        value,
        label,
        errorMessage,
        helperMessage,
        isError,
        onSelectDate,
        ...rest
    } = props;

    const initialDate = new Date();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [labelWidth, setLabelWidth] = useState(0);
    const [focused, setFocused] = useState(false);
    const [date, setDate] = useState(initialDate);
    const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
    const [mode, setMode] = useState<'date' | 'time'>('date');

    // For Input Field
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

    const getLabelWidth = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setLabelWidth(width + 24);
    };

    const computedValue = useMemo(() => {
        return value;
    }, [value]);
    // End For Input Field

    // For Modal
    const handleOnFocus = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (valueDate = date) => {
        onSelectDate?.(`${formatDateTimeVerbose(valueDate)}`);
        onClose();
    };

    const onClose = () => {
        setIsModalVisible(false);
        setFocused(false);
    }
    // End For Modal

    // For date time picker
    useEffect(() => {
        if (Platform.OS === 'android') {
            setMode('date');
        }
    }, []);


    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android' && event.type === 'dismissed') {
            setShowPicker(false)
            return;
        }

        const currentDate = selectedDate || date;
        setDate(currentDate);

        if (Platform.OS === 'android') {
            setShowPicker(false);
            if (mode === 'date') {
                setMode('time');
                setShowPicker(true);
            }
        }
    };

    const formattedDate = date.toLocaleDateString(undefined, {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
        hour: '2-digit', minute: '2-digit'
    });

    const showAndroidPicker = (currentMode: 'date' | 'time') => {
        setMode(currentMode);
        setShowPicker(true);
    };

    const renderPicker = () => {
        return <>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    locale="id-ID"
                />
            )}
        </>
    };

    const renderModalContent = () => (
        <>
            <View style={modalStyles.tabContainer}>
                <TouchableOpacity
                    onPress={() => Platform.OS === 'android' ? showAndroidPicker('date') : setMode('date')}
                    style={[modalStyles.tab, mode === 'date' && modalStyles.activeTab]}
                >
                    <Text style={mode === 'date' && modalStyles.activeText}>{formattedDate}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Platform.OS === 'android' ? showAndroidPicker('time') : setMode('time')}
                    style={[modalStyles.tab, mode === 'time' && modalStyles.activeTab]}
                >
                    <Text style={mode === 'time' && modalStyles.activeText}>{formattedTime}</Text>
                </TouchableOpacity>
            </View>

            {renderPicker()}
        </>
    );
    // End for date time picker

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


            <ModalKuvera
                title={label}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                setFocused={setFocused}>
                {/* Daftar Opsi Radio */}
                <View style={modalStyles.container}>
                    {renderModalContent()}
                </View>

                <TouchableOpacity style={modalStyles.buttonSave} onPress={() => handleSubmit()}>
                    <Text style={{ color: "white", fontSize: 15, fontWeight: '500' }}>Simpan</Text>
                </TouchableOpacity>
            </ModalKuvera>
        </View>
    )
}

export default DateTimeInput;
