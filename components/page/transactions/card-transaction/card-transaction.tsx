import CustomText from '@/components/custom-text';
import { Colors } from '@/constants/theme';
import { formatRupiah } from '@/helper/format-rupiah';
import { formatDateTimeVerbose } from '@/helper/formate-date-time';
import { TypeTransaction } from '@/states/transaction/type';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type CardTransactionParam = {
    amount: number
    notes: string
    type: TypeTransaction
    created_dt: string
    category_name: string
}

export default function CardTransaction(param: CardTransactionParam) {
    const IconComponent = () => {
        switch (param.type) {
            case 'incoming':
                return (
                    <View style={[styles.containerIcon, { backgroundColor: Colors.tealLightKuvera }]}>
                        <Image
                            style={{ height: 24, width: 24 }}
                            contentFit='contain'
                            source={require("@/assets/images/icon/money-bag-plus.png")} />
                    </View>
                )
            default:
                if (param.category_name === 'pocket') {
                    return (
                        <View style={[styles.containerIcon]}>
                            <Image
                                style={{ height: 24, width: 24 }}
                                contentFit='contain'
                                source={require("@/assets/images/icon/card-minus.png")} />
                        </View>
                    )
                } else {
                    return (
                        <View style={[styles.containerIcon, { backgroundColor: Colors.tealLightKuvera }]}>
                            <MaterialCommunityIcons name="shopping" size={24} color="white" />
                        </View>
                    )
                }
        }
    }


    return (
        <View style={styles.dataTransactionContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                {/* Icon */}
                <IconComponent />
                {/* Title */}
                <View>
                    <CustomText style={{ fontSize: 15, fontWeight: 500, textTransform: 'capitalize' }}>{param.notes}</CustomText>
                    <CustomText style={{ fontSize: 12 }}>{formatDateTimeVerbose(param.created_dt)}</CustomText>
                </View>
            </View>
            {/* Money */}
            {param.type === 'incoming' ? (
                <CustomText style={{ fontWeight: 600, color: Colors.greenKuvera }}>+{formatRupiah(param.amount)}</CustomText>
            ) : (
                <CustomText style={{ fontWeight: 600 }}>-{formatRupiah(param.amount)}</CustomText>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        backgroundColor: Colors.orangeKuvera,
        borderRadius: 1000,
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataTransactionContainer: {
        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});