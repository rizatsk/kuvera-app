
import CustomText from '@/components/custom-text';
import { modalStyles } from '@/components/input/radio-input/style';
import ModalKuvera from '@/components/modal-bottom';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ButtonDisableOrEnableCategory from './button-disable';

type ButtonMoreProps = {
  id_category: string
  status: string
  category_name: string
}

export default function ButtonMore({id_category, status, category_name}: ButtonMoreProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleButton = (option: string) => {
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.6} onPress={() => setIsModalVisible(true)}>
        <Feather name="more-horizontal" size={30} color="black" />
      </TouchableOpacity>
      <ModalKuvera
        title={'Option Category'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <View style={modalStyles.optionsContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={modalStyles.optionItem}
            onPress={() => handleButton('edit')}
          >
            <CustomText style={modalStyles.optionLabel}>Change name category</CustomText>
          </TouchableOpacity>
          <ButtonDisableOrEnableCategory status={status} id_category={id_category} category_name={category_name} />
        </View>
      </ModalKuvera>
    </>
  )
}
