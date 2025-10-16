import { Colors } from '@/constants/theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HeaderHome() {
  return (
      <View style={styles.Header}>
        {/* User */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, width: "85%" }}>
          <View style={{ backgroundColor: "white", height: 55, width: 55, alignItems: 'center', borderRadius: 10000 }} >
            <Image
              style={{ height: 60, width: 60 }}
              contentFit='contain'
              source={require("@/assets/images/icon/avatar-men.png")} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{ fontWeight: "400", fontSize: 13, color: "white" }}>Good morning</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{ fontWeight: "500", fontSize: 17, color: "white", flexShrink: 1 }}>
              Rizat Sakmir, S.Kom.
            </Text>
          </View>
        </View>
        <View style={{marginRight: 10}}>
          <Ionicons name="notifications-outline" size={22} color="white" />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.tealKuvera,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 12,
    marginTop: 36,
    borderRadius: 30,
  }
})