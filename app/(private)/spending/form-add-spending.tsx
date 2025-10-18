import FormAddSpending from '@/components/page/spending/form'
import React from 'react'
import { View } from 'react-native'

export default function PageFormAddSpending() {
  return (
    <View style={{flex: 1, backgroundColor: "white", paddingVertical: 18, paddingHorizontal: 20}}>
        <FormAddSpending />
    </View>
  )
}
