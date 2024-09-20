import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { YStack } from 'tamagui';

const Trips = () => {
  return (
    <SafeAreaView className="h-full w-full bg-background2">
      <Header />
      <YStack className="h-full items-center justify-evenly bg-background">      
      </YStack>
    </SafeAreaView>
  )
}

export default Trips