import { OptionStackScreen } from "@/components/option-stack-screen";
import { useAppSelector } from "@/states";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function PrivateLayout() {
    const isPreload = useAppSelector((states) => states.preload);
    const authUser = useAppSelector((states) => states.authUser);

    useEffect(() => {
        if (!authUser && !isPreload) {
            router.replace("/(non-private)/login")
        }
    }, [authUser, isPreload])

    return (
        <>
            {authUser && (
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="menu/form-add-spending"
                        options={{
                            title: "Add Spending",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="menu/form-add-income"
                        options={{
                            title: "Add Income",
                            ...OptionStackScreen,
                        }}
                    />
                    <Stack.Screen
                        name="success/index"
                        options={{
                            title: "Success",
                            ...OptionStackScreen,
                        }}
                    />
                </Stack>
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