import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FormProvider } from '@/context/FormContext'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();
 

  return (
    <FormProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
    
    <Tabs.Screen
    name="formu"
    options={{
      title: "Formulario",
      headerShown: true,
      headerTitle: "Formulario",
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    headerTintColor: "#fff",
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="doc.text.fill" color={color} />
      ),
    }}
  />
   <Tabs.Screen
    name="explore"
    options={{
      title: "Explore",
      headerShown: true,
      headerTitle: "Visualizar",
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    headerTintColor: "#fff",
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="doc.text.fill" color={color} />
      ),
    }}
  />
    </Tabs>
    </FormProvider>
  );
}
