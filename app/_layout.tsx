import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/AuthContext';

import { useColorScheme } from '@/hooks/use-color-scheme';
// 1. CAMBIO AQUÍ: Importamos la nueva función desde tu archivo db centralizado
import { initDatabase } from '@/database/usuarios';

export const unstable_settings = {
  anchor: 'Inicio',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const inicializar = async () => {
      try {
        await initDatabase(); 
        console.log('¡Base de datos de Rosus inicializada con éxito!');
      } catch (error) {
        console.error(
          'Error inicializando la BD de Rosus:',
          error
        );
      }
    };

    inicializar();
  }, []);

  return (
     <AuthProvider>
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="mostrar" options={{ headerShown: true,
          
      title: 'Datos del cliente',
      headerStyle: {
      backgroundColor: "#0D6337",
    },
         }}   />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthProvider>
  );
}