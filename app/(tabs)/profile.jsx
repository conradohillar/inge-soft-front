import { Image, TouchableOpacity, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header';
import { Avatar, Button, XStack, YStack } from 'tamagui';
import icons from "../../constants/icons"
import { History } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { LOCAL_IP } from '@env'
import LoadingPage from '../(pages)/LoadingPage'
import ErrorPage from "../(pages)/ErrorPage";
import * as FileSystem from 'expo-file-system'
import { useState, useEffect } from "react";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import {  useQuery, useMutation } from '@tanstack/react-query'
import ProfilePictureModal from '../../components/PofilePictureModal';
import { getUserData, deleteImage, newImage } from '../../services/users';


export default function Profile() {


  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(icons.placeholder_profile);



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const uploadImage = async (mode) => {
    try {

      let result = {}

      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });

      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
      }

      if (!result.canceled) {
        saveImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      alert(error.message);
      setModalVisible(false);
    }
  };
  
  

  const saveImage = async (imageUri) => {
    try {

      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      editImage.mutate(base64Image);

    } catch (error) {
      throw (error);
    }

  };

  const editImage = useMutation({
    mutationFn: (base64Image) => newImage(base64Image),
    onSuccess: (data) => {
      setImage(data.data.photo_url);
    },
    onError: (error) => {
      console.error("Error al editar la imagen:", error.message);
    },
  });

  const removeImage = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      setImage(icons.placeholder_profile);
    },
    onError: (error) => {
      throw (error);
    },
  });


  const handleDeletePicture =  () => {
    removeImage.mutate();
    setModalVisible(false);
  };

  const handleChooseFromLibrary = () => {
    uploadImage('gallery');
  };

  const handleTakePicture = () => {
    uploadImage();
  };

const { isLoading, error, data } = useQuery({
    queryKey: ['getUserData'],
    queryFn: getUserData,
  });

  useEffect(() => {
    if(data.photo_url != null){
      setImage(data.photo_url)
    }
  }, [data])

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

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
                <Text className="text-black text-lg font-qbold">{data.name}</Text>
                <Button className="h-5 w-5 bg-background ml-2">
                  <Image source={icons.pencil} className="h-4 w-4" tintColor="#aaa" resizeMode='contain' />
                </Button>
              </XStack>
              <Text className="text-gray-600 text-base font-qsemibold">{data.email}</Text>
            </YStack>
          </XStack>
        </YStack>
        <YStack className="w-full h-[70%]">
          <View className="w-full h-[20%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
            <XStack className="w-[80%] items-center justify-start space-x-5" >
              <Image source={icons.car} className="h-6 w-6" tintColor="#aaa" resizeMode='contain' />
              <Link href="/(pages)/MyCarsPage" asChild>
                <Text className="text-xl text-black font-qbold">Mis autos</Text>
              </Link>
            </XStack>
          </View>
          <View className="w-full h-[20%] items-center justify-center" borderTopColor="#ddd" borderTopWidth={2}>
            <XStack className="w-[80%] items-center justify-start space-x-5" >
              <Image source={icons.id_card} className="h-6 w-6" tintColor="#aaa" resizeMode='contain' />
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