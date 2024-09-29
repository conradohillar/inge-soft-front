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
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system'
import { useState, useEffect } from "react";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query'
import ProfilePictureModal from '../../components/PofilePictureModal';


const queryClient = new QueryClient()

export default function Profile() {
    return (
        <QueryClientProvider client={queryClient} >
            <Content />
        </QueryClientProvider>
    )

} 

function Content(){
  
  const [token, setToken] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(icons.placeholder_profile);
  

  //REVISAR ESTA FUNCION
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const uploadImage = async (mode) => {
    try {

      let result = {}

      if(mode === 'gallery'){
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

      } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }

      if(!result.canceled){
        saveImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      alert(error.message);
      setModalVisible(false);
    }
  };
  const edit_image = useMutation({
    mutationFn: (base64Image) => {
      const body = {
        base_64_image: base64Image,
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      return axios.put(`http://${LOCAL_IP}:8000/users/edit/photo`, body, {
        headers,
        timeout: 25000,
      });
    },
    onSuccess: (data) => {
      setImage(data.data.photo_url);
    },
    onError: (error) => {
      console.error("Error al editar la imagen:", error.message);
    },
  });
  
  const saveImage = async (imageUri) => {
    try {
      
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    
      edit_image.mutate(base64Image);
      
    } catch (error) {
      throw(error);
    }

      
    
  };

  //AGREGAR FUNCION PARA ELIMINAR IMAGEN DEL BACK
  const removeImage = async () => {
    try {
      //llamado al back para borrar la imagen
      setImage(null);
      setModalVisible(false);
      
    } catch ({message}) {
      alert(message);
      setModalVisible(false);
    }
  };
  const handleChooseFromLibrary = () => {
    uploadImage('gallery');
  };

  const handleTakePicture = () => {
    uploadImage();
  };

  const handleDeletePicture = () => {
    removeImage();
  };



  //--------------------------------------------------------------------------------


  useEffect(() => {
      const fetchToken = async () => {
          try {
              const storedToken = await SecureStore.getItemAsync('token');
              if (storedToken) {
                  setToken(storedToken);
              }
          } catch (error) {
              console.error('Error fetching token from SecureStore', error);
          }
      };

      fetchToken();
  }, []);

  const url = `http://${LOCAL_IP}:8000/auth/users/me`
  
  const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
  };
  

  const { isPending, error, data } = useQuery({
      queryKey: ['fetchUserData'],
      queryFn: () =>
          fetch(url, {headers} ).then((res) =>
              res.json(),
          ),
          enabled: !!token,

  })

  if (isPending) {
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
                    <Image source={icons.pencil} className="h-4 w-4" tintColor="#aaa" resizeMode='contain'/> 
                  </Button>
                </XStack>     
                <Text className="text-gray-600 text-base font-qsemibold">{data.email}</Text>     
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