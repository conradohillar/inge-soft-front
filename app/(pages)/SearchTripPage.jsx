import { format } from "date-fns";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { YStack, XStack } from "tamagui";
import AutocompleteCityInput from "../../components/AutocompleteCityInput";
import ButtonNext from "../../components/ButtonNext";
import DatePicker from "../../components/DatePicker";
import { Link } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchTripSchema } from "../../validation/ridesSchemas";

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
      const formattedDate = format(formData.date, "yyyy-MM-dd"); // YYYY-MM-DD
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
      const formattedDate = format(formData.date, "yyyy-MM-dd"); // YYYY-MM-DD

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
    <YStack className="bg-background h-full w-full justify-center">
      <YStack className="h-[92%] w-full justify-evenly">
        <XStack className="items-center mt-12 mb-9 justify-center w-full">
          <Text className="text-[26px] font-qbold text-primary">Buscá </Text>
          <Text className="text-[26px] font-qsemibold text-black">
            tu próximo viaje
          </Text>
        </XStack>
        <YStack className=" items-center justify-between mb-10">
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
          <View className="w-full items-start justify-center mt-3">
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
          </View>
        </YStack>
        <YStack className="items-center">
          <View className="w-[92%] mb-3">
            <ButtonNext
              onPress={handleSubmit(handleViajoYo)}
              variant={"secondary"}
            >
              <Text className="text-2xl font-qsemibold text-white">
                Viajo yo
              </Text>
            </ButtonNext>
          </View>
          <View className="w-[92%] mb-2">
            <ButtonNext onPress={handleSubmit(handleEnviarPaquete)}>
              <Text className="text-2xl font-qsemibold text-white">
                Enviar un paquete
              </Text>
            </ButtonNext>
          </View>
        </YStack>
      </YStack>
    </YStack>
  );
}
