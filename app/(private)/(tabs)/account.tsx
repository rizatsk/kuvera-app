import CustomText from "@/components/custom-text";
import AccountTabsCard from "@/components/page/account/account-tabs";
import ButtonLogout from "@/components/page/account/button-logout";
import OtherTabs from "@/components/page/account/other-tabs";
import environment from "@/constants/environment";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/states";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";

export default function AccountScreen() {
  const authUser = useAppSelector((states) => states.authUser);

  return (
    <ScreenContentWrapper style={styles.container}>
      <ScrollView>
        {/* Background atas */}
        <View>
          <View style={styles.arcStyle}>
            <Image
              style={styles.fullScreenBackground}
              contentFit='contain'
              source={require("@/assets/images/bg-batik.webp")} />
          </View>
        </View>
        {/* Photo user */}
        <View style={{ alignItems: "center" }}>
          <View>
            <View style={styles.containerAvatar} >
              <Image
                style={{ height: 110, width: 110 }}
                contentFit='fill'
                source={require("@/assets/images/icon/avatar-men.png")} />
              <View style={styles.containerEdit}>
                <Feather name="edit-3" size={20} color="grey" />
              </View>
            </View>
          </View>
          <CustomText style={{ marginTop: -50, fontWeight: 600, fontSize: 18 }}>Rizat Sakmir</CustomText>
          <CustomText style={{ fontSize: 15 }}>rizatsakmir@gmail.com</CustomText>
        </View>
        <AccountTabsCard />
        <OtherTabs />
        <ButtonLogout />
        <CustomText style={styles.versionApp}>{environment.VERSION_APP}</CustomText>
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
    opacity: 0.3,
  },
  arcStyle: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    backgroundColor: Colors.greyBackground2,
    transform: [{ scaleX: 1.9 }, { scaleY: 1 }],
  },
  containerAvatar: {
    backgroundColor: Colors.greyBackground,
    height: 110,
    width: 110,
    alignItems: 'center',
    borderRadius: 10000,
    borderColor: Colors.tealKuvera,
    borderWidth: 3,
    transform: [{ translateY: -65 }]
  },
  containerEdit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    borderWidth: 4,
    borderColor: Colors.greyBackground,
    backgroundColor: Colors.greyBackground2,
    borderRadius: 10000,
    justifyContent: 'center',
    alignItems: 'center'
  },
  versionApp: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 16,
    color: Colors.grey[500]
  }
})