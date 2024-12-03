import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, createContext, useContext, useState } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import icons from "../constants/icons";
SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();
const GlobalStateContext = createContext();

const RootLayout = () => {
  const [globalState, setGlobalState] = useState({
    fullName: "User",
    firstName: "User",
    email: "",
    photoUrl: icons.placeholder_profile,
    isLoggedIn: false,
    isDriver: false,
    userId: null,
  });

  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
        <AutocompleteDropdownContextProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          </Stack>
        </AutocompleteDropdownContextProvider>
      </GlobalStateContext.Provider>
    </QueryClientProvider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);

export default RootLayout;
