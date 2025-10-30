import CustomText from '@/components/custom-text';
import ModalKuvera from '@/components/modal-bottom';
import { formatDateVerbose } from '@/helper/formate-date-time';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { modalStyles } from './style';

export interface DatePickerProps {
    onSelectDate: (value: string) => void;
    style?: ViewStyle;
    label: string;
    value?: string;
    titleStyle?: TextStyle;
}

const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
    const {
        value,
        label,
        onSelectDate,
        style,
        titleStyle,
    } = props;

    const initialDate = new Date();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState(initialDate);
    const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
    const [mode, setMode] = useState<'date' | 'time'>('date');

    // For Modal
    const handleOnFocus = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (valueDate = date) => {
        onSelectDate?.(`${valueDate}`);
        onClose();
    };

    const onClose = () => {
        setIsModalVisible(false);
    }
    // End For Modal

    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android' && event.type === 'dismissed') {
            setShowPicker(false)
            return;
        }

        const currentDate = selectedDate || date;
        setDate(currentDate);

        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
    };

    const formattedDate = date.toLocaleDateString(undefined, {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });

    const showAndroidPicker = (currentMode: 'date' | 'time') => {
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
                    activeOpacity={0.6}
                    onPress={() => Platform.OS === 'android' ? showAndroidPicker('date') : setMode('date')}
                    style={[styles.tab]}
                >
                    <CustomText style={{ fontSize: 15, fontWeight: 500}}>Select periode:</CustomText>
                    <CustomText style={{ fontSize: 15, fontWeight: 500, flex: 1, textAlign: 'center' }}>{formattedDate}</CustomText>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </TouchableOpacity>
            </View>

            {renderPicker()}
        </>
    );
    // End for date time picker

    return (
        <View>
            <TouchableOpacity activeOpacity={0.6} style={[style, {flexDirection: 'row', gap: 2, alignItems: 'center' }]} onPress={handleOnFocus}>
                <CustomText style={titleStyle}>
                    {value && formatDateVerbose(value)}
                </CustomText>
                <Octicons name="chevron-down" size={18} color="white" />
            </TouchableOpacity>
            <ModalKuvera
                title={label}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
>
                {/* Daftar Opsi Radio */}
                <View style={modalStyles.container}>
                    {renderModalContent()}
                </View>

                <TouchableOpacity activeOpacity={0.6} style={modalStyles.buttonSave} onPress={() => handleSubmit()}>
                    <CustomText style={{ color: "white", fontSize: 15, fontWeight: '500' }}>Search</CustomText>
                </TouchableOpacity>
            </ModalKuvera>
        </View>
    )
}

export default DatePicker;

const styles = StyleSheet.create({
     tab: {
        padding: 10,
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
      },
})