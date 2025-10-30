import CustomText from "@/components/custom-text";
import DatePicker from "@/components/input/date-time-input/date-picker";
import { Colors } from "@/constants/theme";
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
          <CustomText style={{ fontWeight: 500, fontSize: 15, textAlign: 'center', flex: 1 }}>Periode</CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderLeftColor: Colors.grey[50], borderLeftWidth: 2, paddingLeft: 10 }}>
            <CustomText style={{ fontSize: 14, fontWeight: 500 }}>Oktober</CustomText>
            <DatePicker
              style={{ backgroundColor: Colors.tealDarkKuvera, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4}}
              titleStyle={{ color: "white", fontWeight: 400 }}
              label="Date Transaction"
              value={dateTransaction}
              onSelectDate={onSelectDate}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContentWrapper>
  )
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    borderRadius: 8
  }
})