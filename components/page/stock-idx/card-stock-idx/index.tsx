import CustomText from '@/components/custom-text';
import { Colors } from '@/constants/theme';
import { asyncGetStockIDXPrice } from '@/states/stock-idx/action';
import { DataStocksIDXType } from '@/states/stock-idx/type';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import IsNotFoundStockIDX from './is-not-found';
import SkeletonStockIDX from './skeleton';

type CardStockIdxProps = {
    code: string
    nameCompany: string
    priceHigh: number
    priceLow: number
    priceClose: number
    change: number
    percentage: number
}

type ListCardStockIdxProps = {
    keyword: string
}

export default function ListCardStockIdx({ keyword }: ListCardStockIdxProps) {
    const dispatch = useDispatch();
    const [dataStockIDX, setDataStockIDX] = useState<DataStocksIDXType[]>([]);
    const [dataStockIDXSearch, setDataStockIDXSearch] = useState<DataStocksIDXType[]>([]);
    const [skeletonLoading, setSkeletonLoading] = useState(true)
    const [refresh, setRefresh] = useState(false);
    const API_FETCH_INTERVAL = 3000;

    useFocusEffect(
        useCallback(() => {
            // 1. Panggil data segera saat layar fokus
            getDataStockIDX();

            // 2. Set up interval untuk periodic hit API
            const intervalId = setInterval(() => {
                getDataStockIDXPeriod();
            }, API_FETCH_INTERVAL);

            // 3. Cleanup function: bersihkan interval saat layar BLUR (tidak fokus)
            return () => {
                console.log('Interval dibersihkan. Layar tidak fokus.');
                clearInterval(intervalId);
            };
        }, [])
    )

    useEffect(() => {
        if (dataStockIDX.length > 0) {
            switch (keyword) {
                case 'all':
                    setDataStockIDXSearch(dataStockIDX)
                    break;
                default:
                    const lowerQuery = keyword.toLowerCase();
                    const searchDataIDX = dataStockIDX.filter(
                        (item) =>
                            item.StockCode.toLowerCase().includes(lowerQuery) ||
                            item.StockName.toLowerCase().includes(lowerQuery)
                    );
                    setDataStockIDXSearch(searchDataIDX)
                    break;

            }
        }
    }, [keyword, dataStockIDX])

    const fetchRefreshing = () => {
        setRefresh(true)
        getDataStockIDX()
        setRefresh(false)
    }

    function getDataStockIDX() {
        dispatch(
            asyncGetStockIDXPrice({
                setDataStockIDX,
                setDataStockIDXSearch,
                setSkeletonLoading
            }) as any
        )
    }

    function getDataStockIDXPeriod() {
        dispatch(
            asyncGetStockIDXPrice({
                setDataStockIDX,
                setDataStockIDXSearch,
                setSkeletonLoading: () => {}
            }) as any
        )
    }

    return (
        <FlatList<DataStocksIDXType | undefined>
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={fetchRefreshing} />}
            scrollEnabled={true}
            data={skeletonLoading ? Array.from({ length: 13 }) : dataStockIDXSearch}
            keyExtractor={(item, index) =>
                skeletonLoading ? index.toString() : item!.No.toString()
            }
            contentContainerStyle={{ gap: 10, paddingVertical: 15, marginHorizontal: 18 }}
            ListEmptyComponent={<IsNotFoundStockIDX />}
            renderItem={({ item }) =>
                skeletonLoading ?
                    <SkeletonStockIDX /> :
                    (
                        <CardStockIdx
                            code={item!.StockCode}
                            nameCompany={item!.StockName}
                            priceHigh={item!.High}
                            priceLow={item!.Low}
                            priceClose={item!.Close}
                            change={item!.Change}
                            percentage={item!.Percentage}
                        />
                    )
            }
        />
    )
}

function CardStockIdx({ code, nameCompany, priceHigh, priceLow, priceClose, change, percentage }: CardStockIdxProps) {
    const statusColor = change < 0 ? Colors.red[500] : Colors.moneyGreenKuvera;

    return (
        <View style={styles.dataTransactionContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {/* Title */}
                <View>
                    <CustomText style={{ fontSize: 16, fontWeight: 600 }}>{code}</CustomText>
                    <CustomText style={{ fontSize: 12 }}>{nameCompany}</CustomText>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <Entypo name="triangle-up" size={18} color={Colors.tealKuvera} />
                            <CustomText style={styles.priceHigh}>Rp {priceHigh}</CustomText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                        }}>
                            <Entypo name="triangle-down" size={18} color={Colors.goldCOlor} />
                            <CustomText style={styles.priceLow}>Rp {priceLow}</CustomText>
                        </View>
                    </View>
                </View>
            </View>
            {/* Money */}
            <View style={{ alignItems: 'flex-end' }}>
                <CustomText style={{ fontWeight: 600, color: statusColor }}>Rp {priceClose}</CustomText>
                <CustomText style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 500,
                    backgroundColor: statusColor,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 5,
                }}
                >
                    {change} ({percentage}%)
                </CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dataTransactionContainer: {
        backgroundColor: "white",
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceHigh: {
        fontSize: 13,
        fontWeight: 600,
        color: Colors.tealKuvera,
    },
    priceLow: {
        fontSize: 13,
        fontWeight: 600,
        color: Colors.goldCOlor,
    }
});
