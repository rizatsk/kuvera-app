import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function AccountTabsCard() {
    return (
        <View style={{ marginHorizontal: 18, marginTop: 25 }}>
            <CustomText style={{ fontSize: 16, fontWeight: 600 }}>Account</CustomText>
            <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardIcon}>
                        <FontAwesome6 name="user" size={20} color="black" />
                        <CustomText style={styles.title}>Edit Profile</CustomText>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardIcon}>
                        <FontAwesome name="language" size={20} color="black" />
                        <CustomText style={styles.title}>Language</CustomText>
                    </View>
                    <FontAwesome6 name="angle-right" size={20} color="black" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 20, 
        borderBottomColor: Colors.grey[400], 
        borderBottomWidth: 0.5
    },
    cardIcon: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 20 
    },
    title: { 
        fontSize: 16, 
        fontWeight: 400 
    }
})
