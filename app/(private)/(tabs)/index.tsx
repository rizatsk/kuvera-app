import CardCategoryOutput from '@/components/card/cardCategoryOutput';
import CardRecent from '@/components/card/cardRecent';
import { Colors } from '@/constants/theme';
import { categoryOutput, recentPayment } from '@/helper/mock-data';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ScrollView, Text, View } from 'react-native';
import HeaderHome from '../../../components/home/header';

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
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap: 35, backgroundColor: Colors.greyBackground2, paddingVertical: 10 }}>
          {/* Card */}
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: Colors.tealKuvera, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: "static" }}>
              <View style={{ position: "absolute", top: 5, left: 10 }}>
                <FontAwesome name="plus-circle" size={16} color="white" />
              </View>
              <FontAwesome6 name="shopify" size={24} color="white" />
            </View>
            <Text style={{ fontWeight: '500', color: Colors.grey[500], fontSize: 13 }}>Spending</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: Colors.tealKuvera, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: "static" }}>
              <View style={{ position: "absolute", top: 5, left: 4 }}>
                <FontAwesome name="plus-circle" size={16} color="white" />
              </View>
              <AntDesign name="dollar" size={24} color="white" />
            </View>
            <Text style={{ fontWeight: '500', color: Colors.grey[500], fontSize: 13 }}>Income</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: Colors.tealKuvera, borderRadius: 10, justifyContent: 'center', alignItems: 'center', position: "static" }}>
              <View style={{ position: "absolute", top: 5, left: 5 }}>
                <FontAwesome name="plus-circle" size={16} color="white" />
              </View>
              <FontAwesome6 name="credit-card" size={24} color="white" />
            </View>
            <Text style={{ fontWeight: '500', color: Colors.grey[500], fontSize: 13 }}>Category</Text>
          </View>
        </View>
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