import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { useAppSelector } from '@/states'
import { AsyncGetAntamGoldPrice } from '@/states/gold-antam-price/action'
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import SkeletonPriceAntam from './skeleton'

type ListCardGoldAntamPriceProps = {
    weight: string
    price_buy: string
    price_buyback: string
}

export type GoldAntam = {
    berat: string
    harga_buyback: string
    harga_jual: string
}

export default function CardGoldAntamPrice() {
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const dispatch = useDispatch();
    const [skeletonLoading, setSkeletonLoading] = useState(true);
    const [listGoldAntam, setListGoldAntam] = useState<GoldAntam[]>([]);

    useEffect(() => {
        getAntamGoldPrice()
    }, [])

    useEffect(() => {
        // Jalankan saat homeRefresh true
        if (homeRefresh) {
            getAntamGoldPrice()
        }
    }, [homeRefresh])

    function getAntamGoldPrice() {
        dispatch(
            AsyncGetAntamGoldPrice({ setListGoldAntam, setSkeletonLoading }) as any
        );
    }

    return (
        <FlatList<GoldAntam | undefined>
            scrollEnabled={false}
            data={skeletonLoading ? Array.from({ length: 6 }) : listGoldAntam}
            keyExtractor={(item, index) =>
                skeletonLoading ? index.toString() : item!.berat
            }
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item }) =>
                skeletonLoading ?
                    <SkeletonPriceAntam /> :
                    (
                        <ListCardGoldAntamPrice
                            weight={item!.berat}
                            price_buy={item!.harga_jual}
                            price_buyback={item!.harga_buyback}
                        />
                    )
            }
            ListEmptyComponent={<CustomText style={{textAlign: 'center', marginVertical: 20}}>Price gold Antam is not available</CustomText>}
        />
    )
}

const ListCardGoldAntamPrice = ({ weight, price_buy, price_buyback }: ListCardGoldAntamPriceProps) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={styles.containerIcon}>
                    <AntDesign name="gold" size={26} color="white" />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 500, fontSize: 15 }}>{weight} gram</CustomText>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <CustomText style={{ fontSize: 11 }}>Buy:</CustomText>
                        <CustomText style={{ fontWeight: 500, paddingRight: 8 }}>Rp. {price_buy}</CustomText>
                    </View>
                </View>
            </View>
            <View>
                <CustomText style={{ fontSize: 11 }}>Buy Back:</CustomText>
                <CustomText style={{ fontWeight: 500, paddingRight: 8, fontSize: 15, color: Colors.moneyGreenKuvera }}>Rp. {price_buyback}</CustomText>
            </View>
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
        backgroundColor: Colors.goldCOlor,
    }
})