import CustomText from "@/components/custom-text";
import AccountTabsCard from "@/components/page/profile/account-tabs";
import ButtonLogout from "@/components/page/profile/button-logout";
import OtherTabs from "@/components/page/profile/other-tabs";
import environment from "@/constants/environment";
import { Colors } from "@/constants/theme";
import { useAppSelector } from "@/states";
import { AuthUserType } from "@/states/auth-user/type";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const authUser: AuthUserType = useAppSelector((states) => states.authUser);

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <ScrollView>
        {/* Photo user */}
        <View style={{ marginHorizontal: 18, marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            <View style={styles.containerAvatar} >
              <Image
                style={{ height: 65, width: 65, borderRadius: 1000, overflow: 'hidden' }}
                contentFit='contain'
                source={authUser.photo_profile_url} />
              <View style={styles.containerEdit}>
                <Feather name="edit-3" size={20} color="grey" />
              </View>
            </View>
            <View>
              <CustomText style={{ fontWeight: 600, fontSize: 19, textTransform: 'capitalize' }}>{authUser.name}</CustomText>
              <CustomText style={{ fontSize: 16, fontWeight: 500 }}>{authUser.email}</CustomText>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={styles.iconNotif}>
              <Ionicons name="notifications" size={22} color={Colors.tealKuvera} />
            </View>
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
    </SafeAreaView>
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