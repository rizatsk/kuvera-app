import { Colors } from '@/constants/theme';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text } from '@react-navigation/elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CutomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ backgroundColor: "white", width: '100%', height: 80 }}>
      <View style={style.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const color = isFocused ? "white" : Colors.grey[200];
          const IconComponent = () => {
            switch (label) {
              case 'Home':
                return <Octicons name="home" size={20} color={color} />;
              case 'Account':
                return <Feather name="user" size={20} color={color} />;
              default:
                return <MaterialCommunityIcons name="react" size={20} color={color} />;
            }
          }

          return (
            <TouchableOpacity
              activeOpacity={0.6}
              key={label as string}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ gap: 1, alignItems: 'center' }}
            >
              <IconComponent />
              <Text style={{ color: color, fontSize: 12, fontWeight: '700' }}>
                {label as string}
              </Text>
              {isFocused && (
                <View style={{backgroundColor: color, height: 3, width: "130%", borderRadius: 100}}></View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    backgroundColor: Colors.tealKuvera2,
    borderColor: Colors.tealKuvera,
    borderWidth: 2,
  }
})