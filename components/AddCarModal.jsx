import { YStack, Spinner } from "tamagui";
import CustomInput from "./CustomInput";
import ButtonNext from "./ButtonNext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Text, TouchableOpacity, Modal, View, ScrollView } from "react-native";
import { newCar } from "../services/users";
import { addCarSchema } from "../validation/usersSchemas";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AddCarModal = ({ isVisible, onClose, onSave }) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCarSchema),
    defaultValues: {
      model: "",
      plate: "",
      color: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (carData) => newCar(carData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCars"] });
      queryClient.invalidateQueries({ queryKey: ["getRideData"] });
      reset();
      onClose();
    },
  });

  const router = useRouter();

  const handleContinue = (formData) => {
    const obj = {
      model: formData.model,
      plate: formData.plate,
      color: formData.color,
    };

    mutation.mutate(obj);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-black/50">
          <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 justify-center items-center px-4">
              <YStack className="w-full bg-white rounded-xl py-6">
                <YStack className="items-center justify-center mt-4">
                  <Text className="text-black text-4xl font-qbold">
                    Cargá los datos
                  </Text>
                  <Text className="text-black text-4xl font-qbold">
                    de
                    <Text className="text-primary text-4xl font-qbold">
                      {" "}
                      tu auto
                    </Text>
                  </Text>
                </YStack>
                <YStack className="items-center justify-center">
                  {mutation.isError && mutation.error.message == 408 && (
                    <Text className="text-red-500 text-base font-qsemibold pb-12">
                      Error de conexión, intentá más tarde.
                    </Text>
                  )}
                  {mutation.isError && mutation.error.message == 403 && (
                    <Text className="text-red-500 text-base font-qsemibold pb-12">
                      Todavía no sos conductor.
                    </Text>
                  )}
                  {mutation.isError && mutation.error.message == 402 && (
                    <Text className="text-red-500 text-base font-qsemibold pb-12">
                      Ya tenés un auto con esta patente.
                    </Text>
                  )}

                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        title="Modelo"
                        value={value}
                        handleChangeText={onChange}
                        placeholder={"Ej: Toyota etios"}
                        hint={errors.model?.message}
                        borderColor={
                          errors.model ? "border-red-500" : undefined
                        }
                      />
                    )}
                    name="model"
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        title="Patente"
                        value={value}
                        handleChangeText={onChange}
                        placeholder={"Ej: abc-123"}
                        hint={errors.plate?.message}
                        borderColor={
                          errors.plate ? "border-red-500" : undefined
                        }
                      />
                    )}
                    name="plate"
                  />
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                      <CustomInput
                        title="Color"
                        value={value}
                        handleChangeText={onChange}
                        placeholder={"Ej: Rojo"}
                        hint={errors.color?.message}
                        borderColor={
                          errors.color ? "border-red-500" : undefined
                        }
                      />
                    )}
                    name="color"
                  />
                </YStack>
                <YStack className="items-center mt-6">
                  <ButtonNext
                    onPress={handleSubmit(handleContinue)}
                    variant="secondary"
                  >
                    {mutation.isPending ? (
                      <Spinner />
                    ) : (
                      <Text className="text-white text-xl font-qsemibold">
                        Agregar auto
                      </Text>
                    )}
                  </ButtonNext>
                  <TouchableOpacity
                    className={"w-[40%] items-center justify-center pt-4"}
                    onPress={() => {
                      onClose();
                      reset();
                    }}
                  >
                    <Text className="font-qsemibold text-red-600 underline">
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </YStack>
              </YStack>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddCarModal;
