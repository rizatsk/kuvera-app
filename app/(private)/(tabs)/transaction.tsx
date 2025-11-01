import CustomText from "@/components/custom-text";
import ModalDateTransactions from "@/components/page/transactions/date-transaction/modal-date-transaction";
import { DateTrx } from "@/components/page/transactions/date-transaction/type";
import ModalTypeTransaction from "@/components/page/transactions/type-transaction/modal-type-transaction";
import { Colors } from "@/constants/theme";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function TransactionScreen() {
  const [dateTrx, setDateTrx] = useState<DateTrx>({start: null, end: null, keyString: '30lastday'})
  const onSelectDate = (dataDateTrx: DateTrx) => {
    console.log('Selected date transaction', dataDateTrx)
    setDateTrx(dataDateTrx);
  };

  const [typeTransaction, setTypeTransaction] = useState('All Transaction');
  const selectOptionsTypeTransaction = ['All Transaction', 'Incoming Balance', 'Outgoing Balance'];
  const onSelectTypeTransaction = (select: string) => {
    setTypeTransaction(select)
  }
  

  return (
    <ScreenContentWrapper style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText
          style={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}
        >
          Transactions
        </CustomText>
      </View>
      <ScrollView>
        <View style={styles.datePickerContainer}>
            <ModalDateTransactions
              titleStyle={{ color: "blac", fontWeight: 400, fontSize: 14 }}
              label="Select Date"
              value={dateTrx}
              onSelectDate={onSelectDate}
            />
          <View style={{ width: 2, height: "100%", backgroundColor: Colors.grey[50], }} />
          <ModalTypeTransaction
            value={typeTransaction}
            label="Type Transaction"
            selectOptions={selectOptionsTypeTransaction}
            onSelect={onSelectTypeTransaction}
          />
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
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grey[50]
  },
});
