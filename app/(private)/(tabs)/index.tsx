import CustomText from '@/components/custom-text';
import CardCategoryOutput from '@/components/page/home/card/cardCategoryOutput';
import CardGoldAntamPrice from '@/components/page/home/card/cardGoldAntamPrice';
import CardRecent from '@/components/page/home/card/cardRecent';
import HeaderHome from '@/components/page/home/header';
import InvestAccountValue from '@/components/page/home/invest-account-value';
import { categoryOutput, recentPayment } from '@/helper/mock-data';
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView, View } from 'react-native';
import { ScreenContentWrapper } from 'react-native-screens';

export default function HomeScreen() {
  return (
    <ScreenContentWrapper style={{ flex: 1 }}>
      <HeaderHome />
      <ScrollView style={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
        {/* Invest Account value */}
        <InvestAccountValue />
        {/* Category Output */}
        <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
            <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Category</CustomText>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
          {/* Component Card */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {/* Card */}
            {categoryOutput.map((category, index) => (
              <CardCategoryOutput
                key={index}
                title={category.title}
                money={category.money}
                icon={category.icon}
              />
            ))}
          </ScrollView>
        </View>
        {/* Container */}
        <View style={{ flex: 1, marginTop: 10, backgroundColor: "white", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
          {/* Price gold antam */}
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Gold Antam Price</CustomText>
            </View>
            <CardGoldAntamPrice />
          </View>

          {/* Recent */}
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <CustomText style={{ fontWeight: 600, fontSize: 16 }}>Recent</CustomText>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
            <View style={{ gap: 10 }}>
              {/* Card */}
              {recentPayment.map((recent, index) => (
                <CardRecent
                  key={index}
                  title={recent.title}
                  date={recent.date}
                  icon={recent.icon}
                  amount={recent.amount}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContentWrapper>
  );
}