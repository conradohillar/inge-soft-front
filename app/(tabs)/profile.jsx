import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';

const Profile = () => {
  return (
    <SafeAreaView className="h-full w-full bg-primary">
      <Header />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})