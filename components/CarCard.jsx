import { Image, View, Text, Pressable } from "react-native";
import { XStack, YStack, Spinner } from "tamagui";
import icons from "../constants/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "../app/(pages)/ErrorPage";
import { deleteCar } from "../services/users";

export default function CarCard({ model, plate }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (plate) => deleteCar(plate),
    onSuccess: () => {
      queryClient.invalidateQueries("getCars");
      queryClient.invalidateQueries("getRideData");
    },
  });

  if (mutation.isError) return <ErrorPage />;

  const handleDelete = () => {
    mutation.mutate(plate);
  };

  return (
    <View className="w-full items-center">
      <View
        className="w-[95%] bg-white rounded-3xl p-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        <XStack className="items-center justify-between py-2">
          <XStack space="$4" className="items-center">
            <View className="bg-primary/10 h-14 w-14 rounded-2xl items-center justify-center">
              <Image
                source={icons.car}
                className="h-8 w-8"
                tintColor="#59A58A"
                resizeMode="contain"
              />
            </View>
            <YStack>
              <Text className="text-xl font-qbold text-black">{model}</Text>
              <Text className="text-base font-qsemibold text-gray-400">
                Patente: {plate}
              </Text>
            </YStack>
          </XStack>

          {!mutation.isPending ? (
            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Image
                source={icons.trash}
                className="h-7 w-7"
                tintColor="#c00"
                resizeMode="contain"
              />
            </Pressable>
          ) : (
            <Spinner size="small" color="$red10" />
          )}
        </XStack>
      </View>
    </View>
  );
}
