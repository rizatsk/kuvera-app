import { useAppSelector } from "@/states";
import { StyleSheet, Text } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function AccountScreen() {
  const authUser = useAppSelector((states) => states.authUser);

  return (
    <ScreenContentWrapper style={styles.container}>
      <Text>Account Screen</Text>
      <Text>Name: {authUser.name}</Text>
    </ScreenContentWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});