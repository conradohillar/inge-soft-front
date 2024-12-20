import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import FrontPage from "./(pages)/FrontPage";
import LandingPage from "./(pages)/LandingPage";
import { useFonts } from "expo-font";
import { useGlobalState } from "./_layout";
import registerNNPushToken from "native-notify";
import { setToken } from "../services/utils";

export default function App() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const { globalState, setGlobalState } = useGlobalState();
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Quicksand-Semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });
  registerNNPushToken(25312, "s6wtyVfup1RTspXItRRyqB");
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await new Promise((resolve) => setTimeout(resolve, 3000));
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
    return (
      <>
        <FrontPage />
        <StatusBar theme="dark" />
      </>
    );
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <LandingPage />
      </Theme>
    </TamaguiProvider>
  );
}
