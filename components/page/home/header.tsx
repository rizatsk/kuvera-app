
import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function HeaderHome() {
  return (
      <View style={styles.Header}>
        {/* User */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, width: "85%" }}>
          <View style={{ backgroundColor: Colors.tealKuvera, height: 55, width: 55, alignItems: 'center', borderRadius: 10000 }} >
            <Image
              style={{ height: 60, width: 60 }}
              contentFit='contain'
              source={require("@/assets/images/icon/avatar-men.png")} />
          </View>
          <View style={{flex: 1}}>
            <CustomText style={{ fontWeight: 500, fontSize: 13, color: Colors.tealKuvera }}>Good morning</CustomText>
            <CustomText
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ fontWeight: 600, fontSize: 17, color: Colors.tealKuvera, flexShrink: 1 }}>
              Rizat Sakmir, S.Kom.
            </CustomText>
          </View>
        </View>
        <View style={{marginRight: 10}}>
          <Ionicons name="notifications-outline" size={22} color={Colors.tealKuvera} />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 12,
    marginTop: 36,
    borderRadius: 30,
  }
})