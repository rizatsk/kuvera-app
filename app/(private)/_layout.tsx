import { useAppSelector } from "@/states";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function PrivateLayout() {
    const isPreload = useAppSelector((states) => states.preload);
    const authUser = useAppSelector((states) => states.authUser);

    useEffect(() => {
        if (!authUser && !isPreload) {
            router.replace("/(auth)/login")
        }
    }, [authUser, isPreload])

    return (
        <>
            {authUser && (
                <Stack screenOptions={{ headerShown: false }} />
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