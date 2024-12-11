import { Rating } from "react-native-ratings";
import { Button, YStack, Spinner } from "tamagui";
import { View, Keyboard, TouchableOpacity, Text } from "react-native";

import CustomInput from "./CustomInput";
import { useState } from "react";
import { add, set } from "date-fns";
import ModalTemplate from "./ModalTemplate";
import { comment } from "postcss";
import { commentSchema } from "../validation/usersSchemas";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { addComment } from "../services/users";

const RateCommentModal = ({
  isVisible,
  setIsVisible,
  category,
  receiverId,
  rideId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData) =>
      addComment(
        receiverId,
        rideId,
        category,
        formData.rating,
        formData.comment
      ),
    onSuccess: async () => {
      setIsVisible(false);
    },
  });

  const handleContinue = async (formData) => {
    if (receiverId != null) {
      mutation.mutate(formData);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalTemplate isVisible={isVisible} onBackdropPress={closeModal}>
      <View className="justify-center items-center flex-1">
        <YStack className="bg-white py-5 rounded-xl items-center w-[100%] justify-center">
          <Text className="text-2xl font-bold color-primary pb-4">
            Opiná sobre tu {category == "driver" ? "conductor" : "pasajero"}
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Rating
                className="w-[80%] p-5"
                type="star"
                ratingCount={5}
                imageSize={35}
                onFinishRating={onChange}
                startingValue={0}
              />
            )}
            name="rating"
          />
          {errors.rating && (
            <Text className="text-red-500 text-base font-qsemibold">
              {errors.rating.message}
            </Text>
          )}

          <View className="w-full items-center justify-center">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder={"Deja un comentario"}
                  handleChangeText={onChange}
                  value={value}
                  title={"Comentario"}
                  hint={errors.comment?.message}
                  borderColor={errors.comment ? "border-red-500" : undefined}
                />
              )}
              name="comment"
            />
          </View>
          <Button
            className="w-[50%] h-[42] rounded-2xl items-center pb-0.5 mt-5"
            onPress={handleSubmit(handleContinue)}
          >
            {(mutation.isPending && (
              <Spinner size={40} color="$green10" className="mb-2 mr-2" />
            )) || (
              <Text className="text-lg font-qsemibold text-white">Enviar</Text>
            )}
          </Button>
          <TouchableOpacity
            className={"w-[40%] items-center justify-center pt-4"}
            onPress={closeModal}
          >
            <Text className="font-qsemibold text-red-600 underline">
              Cancelar
            </Text>
          </TouchableOpacity>
        </YStack>
      </View>
    </ModalTemplate>
  );
};

export default RateCommentModal;
