import { Stack } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PagesLayout = () => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          className={"h-full"}
        >
          <SafeAreaView className="bg-background h-full w-full">
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="FrontPage" />
              <Stack.Screen name="LoadingPage" />
              <Stack.Screen name="ErrorPage" />
              <Stack.Screen name="LandingPage" />
              <Stack.Screen name="SearchTripPage" />
              <Stack.Screen name="SearchResultsPage" />
              <Stack.Screen name="SearchTripPerson" />
              <Stack.Screen name="SearchTripPackage" />
              <Stack.Screen name="PostTripPage" />
              <Stack.Screen name="PostTripPage2" />
              <Stack.Screen name="PostSuccessful" />
              <Stack.Screen name="MyCarsPage" />
              <Stack.Screen name="AddCarPage" />
              <Stack.Screen name="CredentialsPage" />
              <Stack.Screen name="TripsPage" />
              <Stack.Screen name="NewCredentialsSuccessful" />
              <Stack.Screen name="TripSearchDetail" />
              <Stack.Screen name="TripDetailForRider" />
              <Stack.Screen name="TripHistoryDetailForDriver" />
              <Stack.Screen name="TripUpcomingDetailForDriver" />
              <Stack.Screen name="UserProfile" />
              <Stack.Screen name="ChatPage" />
              <Stack.Screen name="TestNots" />
            </Stack>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </>
  );
};

export default PagesLayout;
