import { Image, TouchableOpacity, Text, View } from "react-native";
import { Avatar, XStack, YStack } from "tamagui";
import icons from "../../constants/icons";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteImage, newImage, newName } from "../../services/users";
import { queryClient, useGlobalState } from "../_layout";
import ProfilePictureModal from "../../components/PofilePictureModal";
import EditNameModal from "../../components/EditNameModal";
import CustomAlert from "../../components/CustomAlert";
import PressableCard from "../../components/PressableCard.jsx";
import { FlatList } from "react-native";
import { unregisterIndieDevice } from "native-notify";
import { setToken } from "../../services/utils";
import RatingsOptionsModal from "../../components/RatingsOptionsModal";
import LoadingPage from "../(pages)/LoadingPage";
import ErrorPage from "../(pages)/ErrorPage";
import { getDriverId } from "../../services/users";

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
  const [isRatingsModalVisible, setRatingsModalVisible] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getDriverId", globalState.userId],
    queryFn: () => getDriverId(),
    enabled: globalState.isDriver && globalState.isLoggedIn,
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
      message: "¿Estás seguro de que querés\ncerrar sesión?",
      onConfirm: async () => {
        unregisterIndieDevice(
          globalState.userId,
          25312,
          "s6wtyVfup1RTspXItRRyqB"
        );
        await setToken("");
        await setGlobalState({ ...globalState, isLoggedIn: false });
        queryClient.clear(); // Clear the query cache on logout
        router.replace("/(pages)/LandingPage");
      },
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage />;
  }

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
                  src={
                    globalState.isLoggedIn
                      ? globalState.photoUrl
                      : icons.placeholder_profile
                  }
                />
              </Avatar>
              {globalState.isLoggedIn && (
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
              )}
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
                    {globalState.isLoggedIn ? globalState.fullName : "Invitado"}
                  </Text>
                </View>
                {globalState.isLoggedIn && (
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
                )}
              </XStack>
              <Text
                className="text-m font-qsemibold text-white/80"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {globalState.isLoggedIn ? globalState.email : ""}
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
              disabled: !globalState.isDriver || !globalState.isLoggedIn,
              icon: "directions-car",
              title: "Mis autos",
              subtitle: !globalState.isLoggedIn
                ? "Iniciá sesión para acceder"
                : "Administrá tus vehículos",
            },
            {
              onPress: () => router.push("/(pages)/ChatListPage"),
              disabled: !globalState.isLoggedIn,
              icon: "chat-bubble",
              title: "Mis chats",
              subtitle: !globalState.isLoggedIn
                ? "Iniciá sesión para acceder"
                : "Accedé a la lista de tus chats",
            },
            {
              onPress: () => setRatingsModalVisible(true),
              disabled: !globalState.isLoggedIn,
              icon: "star",
              title: "Mis calificaciones",
              subtitle: !globalState.isLoggedIn
                ? "Iniciá sesión para acceder"
                : "Ver mis reseñas",
            },
            {
              onPress: !globalState.isDriver
                ? () => router.push("/(pages)/CredentialsPage")
                : () => handleRestrictedAccess("Ya sos conductor."),
              disabled: globalState.isDriver || !globalState.isLoggedIn,
              icon: "credit-card",
              title: "Credenciales",
              subtitle: !globalState.isLoggedIn
                ? "Iniciá sesión para acceder"
                : globalState.isDriver
                ? "Ya sos conductor"
                : "Convertite en conductor",
            },
            globalState.isLoggedIn
              ? {
                  onPress: handleLogout,
                  icon: "logout",
                  title: "Cerrar sesión",
                  subtitle: "Salir de la aplicación",
                }
              : {
                  onPress: () => router.replace("/(pages)/LandingPage"),
                  icon: "login",
                  title: "Iniciar sesión",
                  subtitle: "Iniciá sesión con tu cuenta",
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

      <RatingsOptionsModal
        isVisible={isRatingsModalVisible}
        onClose={() => setRatingsModalVisible(false)}
        driver_id={data}
        user_id={globalState.userId}
        isDriver={globalState.isDriver}
      />

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
