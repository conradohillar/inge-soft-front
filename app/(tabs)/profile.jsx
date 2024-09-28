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
import axios from 'axios';
import * as FileSystem from 'expo-file-system'
import { API_KEY_IMGBB } from '@env';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const Profile = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <Content />
    </QueryClientProvider>
  )
};

function Content() {
  const [isModalVisible, setModalVisible] = useState(false);


  //REVISAR ESTA FUNCION
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [image, setImage] = useState(icons.placeholder_profile);
  const [deleteUrl, setDeleteUrl] = useState(null);


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

  const saveImage = async (uri) => {
    try {
      const imageData = await sendImageToServer(uri);
      setDeleteUrl(imageData.deleteUrl);
      setImage(imageData.url);

      setModalVisible(false);
    } catch (error) {
      throw(error);
    }
  };

  //AGREGAR FUNCION PARA ELIMINAR IMAGEN DEL BACK
  const removeImage = async () => {
    try {
      setImage(null);
      setModalVisible(false);
    } catch ({message}) {
      alert(message);
      setModalVisible(false);
    }
  };
}




  

  

  
  
  const sendImageToServer = async (imageUri) => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const body = new FormData();
      body.append('image', base64Image);

      axios.defaults.timeout = 10000;

      const res = await axios({
        method: 'post',
        url: `https://api.imgbb.com/1/upload?expiration=600&key=${API_KEY_IMGBB}`,
        data: body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        const responseData = res.data;

        if (responseData.success) {
          console.log("Image uploaded successfully:", responseData.data.url);

          //TODO: Retornar URL de la imagen subida y URL de eliminación

          return {
            url: responseData.data.url,
            deleteUrl: responseData.delete_url, 
          }

        } else {
          console.log(res);
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
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
  );

export default Profile;