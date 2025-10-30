import CustomText from '@/components/custom-text';
import ModalKuvera from '@/components/modal-bottom';
import { formatDateVerbose } from '@/helper/formate-date-time';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { modalStyles } from './style';

export interface DatePickerProps {
    onSelectDate: (value: string) => void;
    style?: ViewStyle;
    label: string;
    value?: string;
}

const DatePicker: React.FunctionComponent<DatePickerProps> = (props) => {
    const {
        value,
        label,
        onSelectDate,
        style,
    } = props;

    const initialDate = new Date();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState(initialDate);
    const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
    const [mode, setMode] = useState<'date' | 'time'>('date');

    // For Modal
    const handleOnFocus = () => {
        setIsModalVisible(true);
        if (Platform.OS === 'android') {
            showAndroidPicker('date')
        } else {
            setMode('date')
        }
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
                    style={[modalStyles.tab, mode === 'date' && modalStyles.activeTab]}
                >
                </TouchableOpacity>
                    <Text style={mode === 'date' && modalStyles.activeText}>{formattedDate}</Text>
            </View>

            {renderPicker()}
        </>
    );
    // End for date time picker

    return (
        <View>
            <TouchableOpacity activeOpacity={0.6} style={[style]} onPress={handleOnFocus}>
                <CustomText>
                    {value && formatDateVerbose(value)}
                </CustomText>
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
                    <CustomText style={{ color: "white", fontSize: 15, fontWeight: '500' }}>Simpan</CustomText>
                </TouchableOpacity>
            </ModalKuvera>
        </View>
    )
}

export default DatePicker;

const styles = StyleSheet.create({
    tabContainer: {

    }
})