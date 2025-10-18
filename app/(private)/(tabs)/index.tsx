import CardCategoryOutput from '@/components/page/home/card/cardCategoryOutput';
import CardRecent from '@/components/page/home/card/cardRecent';
import HomeMenu from '@/components/page/home/menu';
import { Colors } from '@/constants/theme';
import { categoryOutput, recentPayment } from '@/helper/mock-data';
import Entypo from '@expo/vector-icons/Entypo';
import { ScrollView, Text, View } from 'react-native';
import HeaderHome from '../../../components/page/home/header';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderHome />
      <ScrollView style={{ paddingVertical: 30 }} showsVerticalScrollIndicator={false}>
        {/* Invest Account value */}
        <View style={{ alignItems: "center", flex: 1, flexDirection: "column", paddingHorizontal: 14, }}>
          <Text style={{ fontWeight: "500" }}>Your invest account value is</Text>
          <View style={{ marginVertical: 14, width: "80%", height: 0.8, backgroundColor: Colors.grey[400], }} />
          <Text style={{ fontWeight: '600', fontSize: 25 }}>Rp. 1.500.532.000</Text>
        </View>
        {/* Home Menu */}
        <HomeMenu />
        {/* Category Output */}
        <View style={{ flex: 1, marginTop: 30, paddingHorizontal: 14, }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Category</Text>
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
                subTitle={category.subTitle}
                money={category.money}
                icon={category.icon}
              />
            ))}
          </ScrollView>
        </View>
        {/* Recent */}
        <View style={{ flex: 1, marginVertical: 30, backgroundColor: Colors.greyBackground, paddingVertical: 10 }}>
          <View style={{ paddingHorizontal: 14 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>Recent</Text>
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
    </View>
  );
}