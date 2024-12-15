import { Text, Image, ScrollView, Pressable } from "react-native";
import { YStack, XStack, Card } from "tamagui";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import LoadingPage from "../(pages)/LoadingPage";
import { sign_up } from "../../services/auth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpPart2Schema } from "../../validation/authSchemas";
import icons from "../../constants/icons";

export default function SignUp2() {
  const { dni, userName, address } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpPart2Schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (userData) => sign_up(userData),
    onSuccess: (user_id) => {
      router.push({
        pathname: "/(auth)/sign-in",
      });
    },
  });

  const handleContinue = async (formData) => {
    const userData = {
      name: userName,
      email: formData.email,
      password: formData.password,
      address: address,
      dni: Number(dni),
      photo_url: null,
    };

    mutation.mutate(userData);
  };

  if (mutation.isLoading) {
    return <LoadingPage />;
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <Pressable className="mb-4">
        <YStack className="flex-1 px-6">
          {/* Header */}
          <YStack className="items-center pt-20 pb-10">
            <Text className="text-4xl font-qbold text-primary mb-2">
              ¡Último paso!
            </Text>
            <Text className="text-base font-qregular text-gray-500 text-center">
              Configurá tus credenciales
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
              {mutation.isError && (
                <XStack className="items-center justify-center space-x-2 bg-red-50 rounded-2xl py-3">
                  <Image
                    source={icons.alert}
                    className="h-6 w-6"
                    resizeMode="contain"
                    tintColor="#ef4444"
                  />
                  <Text className="text-sm font-qbold text-red-500">
                    {mutation.error.message == 408
                      ? "Error de conexión, intentá más tarde."
                      : "Error al crear la cuenta. Intentá nuevamente."}
                  </Text>
                </XStack>
              )}

              <YStack space="$2" className="mb-8">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="E-mail"
                      value={value}
                      handleChangeText={onChange}
                      placeholder="Ingresá tu e-mail"
                      keyboardType="email-address"
                      hint={errors.email?.message}
                      borderColor={errors.email ? "border-red-500" : undefined}
                    />
                  )}
                  name="email"
                />

                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="Contraseña"
                      value={value}
                      handleChangeText={onChange}
                      secureTextEntry={true}
                      autoComplete={"password"}
                      multiline={false}
                      inputMode={"password"}
                      placeholder={"Ingresá tu contraseña"}
                      hint={errors.password?.message}
                      borderColor={
                        errors.password ? "border-red-500" : undefined
                      }
                    />
                  )}
                  name="password"
                />

                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="Confirmá tu contraseña"
                      value={value}
                      handleChangeText={onChange}
                      secureTextEntry={true}
                      autoComplete={"password"}
                      multiline={false}
                      inputMode={"password"}
                      placeholder={"Reingresá tu contraseña"}
                      hint={errors.confirmPassword?.message}
                      borderColor={
                        errors.confirmPassword ? "border-red-500" : undefined
                      }
                    />
                  )}
                  name="confirmPassword"
                />
              </YStack>
              <ButtonNext
                onPress={handleSubmit(handleContinue)}
                variant="secondary"
              >
                <Text className="text-white text-xl font-qsemibold">
                  Registrarse
                </Text>
              </ButtonNext>
            </YStack>
          </Card>

          {/* Footer con logo */}
          <YStack className="items-center mt-8 space-y-6">
            <Image
              source={require("../../assets/icons/logo.png")}
              className="h-16 w-16"
              resizeMode="contain"
            />
          </YStack>
        </YStack>
      </Pressable>
    </ScrollView>
  );
}
