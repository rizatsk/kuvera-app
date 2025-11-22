import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { formatRupiah } from '@/helper/format-rupiah'
import { formatDateTimeVerbose } from '@/helper/formate-date-time'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

type CardRecentType = {
    icon: string
    title: string
    date: string
    amount: number
}

export default function CardRecent({
    icon, title, date, amount
}: CardRecentType) {
    const IconComponent = () => {
        switch (icon) {
            case 'pocket':
                return (
                    <View style={styles.containerIcon}>
                        <Image
                            style={{ height: 24, width: 24 }}
                            contentFit='contain'
                            source={require("@/assets/images/icon/money-minus.png")} />
                    </View>
                )
            default:
                return (
                    <View style={[styles.containerIcon, { backgroundColor: Colors.tealLightKuvera }]}>
                        <MaterialCommunityIcons name="shopping" size={24} color="white" />
                    </View>
                )
        }
    }
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5, alignItems: 'center' }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <IconComponent />
                <View>
                    <CustomText style={{ fontWeight: 500, fontSize: 15, textTransform: 'capitalize' }}>{title}</CustomText>
                    <CustomText style={{ fontSize: 12 }}>{formatDateTimeVerbose(date)}</CustomText>
                </View>
            </View>
            <CustomText style={{ fontWeight: 500, paddingRight: 8 }}>{formatRupiah(amount)}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10000,
        backgroundColor: Colors.orangeKuvera,
    }
})