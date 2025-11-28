import CustomText from '@/components/custom-text';
import CardTransaction from '@/components/page/transactions/card-transaction/card-transaction';
import NoHaveTransaction from '@/components/page/transactions/card-transaction/no-have-transaction';
import SkeletonCardTransaction from '@/components/page/transactions/card-transaction/skeleton';
import ModalDateTransactions from '@/components/page/transactions/date-transaction/modal-date-transaction';
import { DateTrx } from '@/components/page/transactions/date-transaction/type';
import { Colors } from '@/constants/theme';
import capitalize from '@/helper/capitalize';
import { formatRupiah } from '@/helper/format-rupiah';
import { TransactionsByCategory } from '@/service/transaction/type';
import { asyncGetTransactionsByCategory } from '@/states/transaction/action';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function TransactionByCategory() {
    const {category_id, category_name} = useLocalSearchParams();
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            title: `Category ${capitalize(category_name as string)}`,
        });
    }, [category_id]);

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionsByCategory[]>([]);
    const [totalSaldo, setTotalSaldo] = useState(0);

    // Select Date
    const [dateTrx, setDateTrx] = useState<DateTrx>({
        start: moment().format('YYYY-MM') + '-01 00:00:00',
        end: moment().format('YYYY-MM-DD') + ' 23:59:59',
        keyString: 'ThisMonth'
    })
    const onSelectDate = (dataDateTrx: DateTrx) => {
        setDateTrx(dataDateTrx);
    };


    useEffect(() => {
        getTransactionByCategory();
    }, [dateTrx.keyString])

    useEffect(() => {
        if (!isLoading) {
            if (transactions.length > 0) {
                let total = 0;
                transactions.map((trx) => {
                    total += trx.money_spent
                });
                setTotalSaldo(total);
            } else {
                setTotalSaldo(0)
            }
        }
    }, [transactions])

    const getTransactionByCategory = () => {
        dispatch(
            asyncGetTransactionsByCategory({
                param: {
                    category_id: category_id as  string,
                    start_date: new Date(dateTrx.start),
                    end_date: new Date(dateTrx.end as string),
                },
                setIsLoading,
                successHandler: (response: TransactionsByCategory[]) => {
                    setTransactions(response)
                }
            }) as any
        )
    };

    return (
        <View
            style={{ flex: 1, backgroundColor: "white", paddingVertical: 10 }}
        >
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <ModalDateTransactions
                        titleStyle={{ fontWeight: 600, fontSize: 15 }}
                        label="Select Date"
                        value={dateTrx}
                        onSelectDate={onSelectDate}
                    />
                </View>
                <View style={styles.monthTrxContainer}>
                    <CustomText style={{ fontWeight: 500, fontSize: 15 }}>Total :</CustomText>
                    <View>
                        <CustomText style={styles.textSaldo}>{formatRupiah(totalSaldo)}</CustomText>
                    </View>
                </View>
                <FlatList<TransactionsByCategory | undefined>
                        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getTransactionByCategory} />}
                        data={isLoading ? Array.from({ length: 10 }) : transactions}
                        keyExtractor={(item, index) =>
                          isLoading ? index.toString() : item!.id
                        }
                        contentContainerStyle={{ gap: 2 }}
                        renderItem={({ item, index }) =>
                          isLoading ?
                            <SkeletonCardTransaction /> :
                            (
                              <CardTransaction
                                key={item!.id}
                                index={index}
                                id={item!.id}
                                category_id={item!.category_id}
                                category_name={category_name as string}
                                notes={item!.notes}
                                amount={item!.money_spent}
                                created_dt={item!.created_dt}
                                type={item!.type}
                              />
                            )
                        }
                        ListEmptyComponent={<NoHaveTransaction />}
                      />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listFooterComponent: {
        paddingLeft: 5,
        paddingRight: 8,
        paddingVertical: 4,
        borderRadius: 10,
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        width: '48%',
        height: 60,
        borderStyle: 'dashed',
        backgroundColor: Colors.tealKuvera + 30
    },
    monthTrxContainer: {
        marginVertical: 10,
        backgroundColor: Colors.white[200],
        paddingHorizontal: 20,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textSaldo: {
        fontSize: 13,
        fontWeight: 500
    },
})