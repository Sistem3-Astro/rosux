import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
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
        console.log('Base de datos inicializada');
      } catch (error) {
        console.error(
          'Error inicializando la BD:',
          error
        );
      }
    };

    inicializar();
  }, []);

  return (
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Stack>
<<<<<<< HEAD
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Modal',
          }}
        />
=======
         <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
>>>>>>> 7374f32958edb4b5d0d699057bba3f2bf1e518f8
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}