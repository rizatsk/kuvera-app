
import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import React from 'react'
import { View } from 'react-native'
import HomeMenu from './menu'

export default function InvestAccountValue() {
    return (
        <View style={{ alignItems: "center", flex: 1, flexDirection: "column", marginHorizontal: 10, paddingVertical: 10, backgroundColor: Colors.tealLightKuvera, borderRadius: 10, overflow: 'hidden' }}>
            <View style={{ backgroundColor: Colors.tealKuvera, width: 110, paddingLeft: 10, borderRadius: 10, position: 'absolute', top: 9, right: -10 }}>
                <CustomText style={{ color: 'white', fontWeight: 500, fontSize: 16 }}>September</CustomText>
            </View>
            <CustomText style={{ fontWeight: 600, color: 'white' }}>Your invest account value is</CustomText>
            <View style={{ marginVertical: 14, width: "80%", height: 0.8, backgroundColor: Colors.grey[50], }} />
            <CustomText style={{ fontWeight: '600', fontSize: 25, color: 'white' }}>Rp. 1.500.532.000</CustomText>
            <HomeMenu />
        </View>
    )
}
