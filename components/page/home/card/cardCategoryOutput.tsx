import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React from 'react'
import { View } from 'react-native'

type CardProps = {
    title: string
    subTitle: string
    money: string,
    icon?: string
}
export default function CardCategoryOutput({
    title, subTitle, money, icon
}: CardProps) {
    const IconComponent = () => {
        switch(icon) {
            case 'cable-data':
                return <MaterialCommunityIcons name="cable-data" size={24} color="white" />
            case 'tools':
                return <FontAwesome5 name={icon} size={24} color="white" />
            default:
                return <FontAwesome6 name={icon} size={24} color="white" />
        }
    };

    return (
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderColor: Colors.tealKuvera, borderWidth: 2, }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ backgroundColor: Colors.light.tint, width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10 }}>
                    <IconComponent />
                </View>
                <View>
                    <CustomText style={{ fontWeight: 600, fontSize: 15 }}>{title}</CustomText>
                    <CustomText style={{ fontSize: 13, color: Colors.grey[600] }}>{subTitle}</CustomText>
                    <CustomText style={{ fontWeight: "700", fontSize: 14, color: Colors.tealKuvera }}>{money}</CustomText>
                </View>
            </View>
        </View>
    )
}
