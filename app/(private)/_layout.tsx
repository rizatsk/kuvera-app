
import BackNavigation from "@/components/back-navigation";
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
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="spending/form-add-spending"
                        options={{
                            title: "Add Spending",
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 17,
                            },
                            headerLeft: () => <BackNavigation />
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