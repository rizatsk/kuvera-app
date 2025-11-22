import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { GetTransactionType } from '@/service/transaction/type'
import { useAppSelector } from '@/states'
import { asyncGetTransactions } from '@/states/transaction/action'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CardRecent from './cardRecent'
import SkeletonCardRecent from './skeleton'


export default function ListCardRecent() {
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const dispatch = useDispatch();

    const [listRecentTransactions, setListRecentTransactions] = useState<GetTransactionType[]>([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getRecentTransactions()
    }, [])

    useEffect(() => {
        // Jalankan saat homeRefresh true
        if (homeRefresh) {
            getRecentTransactions()
        }
    }, [homeRefresh])

    function getRecentTransactions() {
        dispatch(
            asyncGetTransactions({
                param: {
                    limit: 10,
                    type: 'outgoing',
                },
                setIsLoading,
                successHandler: (result) => {
                    setListRecentTransactions(result);
                }
            }) as any
        );
    }

    function navigateFormAddSpending() {
        router.navigate({ pathname: '/(private)/spending/form-add-spending' })
    }


    const NotHaveTransaction = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginHorizontal: 20 }}>
                <Image source={require('@/assets/images/no-data.png')}
                    style={{ width: 170, height: 170 }}
                    contentFit="contain" />
                <View>
                    <CustomText style={{ textAlign: 'center', fontWeight: 500, fontSize: 16 }}>Belum ada transaksi tercatat.</CustomText>
                    <CustomText style={{ textAlign: 'center' }}>Tambahkan data pengeluaran untuk mulai memantau keuangan Anda</CustomText>
                </View>
                <TouchableOpacity style={styles.buttonStayLogOut} activeOpacity={0.6} onPress={navigateFormAddSpending}>
                    <CustomText style={{ fontSize: 16, fontWeight: 600, color: "white" }}>+ Add Transaction</CustomText>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Recent</CustomText>
            </View>
            <FlatList<GetTransactionType | undefined>
                scrollEnabled={false}
                data={isLoading ? Array.from({ length: 10 }) : listRecentTransactions}
                keyExtractor={(item, index) =>
                    isLoading ? index.toString() : item!.id
                }
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) =>
                    isLoading ?
                        <SkeletonCardRecent /> :
                        (
                            <CardRecent
                                key={item!.id}
                                title={item!.notes}
                                date={item!.created_dt}
                                icon={item!.category_name}
                                amount={item!.money_spent}
                            />
                        )
                }
                ListEmptyComponent={<NotHaveTransaction />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStayLogOut: {
        width: '100%',
        backgroundColor: Colors.tealKuvera,
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
        paddingVertical: 7,
    },
})