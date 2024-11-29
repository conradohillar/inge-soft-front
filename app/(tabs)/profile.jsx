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
import { CustomListItem } from "../../components/CustomListItem";
import { MaterialIcons } from "@expo/vector-icons";
import { YGroup, Separator } from "tamagui";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const { globalState, setGlobalState } = useGlobalState();

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
      <YStack className="h-[25%] w-full items-center justify-center pt-4">
        <XStack className="w-[90%] items-center justify-start">
          <View className="items-center justify-center mr-4">
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

          <YStack space="$2" className="flex-1">
            <XStack className="items-center space-x-3 flex-wrap">
              <Text
                className="text-xl font-qbold text-black flex-shrink"
                numberOfLines={2}
              >
                {globalState.fullName}
              </Text>
              <TouchableOpacity onPress={toggleEditNameModal}>
                <Image
                  source={icons.pencil}
                  className="h-5 w-5"
                  tintColor="#666666"
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
            <Text
              className="text-gray-600 text-base font-qsemibold pr-4"
              numberOfLines={2}
            >
              {globalState.email}
            </Text>
          </YStack>
        </XStack>

        <YStack className="items-center mt-4">
          {removeImage.isError && removeImage.error.message == 408 && (
            <Text className="text-red-500 text-base font-qsemibold">
              Error de conexión, intente más tarde.
            </Text>
          )}
          {saveNewName.isError && saveNewName.error.message == 408 && (
            <Text className="text-red-500 text-base font-qsemibold">
              Error de conexion, intente mas tarde.
            </Text>
          )}
          {editImage.isError && editImage.error.message == 408 && (
            <Text className="text-red-500 text-base font-qsemibold">
              Error de conexion, intente mas tarde.
            </Text>
          )}
        </YStack>
      </YStack>

      <YGroup alignSelf="center" width={"100%"} height={"70%"} size="$1">
        <Separator />
        <YGroup.Item>
          <CustomListItem
            icon={
              <MaterialIcons name="directions-car" size={32} color="#666666" />
            }
            iconAfter={
              <MaterialIcons name="chevron-right" size={32} color="#666666" />
            }
            onPress={
              globalState.isDriver
                ? () => router.push("/(pages)/MyCarsPage")
                : () =>
                    handleRestrictedAccess(
                      "Primero tenés que convertirte en conductor."
                    )
            }
          >
            <Text className="text-xl font-qbold text-black flex-1 ml-4">
              Mis autos
            </Text>
          </CustomListItem>
        </YGroup.Item>
        <Separator />
        <YGroup.Item>
          <CustomListItem
            icon={
              <MaterialIcons name="credit-card" size={32} color="#666666" />
            }
            iconAfter={
              <MaterialIcons name="chevron-right" size={32} color="#666666" />
            }
            onPress={
              !globalState.isDriver
                ? () => router.push("/(pages)/CredentialsPage")
                : () => handleRestrictedAccess("Ya sos conductor.")
            }
          >
            <Text className="text-xl font-qbold text-black flex-1 ml-4">
              Credenciales
            </Text>
          </CustomListItem>
        </YGroup.Item>
        <Separator />
      </YGroup>
    </YStack>
  );
}
