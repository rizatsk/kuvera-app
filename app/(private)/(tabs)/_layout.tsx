import React from 'react';

import CutomTabs from '@/components/custom-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CutomTabs {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }} />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
        }} />
      <Tabs.Screen
        name="idx"
        options={{
          title: "Saham IDX",
        }} />
      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
        }} />
    </Tabs>
  )
}
