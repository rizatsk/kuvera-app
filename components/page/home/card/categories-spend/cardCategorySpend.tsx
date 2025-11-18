import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
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
    icon?: string
}
export default function CardCategoryOutput({
    title, money, icon
}: CardProps) {
    const IconComponent = () => {
        switch(icon) {
            case 'internet':
                return <MaterialCommunityIcons name="cable-data" size={24} color="white" />
            case 'garage':
                return <FontAwesome5 name={'tools'} size={24} color="white" />
            case 'pocket':
                return <Entypo name="wallet" size={24} color="white" />
            default:
                return <FontAwesome6 name={"credit-card"} size={24} color="white" />
        }
    };

    return (
        <View style={{ paddingLeft: 5, paddingRight: 8, paddingVertical: 4, borderRadius: 10, borderColor: Colors.tealLightKuvera, borderWidth: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ backgroundColor: Colors.tealLightKuvera, width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                    <IconComponent />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}>{title}</CustomText>
                    <CustomText style={{ fontWeight: "700", fontSize: 13, color: Colors.tealKuvera }}>{formatRupiah(money)}</CustomText>
                </View>
            </View>
        </View>
    )
}
