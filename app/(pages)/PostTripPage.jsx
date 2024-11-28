import { View, Text } from "react-native";
import { YStack, XStack } from "tamagui";
import { useRouter } from "expo-router";
import AutocompleteCityInput from "../../components/AutocompleteCityInput";
import DatePicker from "../../components/DatePicker";
import TimePicker from "../../components/TimePicker";
import ButtonNext from "../../components/ButtonNext";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import { postTripSchema } from "../../validation/ridesSchemas";

export default function PostTripPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postTripSchema),
    defaultValues: {
      fromLocation: "",
      toLocation: "",
      date: "",
      time: "",
    },
  });

  const router = useRouter();

  const handleContinue = async (formData) => {
    try {
      const formattedDate = format(formData.date, "yyyy-MM-dd"); // YYYY-MM-DD
      const formattedTime = new Date(formData.time);
      formattedTime.setHours(formattedTime.getHours() - 3);
      const departureTime = formattedTime.toISOString().split("T")[1]; // HH:MM:SS.sssZ

      router.push({
        pathname: "/(pages)/PostTripPage2",
        params: {
          fromLocation: formData.fromLocation,
          toLocation: formData.toLocation,
          formattedDate,
          departureTime,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <View className="h-full w-full bg-background items-center justify-center">
      <YStack className="h-[92%] w-full items-center justify-evenly">
        <XStack className="items-center justify-center">
          <Text className="text-3xl font-qbold text-primary">Publicá</Text>
          <Text className="text-3xl font-qsemibold text-black"> tu viaje</Text>
        </XStack>
        <YStack className="items-center w-full">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <AutocompleteCityInput
                title="Desde"
                placeholder="i.e: Tigre"
                setValue={onChange}
                value={value}
                hint={errors.fromLocation?.message}
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
                hint={errors.toLocation?.message}
                borderColor={errors.toLocation ? "#FF0000" : undefined}
              />
            )}
            name="toLocation"
          />
          <View className="w-full items-start justify-center mt-4">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  placeholderTextColor="#999"
                  value={value}
                  onChangeDate={onChange}
                  title={"Fecha de salida"}
                  hint={errors.date?.message}
                  borderColor={
                    errors.date ? "border border-red-500" : undefined
                  }
                />
              )}
              name="date"
            />
          </View>
          <View className="w-full items-start justify-center mt-4">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TimePicker
                  placeholderTextColor="#999"
                  value={value}
                  onChangeTime={onChange}
                  minuteInterval={30}
                  title={"Hora de salida"}
                  hint={errors.time?.message}
                  borderColor={
                    errors.time ? "border border-red-500" : undefined
                  }
                />
              )}
              name="time"
            />
            <XStack className="items-center px-12 mt-3">
              <Text className="text-sm text-gray-400 font-qsemibold">
                Nota: se asignará automáticamente una franja de
                <Text className="text-sm text-primary font-qbold">
                  {" "}
                  1 hora.
                </Text>
              </Text>
            </XStack>
          </View>
        </YStack>
        <View className="w-[92%] items-center mt-3">
          <ButtonNext onPress={handleSubmit(handleContinue)}>
            <Text className="text-2xl font-qsemibold text-white">
              Continuar
            </Text>
          </ButtonNext>
        </View>
      </YStack>
    </View>
  );
}
