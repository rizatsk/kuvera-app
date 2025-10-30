import CustomText from "@/components/custom-text";
import DatePicker from "@/components/input/date-time-input/date-picker";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function TransactionScreen() {
  const [dateTransaction, setDateTransaction] = useState(`${new Date()}`);
  const onSelectDate = (selectedDate: string) => {
    setDateTransaction(selectedDate);
  }

  return (
    <ScreenContentWrapper style={{ paddingTop: 20 }}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText style={{ fontWeight: 600, fontSize: 18, textAlign: 'center' }}>Transactions</CustomText>
      </View>
      <ScrollView>
        <View style={styles.datePickerContainer}>
          <CustomText>Oktober</CustomText>
          <DatePicker 
            label="Date Transaction" 
            value={dateTransaction} 
            onSelectDate={onSelectDate} 
          />
        </View>
      </ScrollView>
    </ScreenContentWrapper>
  )
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    flex: 1, 
    backgroundColor: "white", 
    paddingVertical: 10, 
    marginHorizontal: 12, 
    paddingHorizontal: 8, 
    borderRadius: 8
  }
})