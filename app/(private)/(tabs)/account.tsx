import CustomText from "@/components/custom-text";
import { useAppSelector } from "@/states";
import { StyleSheet } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function AccountScreen() {
  const authUser = useAppSelector((states) => states.authUser);

  return (
    <ScreenContentWrapper style={styles.container}>
      <CustomText>Account Screen</CustomText>
      <CustomText>Name: {authUser.name}</CustomText>
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