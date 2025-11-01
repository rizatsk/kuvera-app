import CustomText from "@/components/custom-text";
import ModalDateTransactions from "@/components/page/transaction/modal-date-transaction";
import { DateTrx } from "@/components/page/transaction/type";
import { Colors } from "@/constants/theme";
import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function TransactionScreen() {
  const [dateTrx, setDateTrx] = useState<DateTrx>({start: null, end: null, keyString: '30lastday'})
  const onSelectDate = (dataDateTrx: DateTrx) => {
    console.log('Selected date transaction', dataDateTrx)
    setDateTrx(dataDateTrx);
  };

  return (
    <ScreenContentWrapper style={{ paddingTop: 20 }}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText
          style={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}
        >
          Transactions
        </CustomText>
      </View>
      <ScrollView>
        <View style={styles.datePickerContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <ModalDateTransactions
              titleStyle={{ color: "blac", fontWeight: 400, fontSize: 14 }}
              label="Select Date"
              value={dateTrx}
              onSelectDate={onSelectDate}
            />
          </View>
          <View style={{ width: 2, height: "100%", backgroundColor: Colors.grey[50], }} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <CustomText
              style={{
                fontWeight: 500,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              All Transactions
            </CustomText>
            <Octicons name="chevron-down" size={20} color="black" />
          </View>
        </View>
      </ScrollView>
    </ScreenContentWrapper>
  );
}

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 6,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
