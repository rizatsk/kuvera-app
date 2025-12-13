export default {
    "expo": {
        "name": "Kuvera",
        "slug": "Kuvera",
        "version": "1.2.1",
        "orientation": "portrait",
        "icon": "./assets/images/foreground-icon.png",
        "scheme": "kuveraapp",
        "userInterfaceStyle": "automatic",
        "newArchEnabled": true,
        "ios": {
            "buildNumber": "1",
            "bundleIdentifier": "com.rjshubkuvera",
            "supportsTablet": true,
            "googleServicesFile": "./GoogleService-Info.plist",
        },
        "android": {
            "versionCode": 1,
            "package": "com.rjshubkuvera",
            "adaptiveIcon": {
                "backgroundColor": "#ffffff",
                "foregroundImage": "./assets/images/foreground-icon.png",
            },
            "edgeToEdgeEnabled": true,
            "predictiveBackGestureEnabled": false,
            "googleServicesFile": "./google-services.json",
            "buildType": "apk"
        },
        "plugins": [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    "image": "./assets/images/kuvera-vertical.png",
                    "imageWidth": 160,
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
                    "faceIDPermission": "Allow Kuvera to access your Face ID biometric data."
                }
            ],
            ["@react-native-google-signin/google-signin"],
            [
                "expo-image-picker",
                {
                    "cameraPermission": "Allow Kuvera to access your camera",
                    "photosPermission": "Allow Kuvera to access your microphone",
                    "microphonePermission": "Allow Kuvera to access your microphone",
                }
            ],
        ],
        "experiments": {
            "typedRoutes": true,
            "reactCompiler": true
        },
        "extra": {
            "eas": {
                "projectId": "c8680eee-ff98-455b-b989-46b2cf9d6118"
            }
        }
    }
};
