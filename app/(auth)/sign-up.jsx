import {
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { YStack, XStack, Card } from "tamagui";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import { useRouter } from "expo-router";
import AutocompleteCityInput from "../../components/AutocompleteCityInput";
import { signUpPart1Schema } from "../../validation/authSchemas";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpPart1Schema),
    defaultValues: {
      userName: "",
      dni: "",
      address: "",
    },
  });

  const router = useRouter();

  const handleContinue = async (formData) => {
    router.push({
      pathname: "/(auth)/sign-up2",
      params: {
        userName: formData.userName,
        dni: formData.dni,
        address: formData.address,
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <ScrollView className="flex-1 bg-background">
        <Pressable className="mb-4">
          <YStack className="flex-1 px-6">
            {/* Header */}
            <YStack className="items-center pt-20 pb-8">
              <Text className="text-4xl font-qbold text-primary mb-1">
                ¡Creá tu cuenta!
              </Text>
              <Text className="text-base font-qregular text-gray-500 text-center">
                Completá tus datos personales
              </Text>
            </YStack>

            {/* Formulario */}
            <Card
              elevate
              bordered
              className="bg-white rounded-3xl pt-4 pb-8"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 3,
              }}
            >
              <YStack className="items-center">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="Nombre"
                      value={value}
                      handleChangeText={onChange}
                      placeholder="Ingresá tu nombre completo"
                      hint={errors.userName?.message}
                      borderColor={
                        errors.userName ? "border-red-500" : undefined
                      }
                    />
                  )}
                  name="userName"
                />

                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="DNI"
                      value={value}
                      handleChangeText={onChange}
                      placeholder="Ingresá tu DNI"
                      keyboardType="numeric"
                      hint={errors.dni?.message}
                      borderColor={errors.dni ? "border-red-500" : undefined}
                    />
                  )}
                  name="dni"
                />
                <View className="mt-5">
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <AutocompleteCityInput
                        title="Dirección"
                        placeholder="Ingresá tu dirección"
                        setValue={onChange}
                        value={value}
                        hint={errors.address?.message}
                        borderColor={errors.address ? "#FF0000" : undefined}
                      />
                    )}
                    name="address"
                  />
                </View>
              </YStack>
              <View className="items-center mt-12">
                <ButtonNext onPress={handleSubmit(handleContinue)}>
                  <Text className="text-white text-xl font-qsemibold">
                    Continuar
                  </Text>
                </ButtonNext>
              </View>
            </Card>

            {/* Footer con logo */}
            <YStack className="items-center mt-6 space-y-4">
              <XStack className="items-center justify-center space-x-2">
                <Text className="text-base font-qsemibold text-gray-600">
                  ¿Ya tenés una cuenta?
                </Text>
                <Pressable
                  onPress={() => router.replace("/(auth)/sign-in")}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Text className="text-base text-primary font-qbold underline">
                    Iniciá sesión
                  </Text>
                </Pressable>
              </XStack>

              <Image
                source={require("../../assets/icons/logo.png")}
                className="h-16 w-16"
                resizeMode="contain"
              />
            </YStack>
          </YStack>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
