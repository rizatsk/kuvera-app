import { Colors } from '@/constants/theme'
import Foundation from '@expo/vector-icons/Foundation'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import React from 'react'
import { Text, View } from 'react-native'

type CardRecentType = {
    icon: string
    title: string
    date: string
    amount: string
}

export default function CardRecent({
    icon, title, date, amount
}: CardRecentType) {
    const IconComponent = () => {
        switch(icon) {
            case 'shopping':
                return <MaterialCommunityIcons name="shopping" size={24} color={Colors.tealKuvera} />
            default:
                return <Foundation name="dollar" size={24} color={Colors.tealKuvera} />
        }
    }
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, alignItems: 'center' }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View style={{ width: 50, height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10000, borderColor: Colors.tealKuvera, borderWidth: 1 }}>
                    <IconComponent />
                </View>
                <View>
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>{title}</Text>
                    <Text style={{ fontSize: 13, color: Colors.grey[600] }}>{date}</Text>
                </View>
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: Colors.tealKuvera, paddingRight: 8 }}>{amount}</Text>
        </View>
    )
}
