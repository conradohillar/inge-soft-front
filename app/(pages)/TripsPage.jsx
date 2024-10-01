import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { YStack } from 'tamagui';
import HorizontalTabs from '../../components/HorizontalTabs';

export default function TripsPage(){
  return (
    <SafeAreaView className="h-full w-full bg-background">
      <Header />
      <YStack className="h-full items-center justify-evenly bg-background">
        <HorizontalTabs />      
      </YStack>
    </SafeAreaView>
  )
}

