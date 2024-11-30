import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { YStack, XStack } from "tamagui";
import AutocompleteCityInput from "../../components/AutocompleteCityInput";
import ButtonNext from "../../components/ButtonNext";
import DatePicker from "../../components/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchTripSchema } from "../../validation/ridesSchemas";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import icons from "../../constants/icons";

export default function SearchTripPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchTripSchema),
    defaultValues: {
      fromLocation: "",
      toLocation: "",
      date: "",
    },
  });

  const router = useRouter();

  const handleViajoYo = async (formData) => {
    try {
      const formattedDate = format(formData.date, "yyyy-MM-dd");
      router.push({
        pathname: "/(pages)/SearchTripPerson",
        params: {
          fromLocation: formData.fromLocation,
          toLocation: formData.toLocation,
          formattedDate,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEnviarPaquete = async (formData) => {
    try {
      const formattedDate = format(formData.date, "yyyy-MM-dd");
      router.push({
        pathname: "/(pages)/SearchTripPackage",
        params: {
          fromLocation: formData.fromLocation,
          toLocation: formData.toLocation,
          formattedDate,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-10">
        {/* Header con gradiente */}
        <LinearGradient
          colors={["#59A58A", "#7AB5A0"]}
          style={{
            width: "100%",
            paddingTop: 60,
            paddingBottom: 80,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <View className="px-6">
            <Text className="text-4xl font-qbold text-white">Buscá</Text>
            <Text className="text-4xl font-qbold text-white/90">
              tu próximo viaje
            </Text>
          </View>
        </LinearGradient>

        {/* Formulario de búsqueda */}
        <View className="px-6 -mt-12">
          <View
            className="bg-white rounded-3xl pt-8 pb-10"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 3,
            }}
          >
            <YStack space="$5">
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <AutocompleteCityInput
                    title="Desde"
                    placeholder="i.e: Tigre"
                    setValue={onChange}
                    value={value}
                    hint={errors.fromLocation && errors.fromLocation.message}
                    borderColor={errors.fromLocation ? "#FF0000" : undefined}
                  />
                )}
                name="fromLocation"
              />

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <AutocompleteCityInput
                    title="Hasta"
                    placeholder="i.e: Mar del Plata"
                    setValue={onChange}
                    value={value}
                    hint={errors.toLocation && errors.toLocation.message}
                    borderColor={errors.toLocation ? "#FF0000" : undefined}
                  />
                )}
                name="toLocation"
              />

              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    value={value}
                    onChangeDate={onChange}
                    title={"Fecha de salida"}
                    hint={errors.date && errors.date.message}
                    borderColor={
                      errors.date ? "border border-red-500" : undefined
                    }
                  />
                )}
                name="date"
              />
            </YStack>
          </View>
        </View>

        {/* Botones de acción */}
        <View className="px-6 mt-10">
          <YStack space="$3">
            <ButtonNext
              onPress={handleSubmit(handleViajoYo)}
              variant="secondary"
            >
              <XStack space="$2" alignItems="center">
                <MaterialIcons name="person" size={24} color="white" />
                <Text className="text-xl font-qsemibold text-white ml-2 mr-6">
                  Viajo yo
                </Text>
              </XStack>
            </ButtonNext>

            <ButtonNext onPress={handleSubmit(handleEnviarPaquete)}>
              <XStack space="$2" alignItems="center">
                <Image
                  source={icons.filledPackage}
                  className="w-6 h-6 mt-1"
                  resizeMode="contain"
                  tintColor="white"
                />
                <Text className="text-xl font-qsemibold text-white ml-2">
                  Enviar un paquete
                </Text>
              </XStack>
            </ButtonNext>
          </YStack>
        </View>
      </Pressable>
    </ScrollView>
  );
}
