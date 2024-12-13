import { Image, TouchableOpacity, Text, View } from "react-native";
import { Avatar, XStack, YStack } from "tamagui";
import icons from "../../constants/icons";
import { useMutation } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteImage, newImage, newName } from "../../services/users";
import { useGlobalState } from "../_layout";
import ProfilePictureModal from "../../components/PofilePictureModal";
import EditNameModal from "../../components/EditNameModal";
import CustomAlert from "../../components/CustomAlert";
import PressableCard from "../../components/PressableCard.jsx";
import { FlatList } from "react-native";
import { unregisterIndieDevice } from "native-notify";
import { setToken } from "../../services/utils";

export default function Profile() {
  const router = useRouter();
  const { globalState, setGlobalState } = useGlobalState();

  const [isProfilePictureModalVisible, setProfilePictureModalVisible] =
    useState(false);
  const [isEditNameModalVisible, setEditNameModalVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    message: "",
    title: "",
  });

  const toggleProfilePictureModal = () => {
    setProfilePictureModalVisible(!isProfilePictureModalVisible);
  };

  const toggleEditNameModal = () => {
    setEditNameModalVisible(!isEditNameModalVisible);
  };

  const uploadImage = async (mode) => {
    try {
      let result = {};
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      };

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          ...options,
          cameraType: ImagePicker.CameraType.front,
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
    mutationFn: newImage,
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

  const removeImage = useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      setGlobalState({
        ...globalState,
        photoUrl: icons.placeholder_profile,
      });
    },
  });

  const saveNewName = useMutation({
    mutationFn: newName,
    onSuccess: (data) => {
      setGlobalState({
        ...globalState,
        firstName: data.name.split(" ")[0],
        fullName: data.name,
      });
    },
  });

  const handleDeletePicture = () => {
    removeImage.mutate();
    setProfilePictureModalVisible(false);
  };

  const handleSaveName = () => {
    if (!globalState.fullName) {
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

  const handleLogout = () => {
    if (!globalState.isLoggedIn) return;
    setAlertConfig({
      visible: true,
      title: "Cerrar sesión",
      message: "¿Estás seguro que querés cerrar sesión?",
      onConfirm: async () => {
        unregisterIndieDevice(
          globalState.userId,
          25312,
          "s6wtyVfup1RTspXItRRyqB"
        );
        await setToken("");
        await setGlobalState({ ...globalState, isLoggedIn: false });
        router.dismissAll();
        router.push("/(pages)/LandingPage");
      },
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
            <View>
              <Avatar circular size="$10" borderColor="white" borderWidth={2}>
                <Avatar.Image
                  data-testid="profile-picture"
                  accessibilityLabel="Cam"
                  src={globalState.photoUrl}
                />
              </Avatar>
              <TouchableOpacity
                onPress={toggleProfilePictureModal}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#458A6F",
                  borderRadius: 12,
                  padding: 4,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              >
                <MaterialIcons name="edit" size={16} color="white" />
              </TouchableOpacity>
              <ProfilePictureModal
                isVisible={isProfilePictureModalVisible}
                onClose={toggleProfilePictureModal}
                onChooseFromLibrary={() => uploadImage("gallery")}
                onTakePicture={() => uploadImage()}
                onDeletePicture={handleDeletePicture}
              />
            </View>

            <YStack gap="$2" className="flex-1 ml-3">
              <XStack className="items-center space-x-4">
                <View className="flex-row items-center pr-1">
                  <Text
                    className="text-xl font-qbold text-white"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {globalState.fullName}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={toggleEditNameModal}
                  style={{
                    backgroundColor: "#458A6F",
                    borderRadius: 12,
                    padding: 4,
                    borderWidth: 2,
                    borderColor: "white",
                  }}
                >
                  <MaterialIcons name="edit" size={16} color="white" />
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
                className="text-m font-qsemibold text-white/80"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {globalState.email}
              </Text>
            </YStack>
          </XStack>
        </View>
      </LinearGradient>

      <View className="-mt-12 h-full">
        <FlatList
          data={[
            {
              onPress: globalState.isDriver
                ? () => router.push("/(pages)/MyCarsPage")
                : () =>
                    handleRestrictedAccess(
                      "Primero tenés que convertirte en conductor."
                    ),
              disabled: !globalState.isDriver,
              icon: "directions-car",
              title: "Mis autos",
              subtitle: "Administrá tus vehículos",
            },
            {
              onPress: () => router.push("/(pages)/ChatListPage"),
              icon: "chat-bubble",
              title: "Mis chats",
              subtitle: "Accedé a la lista de tus chats",
            },
            {
              onPress: !globalState.isDriver
                ? () => router.push("/(pages)/CredentialsPage")
                : () => handleRestrictedAccess("Ya sos conductor."),
              disabled: globalState.isDriver,
              icon: "credit-card",
              title: "Credenciales",
              subtitle: globalState.isDriver
                ? "Ya sos conductor"
                : "Convertite en conductor",
            },
            {
              onPress: () => router.push("/(pages)/ValidatePage"),
              icon: "badge",
              title: "Validar mi cuenta",
              subtitle: "Verificá tu identidad",
            },
            {
              onPress: handleLogout,
              icon: "logout",
              title: "Cerrar sesión",
              subtitle: "Salir de la aplicación",
            },
          ]}
          renderItem={({ item }) => (
            <PressableCard
              onPress={item.onPress}
              disabled={item.disabled}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
        />
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
        onConfirm={alertConfig.onConfirm}
      />
    </View>
  );
}
