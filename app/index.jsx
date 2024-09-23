import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme, } from "tamagui";
import config from "../tamagui.config";
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import FrontPage from './(pages)/FrontPage';
import LandingPage from './(pages)/LandingPage';
import { useFonts } from 'expo-font';

export default function App() {
  const colorScheme = useColorScheme();

  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter_18pt-Regular.ttf'), // No se usa para nada, pero si no se carga tira warning
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        // Evita que se oculte la pantalla de carga automáticamente
        await SplashScreen.preventAutoHideAsync();
        // Aquí puedes cargar cualquier recurso necesario
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulación de carga
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return <FrontPage />;
  }

  return (
    
      <TamaguiProvider config={config}>
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <LandingPage />
          <StatusBar theme="dark" />
        </Theme>
      </TamaguiProvider>
    

  );
}