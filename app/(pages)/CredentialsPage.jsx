import { TouchableOpacity, Text } from "react-native";
import ButtonNext from "../../components/ButtonNext";
import { YStack } from "tamagui";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "./LoadingPage";
import { newCredential } from "../../services/users";
import icons from "../../constants/icons";
import { useGlobalState } from "../_layout";

export default function CredentialsPage() {
  const router = useRouter();
  const { globalState, setGlobalState } = useGlobalState();

  const mutation = useMutation({
    mutationFn: newCredential,
    onSuccess: () => {
      setGlobalState({
        ...globalState,
        isDriver: true,
      });
      router.push({
        pathname: "/(pages)/NewCredentialsSuccessful",
        params: {
          title: "Ahora sos conductor!",
          section: "Perfil",
          sectionSource: icons.profile2,
          returnTo: "Volver a Mi perfil",
          returnToSource: icons.profile2,
          returnToRef: "/(tabs)/profile",
        },
      });
    },
  });

  const handleContinue = async () => {
    mutation.mutate();
  };

  if (mutation.isPending) {
    return <LoadingPage />;
  }

  return (
    <YStack className="items-center justify-evenly h-full bg-background">
      <Text className="text-black text-3xl font-qbold">Mis credenciales</Text>
      {mutation.isError && mutation.error.message == 408 && (
        <Text className="text-red-500 text-base font-qsemibold pb-12">
          Error de conexion, intente mas tarde.
        </Text>
      )}
      {mutation.isError && mutation.error.message == 403 && (
        <Text className="text-red-500 text-base font-qsemibold pb-12">
          Ya sos conductor.
        </Text>
      )}
      <ButtonNext variant={"secondary"} onPress={handleContinue}>
        <Text className="text-white text-2xl font-qsemibold">
          Quiero ser conductor
        </Text>
      </ButtonNext>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-primary text-lg font-qsemibold underline">
          Volver
        </Text>
      </TouchableOpacity>
    </YStack>
  );
}
