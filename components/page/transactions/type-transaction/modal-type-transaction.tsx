import CustomText from '@/components/custom-text';
import { modalStyles } from '@/components/input/radio-input/style';
import ModalKuvera from '@/components/modal-bottom';
import { Colors } from '@/constants/theme';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface ModalTypeTransactionProps {
    label: string,
    value: string,
    selectOptions: Array<string>,
    onSelect: (value: string) => void
}

const ModalTypeTransaction: React.FunctionComponent<ModalTypeTransactionProps> = (props) => {
    const {
        value,
        label,
        selectOptions,
        onSelect,
    } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);


    const handleOnFocus = () => {
        setIsModalVisible(true);
    };

    const handleSubmit = (value: string) => {
        setSelectedValue(value)
        onSelect(value);
        onClose();
    };

    const onClose = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <TouchableOpacity activeOpacity={0.6} onPress={handleOnFocus}>
                    <CustomText
                        style={{
                            fontWeight: 500,
                            fontSize: 14,
                            textAlign: "center",
                        }}
                    >
                        {value}
                    </CustomText>
                </TouchableOpacity>
                <Octicons name="chevron-down" size={20} color="black" />
            </View>

            <ModalKuvera
                title={label}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
                {/* Daftar Opsi Radio */}
                <View style={modalStyles.optionsContainer}>
                    {selectOptions.map((option) => (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            key={option}
                            style={modalStyles.optionItem}
                            onPress={() => handleSubmit(option)}
                        >
                            <CustomText style={modalStyles.optionLabel}>{option}</CustomText>
                            {selectedValue === option && (
                                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ModalKuvera>

        </>
    )
}

export default ModalTypeTransaction;