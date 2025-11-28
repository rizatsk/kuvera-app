import FormEditSpending from '@/components/page/edit-spending/form-edit-spending';
import { TypeTransaction } from '@/states/transaction/type';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function EditSpending() {
    const { id, category_id, category_name, notes, money_spent, created_dt, type } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 20 }}>
            <FormEditSpending
                params={{
                    id: id as string,
                    category_id: category_id as string,
                    category_name: category_name as string,
                    notes: notes as string,
                    money_spent: money_spent as string,
                    created_dt: created_dt as string,
                    type: type as TypeTransaction
                }}
            />
        </View>
    )
}
