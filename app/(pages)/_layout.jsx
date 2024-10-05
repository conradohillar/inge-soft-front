import { Stack } from 'expo-router'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'


const PagesLayout = () => {
  return (
    <>
      <AutocompleteDropdownContextProvider>
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
          <Stack.Screen name="TripHistoryDetail" />
        </Stack>
      </AutocompleteDropdownContextProvider>
    </>
  );
};


export default PagesLayout