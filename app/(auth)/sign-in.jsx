import { Text, Image, Pressable, View, ScrollView } from "react-native";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import LoadingPage from "../(pages)/LoadingPage";
import { YStack, XStack, Card } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sign_in } from "../../services/auth";
import { signInSchema } from "../../validation/authSchemas";
import { useGlobalState } from "../_layout";
import { getUserData } from "../../services/users";
import icons from "../../constants/icons";
import { registerIndieID } from "native-notify";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { globalState, setGlobalState } = useGlobalState();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData) =>
      sign_in(formData.email, formData.password, setGlobalState),
    onSuccess: async () => {
      const user = await getUserData();
      await setGlobalState({
        ...globalState,
        fullName: user.name,
        firstName: user.name.split(" ")[0],
        email: user.email,
        isLoggedIn: true,
        isDriver: user.is_driver,
        userId: user.user_id,
        photoUrl: user.photo_url ? user.photo_url : icons.placeholder_profile,
      });
      registerIndieID(user.user_id, 25312, "s6wtyVfup1RTspXItRRyqB");
      queryClient.invalidateQueries({
        queryKey: ["ridesUpcoming"],
      });
      router.dismissAll();
      router.replace("../(tabs)/home");
    },
  });

  const handleContinue = async (formData) => {
    mutation.mutate(formData);
  };

  if (mutation.isPending) {
    return <LoadingPage />;
  }

  return (
    <ScrollView bounces={true}>
      <YStack className="flex-1 px-6 bg-background">
        <YStack className="h-full w-full items-center justify-center">
          {/* Header */}
          <YStack className="items-center pt-16 pb-12">
            <Text className="text-4xl font-qbold text-primary mb-2">
              ¡Bienvenido!
            </Text>
            <Text className="text-base font-qregular text-gray-500 text-center">
              Ingresá tus datos para continuar
            </Text>
          </YStack>

          {/* Formulario */}
          <Card
            elevate
            bordered
            className="bg-white rounded-3xl"
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
            <YStack className="p-6">
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
                      : "E-mail o contraseña inválidos."}
                  </Text>
                </XStack>
              )}

              <YStack gap="$2" className={`${mutation.isError ? "" : "mb-8"}`}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="E-mail"
                      value={value}
                      handleChangeText={onChange}
                      placeholder="Ingresá tu e-mail"
                      autoComplete="email"
                      inputMode="email"
                      multiline={false}
                      hint={errors.email?.message}
                      borderColor={errors.email ? "border-red-500" : undefined}
                      width="92%"
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
                      secureTextEntry={true}
                      handleChangeText={onChange}
                      placeholder="Ingresá tu contraseña"
                      autoComplete="password"
                      multiline={false}
                      inputMode="text"
                      hint={errors.password?.message}
                      borderColor={
                        errors.password ? "border-red-500" : undefined
                      }
                      width="92%"
                    />
                  )}
                  name="password"
                />
              </YStack>

              <View className="items-center justify-center mt-4">
                <ButtonNext
                  onPress={handleSubmit(handleContinue)}
                  variant="secondary"
                >
                  <Text className="text-white text-xl font-qsemibold">
                    Iniciar sesión
                  </Text>
                </ButtonNext>
              </View>
            </YStack>
          </Card>

          {/* Footer con logo */}
          <YStack className="items-center mt-8 mb-4 space-y-6">
            <XStack className="items-center justify-center space-x-2 mb-2">
              <Text className="text-base font-qsemibold text-gray-600">
                ¿No tenés cuenta?
              </Text>
              <Pressable
                onPress={() => router.replace("/(auth)/sign-up")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text className="text-base text-primary font-qbold underline">
                  Registrate
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
      </YStack>
    </ScrollView>
  );
}
