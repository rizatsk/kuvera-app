import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { AsyncGetAntamGoldPrice } from '@/states/gold-antam-price/action'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'

type CardRecentType = {
    icon: string
    title: string
    date: string
    amount: string
}

export default function CardGoldAntamPrice() {
    const dispatch = useDispatch();
    const [listGoldAntam, setListGoldAntam] = useState<Array<any>>([]);

    useEffect(() => {
        dispatch(
            AsyncGetAntamGoldPrice({
                setListGoldAntam
            }) as any
        )
    }, [])

    return (
        <View style={{ gap: 10 }}>
           <ListCardGoldAntamPrice 
                icon='jual'
                title='10gr'
                date='2025'
                amount='Rp 15.0000'
           />
        </View>
    )
}

const ListCardGoldAntamPrice = ({ icon, title, date, amount}: CardRecentType) => {
    const IconComponent = () => {
        switch (icon) {
            case 'shopping':
                return (
                    <View style={[styles.containerIcon, { backgroundColor: Colors.tealLightKuvera }]}>
                        <MaterialCommunityIcons name="shopping" size={24} color="white" />
                    </View>
                )
            default:
                return (
                    <View style={styles.containerIcon}>
                        <Image
                            style={{ height: 24, width: 24 }}
                            contentFit='contain'
                            source={require("@/assets/images/icon/money-minus.png")} />
                    </View>
                )
        }
    }

    return (
         <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <IconComponent />
                    <View>
                        <CustomText style={{ fontWeight: 500, fontSize: 15 }}>{title}</CustomText>
                        <CustomText style={{ fontSize: 12 }}>{date}</CustomText>
                    </View>
                </View>
                <CustomText style={{ fontWeight: 500, paddingRight: 8 }}>{amount}</CustomText>
            </View>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10000,
        backgroundColor: Colors.orangeKuvera,
    }
})