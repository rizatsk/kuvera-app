import { useAppSelector } from '@/states';
import { asyncGetTransactionByCategory } from '@/states/transaction/action';
import { InitialSumTransactionByCategoryType } from '@/states/transaction/type';
import moment from 'moment';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import CardCategoryOutput from './cardCategorySpend';
import SkeletonCardCategoryOutput from './skeleton';

export default function ListCategoriesSpend() {
    const homeRefresh = useAppSelector((states) => states.homeRefresh);
    const { isLoading, transactions }: InitialSumTransactionByCategoryType = useAppSelector((states) => states.sumTransactionByCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        getTransactionByCategory();
    }, []);

    useEffect(() => {
        // Jalankan saat homeRefresh true
        if (homeRefresh) {
            getTransactionByCategory()
        }
    }, [homeRefresh])

    const getTransactionByCategory = () => {
        const start_date = moment().format('YYYY-MM') + '-01 00:00:00';
        const end_date = moment().format('YYYY-MM-DD') + ' 23:59:59';

        dispatch(
            asyncGetTransactionByCategory({
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                type: 'outgoing',
            }) as any
        )
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
        >
            {/* Card */}
            {isLoading ? (<SkeletonCardCategoryOutput />) : (
                <>
                    {transactions.map((category) => (
                        <CardCategoryOutput
                            key={category.category_id}
                            title={category.name}
                            money={`${category.total_money_spent}`}
                            icon={category.name}
                        />
                    ))}
                </>
            )}
        </ScrollView>
    )
}
