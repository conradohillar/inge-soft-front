import { Image, TouchableOpacity, Text, View, Pressable } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
import CustomAlert from "../../components/CustomAlert";

export default function Profile() {
  const router = useRouter();
  const { globalState, setGlobalState } = useGlobalState();

  const [isProfilePictureModalVisible, setProfilePictureModalVisible] =
    useState(false);
  const [isEditNameModalVisible, setEditNameModalVisible] = useState(false);

  const [isRateCommentModalVisible, setRateCommentModalVisible] =
    useState(false);

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    message: "",
    title: "",
  });

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
    setAlertConfig({
      visible: true,
      message,
      title: globalState.isDriver ? "Estás acreditado" : "Acceso restringido",
    });
  };

  return (
    <View className="flex-1 bg-background">
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingTop: 40,
          paddingBottom: 80,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <View className="px-6">
          <XStack className="items-center space-x-4">
            <TouchableOpacity onPress={toggleProfilePictureModal}>
              <Avatar circular size="$12" borderColor="white" borderWidth={2}>
                <Avatar.Image
                  data-testid="profile-picture"
                  accessibilityLabel="Cam"
                  src={globalState.photoUrl}
                />
                <ProfilePictureModal
                  isVisible={isProfilePictureModalVisible}
                  onClose={toggleProfilePictureModal}
                  onChooseFromLibrary={handleChooseFromLibrary}
                  onTakePicture={handleTakePicture}
                  onDeletePicture={handleDeletePicture}
                />
              </Avatar>
            </TouchableOpacity>

            <YStack space="$2" className="flex-1 ml-2">
              <XStack className="items-center space-x-3 flex-wrap">
                <Text
                  className="text-xl font-qbold text-white flex-shrink"
                  numberOfLines={2}
                >
                  {globalState.fullName}
                </Text>
                <TouchableOpacity onPress={toggleEditNameModal}>
                  <Image
                    source={icons.pencil}
                    className="h-5 w-5"
                    tintColor="white"
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
                className="text-base font-qsemibold text-white/80"
                numberOfLines={2}
              >
                {globalState.email}
              </Text>
            </YStack>
          </XStack>
        </View>
      </LinearGradient>

      <View className="px-6 -mt-12">
        <YStack space="$4">
          <Pressable
            onPress={
              globalState.isDriver
                ? () => router.push("/(pages)/MyCarsPage")
                : () =>
                    handleRestrictedAccess(
                      "Primero tenés que convertirte en conductor."
                    )
            }
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View
              className={`bg-white rounded-3xl p-6 ${
                !globalState.isDriver ? "opacity-50" : ""
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center space-x-4">
                <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center">
                  <MaterialIcons
                    name="directions-car"
                    size={28}
                    color="#59A58A"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-qbold text-black mb-2">
                    Mis autos
                  </Text>
                  <Text className="text-sm font-qregular text-gray-500">
                    Administrá tus vehículos
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={28} color="#59A58A" />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={
              !globalState.isDriver
                ? () => router.push("/(pages)/CredentialsPage")
                : () => handleRestrictedAccess("Ya sos conductor.")
            }
            style={({ pressed }) => ({
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View
              className={`bg-white rounded-3xl p-6 ${
                globalState.isDriver ? "opacity-50" : ""
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center space-x-4">
                <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center">
                  <MaterialIcons name="credit-card" size={28} color="#59A58A" />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-qbold text-black mb-2">
                    Credenciales
                  </Text>
                  <Text className="text-sm font-qregular text-gray-500">
                    {globalState.isDriver
                      ? "Ya sos conductor"
                      : "Convertite en conductor"}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={28} color="#59A58A" />
              </View>
            </View>
          </Pressable>
        </YStack>
      </View>

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

      <CustomAlert
        isVisible={alertConfig.visible}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
        title={alertConfig.title}
        message={alertConfig.message}
      />
    </View>
  );
}
