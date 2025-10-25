import CustomText from "@/components/custom-text";
import { View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function TransactionScreen() {

  return (
    <ScreenContentWrapper>
        <View>
            <CustomText>History</CustomText>
        </View>
    </ScreenContentWrapper>
  )
}