import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function BackNavigation() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
            style={{marginRight: 20}}
        >
            <FontAwesome5 name="chevron-left" size={22} color="black" />
        </TouchableOpacity>
    );
}
