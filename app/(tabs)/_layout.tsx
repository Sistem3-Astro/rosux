import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FormProvider } from '@/context/FormContext'; 
import { TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { Modal, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {logout} = useAuth();
  const [visible, setVisible] = useState(false);
  
  const Session = () => {
    Alert.alert(
    "Salir",
    "¿Desea cerrar sesion? Volvera a iniciar sesión",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Si",
        style: "destructive",
        onPress: () => {          
          Alert.alert("Sacimex", "Vuelve pronto");
          logout();
          router.replace("/login");
        },
      },
    ],
    { cancelable: true }
  );  
  };

  
 

  return ( 
    <FormProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 25 }} onPress={Session}
      >
        <Text>
          <AntDesign name="poweroff" size={30} color="black" />
        </Text>
      </TouchableOpacity>
        ),
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
      title: 'Actividad Economica',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    }}
      
  />
   <Tabs.Screen
    name="datos/credito"
    options={{ href: null,
      headerShown: true,
      title: 'Credito',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    }}
  />
   <Tabs.Screen
    name="datos/ingreso"
    options={{ href: null,
      headerShown: true,
      title: 'Ingresos economicos',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    }}
  />
    <Tabs.Screen
    name="datos/egreso"
    options={{ href: null,
      headerShown: true,
      title: 'Egresos economicos',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
    }}
  />
  <Tabs.Screen
    name="datos/beneficiario"
    options={{ href: null,
      headerShown: true,
      title: 'Beneficiario',
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
    }}
  />
     </Tabs>
    </FormProvider>
  );
} 
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D6337",
    justifyContent: "center",
    alignItems: "center",
  },
  nombre1: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left", 
    color: "#92acf5",    
    alignSelf: "flex-end",
  },

})