import { Image, TouchableOpacity, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Avatar, Button, XStack, YStack } from "tamagui";
import icons from "../../constants/icons";
import { History } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { LOCAL_IP } from "@env";
import LoadingPage from "../(pages)/LoadingPage";
import ErrorPage from "../(pages)/ErrorPage";
import * as FileSystem from "expo-file-system";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProfilePictureModal from "../../components/PofilePictureModal";
import RateCommentModal from "../../components/RateCommentModal";
import AddCarModal from "../../components/AddCarModal";
import {
  getUserData,
  deleteImage,
  newImage,
  newName,
} from "../../services/users";
import EditNameModal from "../../components/EditNameModal";
import { useGlobalState } from "../_layout";

export default function Profile() {
  const { globalState, setGlobalState } = useGlobalState();

  console.log("Global state: ", globalState);

  const [isProfilePictureModalVisible, setProfilePictureModalVisible] =
    useState(false);
  const [isEditNameModalVisible, setEditNameModalVisible] = useState(false);

  const [isRateCommentModalVisible, setRateCommentModalVisible] =
    useState(false);

  const toggleRateCommentModal = () => {
    setRateCommentModalVisible(!isRateCommentModalVisible);
  };

  const toggleProfilePictureModal = () => {
    setProfilePictureModalVisible(!isProfilePictureModalVisible);
  };

  const toggleEditNameModal = () => {
    setEditNameModalVisible(!isEditNameModalVisible);
  };

  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === "gallery") {
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
        setProfilePictureModalVisible(false);
      }
    } catch (error) {
      alert(error.message);
      setProfilePictureModalVisible(false);
    }
  };

  const saveImage = async (imageUri) => {
    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      editImage.mutate(base64Image);
    } catch (error) {
      throw error;
    }
  };

  const editImage = useMutation({
    mutationFn: (base64Image) => newImage(base64Image),
    onSuccess: (data) => {
      setGlobalState({
        ...globalState,
        photoUrl: data.photo_url,
      });
    },
    onError: (error) => {
      console.error("Error al editar la imagen:", error.message);
    },
  });

  const handleDeletePicture = () => {
    removeImage.mutate();
    setProfilePictureModalVisible(false);
  };

  const handleChooseFromLibrary = () => {
    uploadImage("gallery");
  };

  const handleTakePicture = () => {
    uploadImage();
  };

  const removeImage = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      setGlobalState({
        ...globalState,
        photoUrl: icons.placeholder_profile,
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const saveNewName = useMutation({
    mutationFn: (name) => newName(name),
    onSuccess: (data) => {
      setGlobalState({
        ...globalState,
        firstName: data.name.split(" ")[0],
        fullName: data.name,
      });
    },
  });

  const handleSaveName = async () => {
    if (globalState.fullName === "") {
      alert("El nombre no puede estar vacio.");
      return;
    }
    saveNewName.mutate(globalState.fullName);
    toggleEditNameModal();
  };

  const handleRestrictedAccess = (message) => {
    alert(message);
  };

  return (
    <YStack className="h-full items-center justify-evenly bg-background">
      <YStack className="h-[15%] items-center justify-evenly">
        <XStack className="w-[90%] items-center justify-start">
          <View className="flex-1 justify-center items-center pt-4">
            <TouchableOpacity onPress={toggleProfilePictureModal}>
              <Avatar circular size="$12" borderColor="$black" borderWidth={1}>
                <Avatar.Image
                  data-testid="profile-picture"
                  accessibilityLabel="Cam"
                  src={globalState.photoUrl}
                />
              </Avatar>
              <ProfilePictureModal
                isVisible={isProfilePictureModalVisible}
                onClose={toggleProfilePictureModal}
                onChooseFromLibrary={handleChooseFromLibrary}
                onTakePicture={handleTakePicture}
                onDeletePicture={handleDeletePicture}
              />
            </TouchableOpacity>
          </View>
          <YStack className="items-start justify-evenly ml-5">
            <XStack className="items-center">
              <Text className="text-black text-lg font-qbold">
                {globalState.fullName}
              </Text>
              <TouchableOpacity
                onPress={toggleEditNameModal}
                className={"px-2"}
              >
                <Image
                  source={icons.pencil}
                  className="h-4 w-4"
                  tintColor="#aaa"
                  resizeMode="contain"
                />
                <EditNameModal
                  onTextChange={(text) =>
                    setGlobalState({ ...globalState, fullName: text })
                  }
                  value={globalState.fullName}
                  isVisible={isEditNameModalVisible}
                  onClose={toggleEditNameModal}
                  onSave={handleSaveName}
                />
              </TouchableOpacity>
            </XStack>
            <Text className="text-gray-600 text-base font-qsemibold">
              {globalState.email}
            </Text>
          </YStack>
        </XStack>
        {removeImage.isError && removeImage.error.message == 408 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Error de conexion, intente mas tarde.
          </Text>
        )}
        {saveNewName.isError && saveNewName.error.message == 408 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Error de conexion, intente mas tarde.
          </Text>
        )}
        {editImage.isError && editImage.error.message == 408 && (
          <Text className="text-red-500 text-base font-qsemibold pb-12">
            Error de conexion, intente mas tarde.
          </Text>
        )}

        {/* {removeImage.isError && <Text className="text-red-500 text-base font-qsemibold pb-12">Error de conexion, intente mas tarde.</Text>}
          {saveNewName.isError && saveNewName.error.message == 400 && <Text className="text-red-500 text-base font-qsemibold pb-12">El nombre no puede estar vacio.</Text>}
          {editImage.isError && <Text className="text-red-500 text-base font-qsemibold pb-12">Error de conexion, intente mas tarde.</Text>} */}
      </YStack>
      <YStack className="w-full h-[70%]">
        <View
          className="w-full h-[20%] items-center justify-center"
          borderTopColor="#ddd"
          borderTopWidth={2}
        >
          <XStack className="w-[80%] items-center justify-start space-x-5">
            <Image
              source={icons.car}
              className="h-6 w-6"
              tintColor="#aaa"
              resizeMode="contain"
            />
            {globalState.isDriver ? (
              <Link href="/(pages)/MyCarsPage" asChild>
                <Text className="text-xl text-black font-qbold">Mis autos</Text>
              </Link>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleRestrictedAccess(
                    "Primero tenes que convertirte en conductor."
                  )
                }
              >
                <Text className="text-xl text-black font-qbold">Mis autos</Text>
              </TouchableOpacity>
            )}
          </XStack>
        </View>
        <View
          className="w-full h-[20%] items-center justify-center "
          borderTopColor="#ddd"
          borderTopWidth={2}
        >
          <XStack className="w-[80%] items-center justify-start space-x-5">
            <Image
              source={icons.id_card}
              className="h-6 w-6"
              tintColor="#aaa"
              resizeMode="contain"
            />
            {!globalState.isDriver ? (
              <Link href="/(pages)/CredentialsPage" asChild>
                <Text className="text-xl text-black font-qbold">
                  Credenciales
                </Text>
              </Link>
            ) : (
              <TouchableOpacity
                onPress={() => handleRestrictedAccess("Ya sos conductor.")}
              >
                <Text className="text-xl text-black font-qbold">
                  Credenciales
                </Text>
              </TouchableOpacity>
            )}
          </XStack>
        </View>
        <View
          className="w-full h-[20%] items-center justify-center"
          borderTopColor="#ddd"
          borderTopWidth={2}
        >
          <TouchableOpacity onPress={() => toggleRateCommentModal()}>
            <Text className="text-xl text-black font-qbold">
              TEST AddCarModal
            </Text>
          </TouchableOpacity>
          <AddCarModal
            isVisible={isRateCommentModalVisible}
            onClose={() => {
              toggleRateCommentModal();
            }}
            // commentPlaceholder={"Dejá un comentario"}
            // onSave={(rating, comment) => {
            //   console.log("Rating: ", rating, "Comentario: ", comment);
            // }}
            // title={"Califica tu viaje"}
          />
        </View>
      </YStack>
    </YStack>
  );
}
