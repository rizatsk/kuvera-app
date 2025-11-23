import CustomText from '@/components/custom-text'
import { formatRupiah } from '@/helper/format-rupiah'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React from 'react'
import { View } from 'react-native'

type CardProps = {
    title: string,
    money: string,
    icon?: string,
    color: string
}
export default function CardCategoryOutput({
    title, money, icon, color,
}: CardProps) {
    const IconComponent = () => {
        switch(icon) {
            case 'internet':
                return <MaterialCommunityIcons name="cable-data" size={24} color={color} />
            case 'garage':
                return <FontAwesome5 name={'tools'} size={24} color={color} />
            case 'pocket':
                return <Entypo name="wallet" size={24} color={color} />
            default:
                return <FontAwesome6 name={"credit-card"} size={24} color={color} />
        }
    };

    return (
        <View style={{ paddingLeft: 5, paddingRight: 8, paddingVertical: 4, borderRadius: 10, borderColor: color + 70, borderWidth: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ backgroundColor: color + 30, width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                    <IconComponent />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}>{title}</CustomText>
                    <CustomText style={{ fontWeight: "700", fontSize: 13, color: color }}>{formatRupiah(money)}</CustomText>
                </View>
            </View>
        </View>
    )
}
