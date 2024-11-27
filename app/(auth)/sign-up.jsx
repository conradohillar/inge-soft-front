import { Text } from "react-native";
import { YStack } from "tamagui";
import CustomInput from "../../components/CustomInput";
import ButtonNext from "../../components/ButtonNext";
import { Link, useRouter } from "expo-router";
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
    <YStack className="h-full justify-center bg-background">
      <YStack className="h-[92%] justify-evenly">
        <YStack className="items-center">
          <Text className="text-black text-5xl font-qbold mb-3">Registrá</Text>
          <Text className="text-primary text-4xl font-qbold">TU CUENTA</Text>
        </YStack>
        <YStack className="items-center justify-center">
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                title="Nombre"
                value={value}
                handleChangeText={onChange}
                placeholder="Ingresá tu nombre"
                hint={errors.userName?.message}
                borderColor={errors.userName ? "border-red-500" : undefined}
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
        </YStack>
        <YStack className="items-center">
          <ButtonNext onPress={handleSubmit(handleContinue)}>
            <Text className="text-2xl font-qsemibold text-white">
              Continuar
            </Text>
          </ButtonNext>
          <Link href="/(auth)/sign-in" asChild>
            <Text className="text-base font-qsemibold mt-5">
              Ya tenés una cuenta?{"  "}
              <Text className="text-base text-primary font-qsemibold underline">
                Iniciá sesión
              </Text>
            </Text>
          </Link>
        </YStack>
      </YStack>
    </YStack>
  );
}
