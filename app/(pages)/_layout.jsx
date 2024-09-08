import { Stack } from 'expo-router'

const PagesLayout = () => {
  return (

    <>
      <Stack>
        <Stack.Screen name="SearchTripPage" options={{headerShown: false}}/>
        <Stack.Screen name="TripDetailsPage" options={{headerShown: false}}/>
        <Stack.Screen name="SearchResultsPage" options={{headerShown: false}}/>
        <Stack.Screen name="PostTripPage" options={{headerShown: false}}/>
        <Stack.Screen name="PostTripPage2" options={{headerShown: false}}/>
      </Stack> 
    </>

  )
}

export default PagesLayout