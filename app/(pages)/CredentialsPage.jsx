import { SafeAreaView, Text } from "react-native";
import ButtonNext from "../../components/ButtonNext";
import { YStack } from "tamagui";
import { Link, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import { newCredential } from "../../services/users";
import icons from "../../constants/icons";

export default function CredentialsPage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: newCredential,
    onSuccess: () => {
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

  if (mutation.isError) {
    console.error(mutation.error);
    return <ErrorPage />;
  }

  return (
    <SafeAreaView className="h-full w-full bg-background">
      <YStack className="items-center justify-evenly h-full">
        <Text className="text-black text-3xl font-qbold">Mis credenciales</Text>
        <ButtonNext variant={"secondary"} onPress={handleContinue}>
          <Text className="text-white text-2xl font-qsemibold">
            Quiero ser conductor
          </Text>
        </ButtonNext>
        <Link href="/(tabs)/profile" asChild>
          <Text className="text-primary text-lg font-qsemibold underline">
            Volver
          </Text>
        </Link>
      </YStack>
    </SafeAreaView>
  );
}
