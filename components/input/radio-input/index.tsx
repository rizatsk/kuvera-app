import CustomText from '@/components/custom-text';
import ModalKuvera from '@/components/modal-bottom';
import { Colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import InputFieldKuvera from '../input-field';
import { getStyle } from '../input-field/style';
import { modalStyles } from './style';
import { RadioInputProps } from './type';

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
    const [focused, setFocused] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const computedStyle = getStyle(props, focused);

    const handleOnFocus = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = () => {
        onSelect?.(selectedValue);
        onClose();
    };

    const onClose = () => {
        setIsModalVisible(false);
        setFocused(false);
    }

    return (
        <InputFieldKuvera
            value={value}
            label={label}
            computedStyle={computedStyle}
            errorMessage={errorMessage}
            focused={focused}
            handleOnFocus={handleOnFocus}
        >
            <ModalKuvera
                title={label}
                isModalVisible={isModalVisible}
                setFocused={setFocused}
                setIsModalVisible={setIsModalVisible}
            >
                {/* Daftar Opsi Radio */}
                <View style={modalStyles.optionsContainer}>
                    {selectOptions.map((option) => (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            key={option}
                            style={modalStyles.optionItem}
                            onPress={() => setSelectedValue(option)}
                        >
                            <CustomText style={modalStyles.optionLabel}>{option}</CustomText>
                            <Ionicons
                                name={selectedValue === option ? "radio-button-on" : "radio-button-off"}
                                size={22}
                                color={selectedValue === option ? Colors.tealKuvera : "#ccc"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity activeOpacity={0.6} style={modalStyles.buttonSave} onPress={() => handleSubmit()}>
                    <CustomText style={{ color: "white", fontSize: 15, fontWeight: '500' }}>Simpan</CustomText>
                </TouchableOpacity>
            </ModalKuvera>
        </InputFieldKuvera>
    )
}

export default RadioInput;
