export default {
    "expo": {
        "name": "kuvera",
        "slug": "kuvera",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./assets/images/icon.png",
        "scheme": "kuveraapp",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "supportsTablet": true,
            "googleServicesFile": "./GoogleService-Info.plist",
        },
        "android": {
            "package": "com.rjshub.kuvera",
            "adaptiveIcon": {
                "backgroundColor": "#E6F4FE",
                "foregroundImage": "./assets/images/android-icon-foreground.png",
                "backgroundImage": "./assets/images/android-icon-background.png",
                "monochromeImage": "./assets/images/android-icon-monochrome.png"
            },
            "edgeToEdgeEnabled": true,
            "predictiveBackGestureEnabled": false,
            "googleServicesFile": "./google-services.json",
        },
        "web": {
            "output": "static",
            "favicon": "./assets/images/favicon.png"
        },
        "plugins": [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/splash-icon.png",
                    "imageWidth": 200,
                    "resizeMode": "contain",
                    "backgroundColor": "#ffffff",
                    "dark": {
                        "backgroundColor": "#000000"
                    }
                }
            ],
            [
                "expo-secure-store",
                {
                    "configureAndroidBackup": true,
                    "faceIDPermission": "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
                }
            ],
            ["@react-native-google-signin/google-signin"],

        ],
        "experiments": {
            "typedRoutes": true,
            "reactCompiler": true
        }
    }
};
