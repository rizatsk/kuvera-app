import CustomText from '@/components/custom-text';
import CardStockIdx from '@/components/page/stock-idx/card-stock-idx';
import SearchStock from '@/components/page/stock-idx/search-stock';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScreenContentWrapper } from 'react-native-screens';

export default function ExpoScreen() {
  const [searchStock, setSearchStock] = useState("all");

  return (
    <ScreenContentWrapper style={{ paddingTop: 20, backgroundColor: 'white', flex: 1 }}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 10 }}>
        <CustomText
          style={{ fontWeight: 600, fontSize: 18, textAlign: "center" }}
        >
          Stock IDX
        </CustomText>
      </View>
      <SearchStock onSearch={setSearchStock} />
      <CardStockIdx keyword={searchStock} />
    </ScreenContentWrapper>
  );
}

const styles = StyleSheet.create({
});
