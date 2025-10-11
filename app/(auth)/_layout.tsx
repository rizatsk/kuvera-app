import { useAppSelector } from "@/states";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AuthLayout() {
    const isPreload = useAppSelector((states) => states.preload);
    const authUser = useAppSelector((states) => states.authUser);

    useEffect(() => {
        if (authUser && !isPreload) {
            router.replace("/(private)/(tabs)")
        }
    }, [authUser, isPreload])

    return (
        <>
            {isPreload ? (
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View>
            ) : (
                <>
                    {!authUser && (
                        <Stack screenOptions={{ headerShown: false }} />
                    )}
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});