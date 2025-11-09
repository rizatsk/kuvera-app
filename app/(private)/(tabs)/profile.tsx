import CustomText from "@/components/custom-text";
import AccountTabsCard from "@/components/page/profile/account-tabs";
import ButtonLogout from "@/components/page/profile/button-logout";
import OtherTabs from "@/components/page/profile/other-tabs";
import environment from "@/constants/environment";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/states";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function ProfileScreen() {
  const authUser = useAppSelector((states) => states.authUser);

  return (
    <ScreenContentWrapper style={styles.container}>
      <ScrollView>
        {/* Background atas */}
        <View style={{ flex: 1 }}>
          <View style={styles.arcStyle} />
          <View style={{ marginTop: 50, marginHorizontal: 14 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <View style={styles.iconNotif}>
                <Ionicons name="notifications" size={22} color={Colors.tealKuvera} />
              </View>
            </View>
          </View>
        </View>
        {/* Photo user */}
        <View style={{ marginHorizontal: 18, marginTop: -25, flexDirection: 'row', gap: 15, alignItems: 'center'}}>
          <View style={styles.containerAvatar} >
            <Image
              style={{ height: 70, width: 70 }}
              contentFit='fill'
              source={require("@/assets/images/icon/avatar-men.png")} />
            <View style={styles.containerEdit}>
              <Feather name="edit-3" size={20} color="grey" />
            </View>
          </View>
          <View>
            <CustomText style={{ fontWeight: 600, fontSize: 19 }}>Rizat Sakmir</CustomText>
            <CustomText style={{ fontSize: 16, fontWeight: 500 }}>rizatsakmir@gmail.com</CustomText>
          </View>
        </View>
        <AccountTabsCard />
        <OtherTabs />
        <ButtonLogout />
        <View style={{ marginHorizontal: 18 }}>
          <CustomText style={{ marginVertical: 20, textAlign: 'center' }}>Kuvera an easy-to-use income and expense management application, equipped with real-time price information for Antam Gold and the IHSG stock index. All your financial data is safe and guaranteed.</CustomText>
          <CustomText style={styles.versionApp}>Version {environment.VERSION_APP}</CustomText>
        </View>
      </ScrollView>
    </ScreenContentWrapper >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fullScreenBackground: {
    height: '100%',
    width: '100%',
  },
  arcStyle: {
    position: 'absolute',
    width: '100%',
    height: 135,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 0,
    backgroundColor: Colors.tealLightKuvera,
    // transform: [{ scaleX: 1.4 }, { scaleY: 1 }],
  },
  iconNotif: {
    backgroundColor: Colors.whiteTransaparent,
    borderRadius: 10,
    width: 32, height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.tealKuvera
  },
  containerAvatar: {
    backgroundColor: "white",
    height: 70,
    width: 70,
    alignItems: 'center',
    borderRadius: 10000,
    borderColor: Colors.tealKuvera,
    borderWidth: 3,
  },
  containerEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    borderWidth: 4,
    borderColor: Colors.greyBackground,
    backgroundColor: Colors.greyBackground2,
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  versionApp: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    color: Colors.grey[500]
  }
})