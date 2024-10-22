import { YStack, XStack, View, Spinner } from "tamagui";
import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import ModalTemplate from "./ModalTemplate";

export default function TripEndedModal({ isVisible, setIsVisible }) {
  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalTemplate
      isVisible={isVisible}
      onBackdropPress={closeModal}
      className="justify-center items-center h-full"
    >
      <YStack className="bg-white py-5 rounded-xl items-center w-[100%] justify-center">
        <View className="w-full border-b-2 border-b-[#eee] items-center pb-5">
          <Text className="text-2xl font-bold color-primary">
            ¡Viaje finalizado!
          </Text>
        </View>
        <YStack className="w-[95%] items-center py-5 items-center">
          <Text className="text-lg font-semibold color-black">
            Ya podés encontrar el detalle
          </Text>
          <Text className="text-lg font-semibold color-black">
            del viaje en la sección{" "}
            <Link
              href={{
                pathname: "/(pages)/TripsPage",
                params: { category: "driver" },
              }}
              asChild
            >
              <Text className="text-lg font-semibold color-black underline">
                Historial
              </Text>
            </Link>
          </Text>
        </YStack>
        <TouchableOpacity
          className={"w-[40%] items-center justify-center pt-4"}
          onPress={closeModal}
        >
          <Text className="font-qsemibold text-primary">Cerrar</Text>
        </TouchableOpacity>
      </YStack>
    </ModalTemplate>
  );
}
