import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';

const Trips = () => {
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <Header />
    </SafeAreaView>
  )
}

export default Trips