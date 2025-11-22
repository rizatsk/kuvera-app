import CustomText from '@/components/custom-text'
import { GetTransactionType } from '@/service/transaction/type'
import { useAppSelector } from '@/states'
import { asyncGetTransactions } from '@/states/transaction/action'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
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
                ListEmptyComponent={<CustomText>You not have transactions</CustomText>}
            />
        </View>
    )
}
