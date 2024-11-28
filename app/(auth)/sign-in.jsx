import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import LoadingPage from "../(pages)/LoadingPage";
import { YStack } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sign_in } from "../../services/auth";
import { signInSchema } from "../../validation/authSchemas";
import { useGlobalState } from "../_layout";
import { getUserData } from "../../services/users";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

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
        isLogued: true,
        isDriver: user.is_driver,
        userId: user.user_id,
        photoUrl: user.photo_url ? user.photo_url : icons.placeholder_profile,
      });

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
    <YStack className="h-full justify-center bg-background">
      <YStack className="h-[92%] justify-evenly bg-background">
        <YStack className="items-center justify-center">
          <Text className="text-black text-5xl font-qbold">Iniciá sesión</Text>
          <Text className="text-black text-4xl font-qbold">
            con
            <Text className="text-primary text-4xl font-qbold"> tu cuenta</Text>
          </Text>
        </YStack>

        <YStack className="items-center justify-center">
          {mutation.isError && (
            <Text className="text-red-500 text-base font-qsemibold pb-12">
              {mutation.error.message == 408
                ? "Error de conexión, intentá más tarde."
                : "E-mail o contraseña inválidos."}
            </Text>
          )}

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
                borderColor={errors.password ? "border-red-500" : undefined}
              />
            )}
            name="password"
          />
        </YStack>
        <YStack className="items-center">
          <ButtonNext
            onPress={handleSubmit(handleContinue)}
            variant="secondary"
          >
            <Text className="text-white text-xl font-qsemibold">
              Ir al Inicio
            </Text>
          </ButtonNext>
          <Link href="/(auth)/sign-up" asChild>
            <Text className="text-base font-qsemibold mt-6">
              No tenés cuenta?{"  "}
              <Text className="text-base text-primary font-qsemibold underline">
                Registrate
              </Text>
            </Text>
          </Link>
        </YStack>
      </YStack>
    </YStack>
  );
}
