import { TextInput } from "@/components/text-input/text-input";
import environment from "@/constants/environment";
import { Colors } from "@/constants/theme";
import { asyncLogoutGoogle, asyncSetAuthUser, asyncSignInWithGoogle } from "@/states/auth-user/action";
import { Image } from "expo-image";
import { Formik } from "formik";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { LoginSchema, ValuesFormLoginType } from "../../../helper/validation/login-validation";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const handleLogin = (values: ValuesFormLoginType) => {
    console.log("Data login", values);
    const dataUser = {
      name: "rizat"
    };
    dispatch(asyncSetAuthUser({
      dataUser
    }) as any)
  }

  const handleForgotPassword = () => {
    console.log("oke in press", environment.BASE_URL)
  }

  const handleButtonRegister = () => {
    console.log("oke regist")
  }

  const handleSignInGoogle = () => {
    dispatch(asyncSignInWithGoogle() as any)
  }

  const handleLogoutGoogle = () => {
    dispatch(asyncLogoutGoogle() as any)
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Image source={require('@/assets/images/icon.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain" />
      </View>
      <View>
        <Text style={styles.title}>Kuvera</Text>
        <Text style={{ color: Colors.grey[700], fontWeight: "500" }}>
          Manage Money, Control Life
        </Text>
        <Text style={{ color: Colors.grey[700], fontWeight: "500", marginBottom: 20 }}>
          Sign in and achieve your financial goals.
        </Text>
      </View>
      <View style={styles.viewForm}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            handleLogin(values)
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              {/* Input Email */}
              <View>
                <TextInput
                  accessible={true}
                  label="Email Address"
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={errors.email && touched.email ? errors.email : ""}
                />
              </View>

              {/* Input Password */}
              <View style={{ marginTop: 23 }}>
                <TextInput
                  label="Password"
                  placeholder="Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  errorMessage={errors.password && touched.password ? errors.password : ""}
                />
              </View>

              {/* Forgot password */}
              <TouchableOpacity style={[styles.buttonForgotPassword, { paddingTop: 15 }]} onPress={() => handleForgotPassword()}>
                <Text style={styles.buttonTextFogotPassword}>Forgot password ?</Text>
              </TouchableOpacity>

              {/* Button */}
              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* Button register */}
        <View style={{ flexDirection: "row", paddingTop: 20 }}>
          <Text style={{ color: Colors.grey[500] }}>Not have a account ? </Text>
          <TouchableOpacity style={styles.buttonForgotPassword} onPress={() => handleButtonRegister()}>
            <Text style={styles.buttonTextFogotPassword}>Register Now</Text>
          </TouchableOpacity>
        </View>

        {/* Line */}
        <View style={styles.line} />

        <View>
          <Text style={{ color: Colors.grey[500], textAlign: "center" }}>Or continue with</Text>
          <TouchableOpacity style={styles.buttonSingInGoogle} onPress={() => handleSignInGoogle()}>
            <Image
              source={require('@/assets/images/google-icon.webp')}
              style={{ width: 30, height: 30 }}
              contentFit="contain"
            />
            <Text style={{ fontWeight: "bold" }}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => handleLogoutGoogle()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: "flex-start",
    paddingHorizontal: 20, paddingTop: 40,
    backgroundColor: "#fff"
  },
  viewForm: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  error: { color: "red", fontSize: 12, paddingTop: 2, paddingLeft: 12 },
  button: {
    backgroundColor: Colors.tealKuvera,
    padding: 13,
    borderRadius: 8,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  buttonForgotPassword: {
    padding: 0,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonTextFogotPassword: { color: Colors.tealKuvera, fontWeight: "bold", fontSize: 14 },
  line: {
    marginVertical: 25,
    width: "100%",
    height: 0.8,
    backgroundColor: Colors.grey[400],
  },
  buttonSingInGoogle: {
    marginTop: 10,
    backgroundColor: "white",
    paddingVertical: 10, paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center", alignItems: "center",
    gap: 10,
    borderWidth: 0.5,
    borderColor: Colors.grey[200]
  }
});