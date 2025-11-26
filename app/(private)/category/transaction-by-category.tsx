import capitalize from '@/helper/capitalize';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export default function TransactionByCategory() {
    const params = useLocalSearchParams();
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: `Category ${capitalize(params.name as string)}`,
        });
    }, [params]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

        </View>
    )
}
