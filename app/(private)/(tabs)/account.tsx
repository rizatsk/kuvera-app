import { useAppSelector } from "@/states";
import { StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
  const authUser = useAppSelector((states) => states.authUser);

  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
      <Text>Name: {authUser.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});