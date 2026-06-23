import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FormProvider } from '@/context/FormContext'; 
import { TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Text } from "react-native";
import { AuthProvider } from '@/context/AuthContext';
import { initDatabase } from '@/database/usuarios';

export default function TabLayout() {
  const colorScheme = useColorScheme();
 
useEffect(() => {
  const startDB = async () => {
    try {
      await initDatabase();
      console.log('DB lista');
    } catch (error) {
      console.log('Error DB:', error);
    }
  };

  startDB();
}, []);
  return ( 
    <AuthProvider>
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
     headerRight: () => (
      <TouchableOpacity
    style={{ marginRight: 25 }}
    onPress={() => Alert.alert("Cerrar sesión")}
  >
    <Text style={{ color: "#fff", fontSize: 16 }}>
      Salir
    </Text>
  </TouchableOpacity>
    ),
      tabBarIcon: ({ color }) => (
        <IconSymbol size={28} name="doc.text.fill" color={color} />
      ),
    }}
  />
  <Tabs.Screen
    name="datos/vivienda"
    options={{ href: null,
      headerShown: true,
      title: 'Vivienda',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    }}
      
  />
  <Tabs.Screen
    name="datos/actividad"
    options={{ href: null,
      headerShown: true,
      title: 'Actividad',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
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
  </AuthProvider>
  );
}
