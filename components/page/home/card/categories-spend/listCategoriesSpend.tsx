import { categoryOutput } from '@/helper/mock-data';
import React from 'react';
import { ScrollView } from 'react-native';
import CardCategoryOutput from './cardCategorySpend';

export default function ListCategoriesSpend() {
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
        >
            {/* Card */}
            {categoryOutput.map((category, index) => (
                <CardCategoryOutput
                    key={index}
                    title={category.title}
                    money={category.money}
                    icon={category.title}
                />
            ))}
        </ScrollView>
    )
}
