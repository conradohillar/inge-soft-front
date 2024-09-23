import { Image, TouchableOpacity, Text, View } from 'react-native'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { Avatar, Button, XStack, YStack } from 'tamagui';
import icons from "../../constants/icons"
import { History } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import ProfilePictureModal from '../../components/PofilePictureModal';
import * as ImagePicker from 'expo-image-picker';
import { all } from 'axios';
import { set } from 'date-fns';

const Profile = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if(!result.canceled){
        await setImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      alert(error.message);
      setModalVisible(false);
    }
  };

  const saveImage = async () => {
    try {
      setImage(image);
      setModalVisible(false);
    } catch (error) {
      throw(error);
    }
  };

  const handleChooseFromLibrary = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
      toggleModal();
    });
  };

  const handleTakePicture = () => {
    uploadImage();
    
  };

  const handleDeletePicture = () => {
    setProfileImage(null);
    toggleModal();
  };

  return (
    <SafeAreaView className="bg-background">
        <Header />
        <YStack className="h-full items-center justify-evenly">
          <YStack className="h-[15%] items-center justify-evenly">
            <XStack className="w-[90%] items-center justify-start">
            <View className="flex-1 justify-center items-center">
              <TouchableOpacity onPress={toggleModal}>
                <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
                  <Avatar.Image
                    accessibilityLabel="Cam"
                    src={image}
                  />
                  <Avatar.Fallback backgroundColor="$gray5" />
                </Avatar>
                <ProfilePictureModal
                  isVisible={isModalVisible}
                  onClose={toggleModal}
                  onChooseFromLibrary={handleChooseFromLibrary}
                  onTakePicture={handleTakePicture}
                  onDeletePicture={handleDeletePicture}
                />
              </TouchableOpacity>
            </View>
              <YStack className="items-start justify-evenly ml-5">
                <XStack className="items-center">
                  <Text className="text-black text-lg font-qbold">Camila Lee</Text>
                  <Button className="h-5 w-5 bg-background ml-2">
                    <Image source={icons.pencil} className="h-4 w-4" tintColor="#aaa" resizeMode='contain'/> 
                  </Button>
                </XStack>     
                <Text className="text-gray-600 text-base font-qsemibold">camilee@gmail.com</Text>     
              </YStack>
            </XStack>
          </YStack>
          <YStack className="w-full">
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.car} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Link href="/(pages)/MyCarsPage" asChild>
                  <Text className="text-xl text-black font-qbold">Mis autos</Text>
                </Link> 
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.history} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Historial</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.map} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/> 
                <Text className="text-xl text-black font-qbold">Próximos viajes</Text>
              </XStack>
            </View>
            <View className="w-full h-[17%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
              <XStack className="w-[80%] items-center justify-start space-x-5" >
                <Image source={icons.id_card} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Link href="/(pages)/CredentialsPage" asChild>
                  <Text className="text-xl text-black font-qbold">Credenciales</Text>
                </Link>
              </XStack>
            </View>
          </YStack>
        </YStack>
    </SafeAreaView>
  )
}

export default Profile;