import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import { formatRupiah } from '@/helper/format-rupiah'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

type CardProps = {
    id: string,
    account_id: string,
    title: string,
    money: string,
    icon?: string,
    color: string,
    status?: boolean,
}
export default function CardCategoryOutput({
    id, account_id, title, money, icon, color, status = true
}: CardProps) {
    const colorCard = status ? color : Colors.grey[500];
    const colorFont = status ? "black" : Colors.grey[500];
    const IconComponent = () => {
        switch (icon) {
            case 'internet':
                return <MaterialCommunityIcons name="cable-data" size={30} color={colorCard} />
            case 'service':
                return <FontAwesome5 name={'tools'} size={24} color={colorCard} />
            case 'monthly':
                return <Entypo name="wallet" size={30} color={colorCard} />
            case 'food and drink':
                return <Ionicons name="fast-food-sharp" size={30} color={colorCard} />
            default:
                return <Fontisto name="credit-card" size={24} color={colorCard} />
        }
    };

    function handleButton() {
        router.push({
            pathname: '/(private)/category/transaction-by-category',
            params: {
                category_id: id,
                category_name: title,
                account_id: account_id,
                status: `${status}`,
                total_spent: money
            }
        })
    }

    return (
        <TouchableOpacity 
            activeOpacity={0.6} 
            onPress={handleButton}
            style={{ paddingLeft: 5, paddingRight: 8, paddingVertical: 4, borderRadius: 10, borderColor: colorCard + 70, borderWidth: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ backgroundColor: colorCard + 30, width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                    <IconComponent />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 600, fontSize: 14, textTransform: 'capitalize', color: colorFont }}>{title}</CustomText>
                    <CustomText style={{ fontWeight: "700", fontSize: 13, color: colorCard }}>{formatRupiah(money)}</CustomText>
                </View>
            </View>
        </TouchableOpacity>
    )
}
