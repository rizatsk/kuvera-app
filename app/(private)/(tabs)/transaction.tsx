import CustomText from "@/components/custom-text";
import ModalDateTransactions from "@/components/page/transactions/date-transaction/modal-date-transaction";
import { DateTrx } from "@/components/page/transactions/date-transaction/type";
import ModalTypeTransaction from "@/components/page/transactions/type-transaction/modal-type-transaction";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function TransactionScreen() {
  const [dateTrx, setDateTrx] = useState<DateTrx>({ start: null, end: null, keyString: '30lastday' })
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
    <ScreenContentWrapper style={{ paddingTop: 25, backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText
          style={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}
        >
          Transactions
        </CustomText>
      </View>
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
      <ScrollView>
        <View style={styles.monthTrxContainer}>
          <CustomText style={{ fontWeight: 500, fontSize: 15 }}>Nov 2025</CustomText>
          <View>
            <CustomText style={styles.textSaldo}>Saldo in: Rp 5.500.000</CustomText>
            <CustomText style={styles.textSaldo}>Saldo out: Rp 50.000</CustomText>
          </View>
        </View>
        <View style={styles.dataTransactionContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            {/* Icon */}
            <View style={{ backgroundColor: Colors.tealLightKuvera, borderRadius: 1000, width: 38, height: 38, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ height: 24, width: 24 }}
                contentFit='contain'
                source={require("@/assets/images/icon/money-bag-plus.png")} />
            </View>
            {/* Title */}
            <View>
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>Gajian</CustomText>
              <CustomText style={{ fontSize: 12 }}>Sen, 1 Nov 2025 13:45</CustomText>
            </View>
          </View>
          {/* Money */}
          <CustomText style={{ fontWeight: 600, color: Colors.greenKuvera }}>+Rp 5.400.000</CustomText>
        </View>
        <View style={styles.dataTransactionContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            {/* Icon */}
            <View style={{ backgroundColor: Colors.orangeKuvera, borderRadius: 1000, width: 38, height: 38, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ height: 24, width: 24 }}
                contentFit='contain'
                source={require("@/assets/images/icon/card-minus.png")} />
            </View>
            {/* Title */}
            <View>
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>Pizza</CustomText>
              <CustomText style={{ fontSize: 12 }}>Sen, 1 Nov 2025 19:45</CustomText>
            </View>
          </View>
          {/* Money */}
          <CustomText style={{ fontWeight: 600 }}>-Rp 250.000</CustomText>
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
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.grey[50]
  },
  monthTrxContainer: {
    backgroundColor: Colors.white[200],
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textSaldo: {
    fontSize: 12,
  },
  dataTransactionContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
