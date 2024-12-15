import { View, Text, ScrollView, Pressable } from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

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
      const formattedDate = format(formData.date, "yyyy-MM-dd");
      const formattedTime = new Date(formData.time);
      formattedTime.setHours(formattedTime.getHours() - 3);
      const departureTime = formattedTime.toISOString().split("T")[1];

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
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-4">
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
          <View className="px-6 items-center">
            <Text className="text-4xl font-qbold text-white">
              Publicá
              <Text className="text-4xl font-qbold text-white/90">
                {" "}
                tu viaje
              </Text>
            </Text>
          </View>
        </LinearGradient>

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
            <YStack space="$5" className="w-full items-center">
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
              <>
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
                <XStack className="items-center px-2 self-center mt-4">
                  <Text className="text-sm text-gray-400 font-qsemibold">
                    Nota: se asignará automáticamente una franja de salida de
                    <Text className="text-sm text-primary font-qbold">
                      {" "}
                      1 hora.
                    </Text>
                  </Text>
                </XStack>
              </>
            </YStack>
          </View>
        </View>

        <View className="px-6 mt-8">
          <ButtonNext onPress={handleSubmit(handleContinue)}>
            <Text className="text-2xl font-qsemibold text-white">
              Continuar
            </Text>
          </ButtonNext>
        </View>

        {/* Botón inferior */}
        <View className="px-6 pb-2 pt-4 bg-background">
          <Link href="/(tabs)/home" asChild>
            <Pressable
              className="flex-row items-center justify-center pb-3 bg-white rounded-2xl"
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              })}
            >
              <MaterialIcons name="home" size={24} color="#59A58A" />
              <Text className="ml-2 text-primary font-qsemibold text-lg mb-1">
                Volver al inicio
              </Text>
            </Pressable>
          </Link>
        </View>
      </Pressable>
    </ScrollView>
  );
}
