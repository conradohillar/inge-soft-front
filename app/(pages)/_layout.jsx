import { Stack } from 'expo-router'


const PagesLayout = () => {
  return (

    <>
      <Stack>
        
        <Stack.Screen name="FrontPage" options={{headerShown: false}}/>
        <Stack.Screen name="LoadingPage" options={{headerShown: false}}/>
        <Stack.Screen name="ErrorPage" options={{headerShown: false}}/>
        <Stack.Screen name="LandingPage" options={{headerShown: false}}/>
        <Stack.Screen name="SearchTripPage" options={{headerShown: false}}/>
        <Stack.Screen name="SearchResultsPage" options={{headerShown: false}}/>
        <Stack.Screen name="SearchTripPerson" options={{headerShown: false}}/>
        <Stack.Screen name="SearchTripPackage" options={{headerShown: false}}/>
        <Stack.Screen name="SendPackagePage2" options={{headerShown: false}}/>
        <Stack.Screen name="PostTripPage" options={{headerShown: false}}/>
        <Stack.Screen name="PostTripPage2" options={{headerShown: false}}/>
        <Stack.Screen name="PostSuccessful" options={{headerShown: false}}/>
        <Stack.Screen name="MyCarsPage" options={{headerShown: false}}/>
        <Stack.Screen name="AddCarPage" options={{headerShown: false}}/>
        <Stack.Screen name="CredentialsPage" options={{headerShown: false}}/>
      </Stack> 
    </>

  )
}

export default PagesLayout