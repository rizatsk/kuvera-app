import CustomText from '@/components/custom-text'
import { Colors } from '@/constants/theme'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function HomeMenu() {
    const router = useRouter();

    const AddSpendingHandling = () => {
        router.navigate("/spending/form-add-spending")
    }

    return (
        <View style={style.HomeMenu}>
            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }} onPress={() => AddSpendingHandling()}>
                <View style={style.squareIcon}>
                    <View style={{ position: "absolute", top: 5, left: 10 }}>
                        <FontAwesome name="plus-circle" size={16} color={Colors.tealKuvera} />
                    </View>
                    <FontAwesome6 name="shopify" size={24} color={Colors.tealKuvera} />
                </View>
                <CustomText style={style.title}>Spending</CustomText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }}>
                <View style={style.squareIcon}>
                    <View style={{ position: "absolute", top: 5, left: 4 }}>
                        <FontAwesome name="plus-circle" size={16} color={Colors.tealKuvera} />
                    </View>
                    <AntDesign name="dollar" size={24} color={Colors.tealKuvera} />
                </View>
                <CustomText style={style.title}>Income</CustomText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={{ alignItems: 'center' }}>
                <View style={style.squareIcon}>
                    <View style={{ position: "absolute", top: 5, left: 5 }}>
                        <FontAwesome name="plus-circle" size={16} color={Colors.tealKuvera} />
                    </View>
                    <FontAwesome6 name="credit-card" size={24} color={Colors.tealKuvera} />
                </View>
                <CustomText style={style.title}>Category</CustomText>
            </TouchableOpacity>
        </View>
    )
};

const style = StyleSheet.create({
    HomeMenu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        marginTop: 20, 
        gap: 35, 
        backgroundColor: Colors.greyBackground2, 
        paddingVertical: 10
    },
    title: {
        fontWeight: '700', 
        color: Colors.grey[500], 
        fontSize: 12
    },
    squareIcon: {
        width: 50, height: 50, 
        backgroundColor: "white",
        borderColor: Colors.tealKuvera,
        borderWidth: 2,
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: "static"
    }
})
