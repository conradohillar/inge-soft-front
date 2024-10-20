import { Rating } from "react-native-ratings";
import { Button, YStack } from "tamagui";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import CustomInput from "./CustomInput";
import { useState } from "react";
import { set } from "date-fns";

const RateCommentModal = ({
  isVisible,
  onClose,
  title,
  onSave,
  commentPlaceholder,
  initialRating = 0,
  commentTitle,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (newComment) => {
    setComment(newComment);
  };

  const handleSaveAndExit = () => {
    onSave(rating, comment);
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="justify-center items-center flex-1">
            <YStack className="bg-white py-5 rounded-xl items-center w-[100%] justify-center">
              <Text className="text-2xl font-bold color-primary pb-4">
                {title}
              </Text>
              <Rating
                className="w-[80%] p-5"
                type="star"
                ratingCount={5}
                imageSize={35}
                onFinishRating={handleRatingChange}
                initialRating={0}
              />
              <View className="w-full items-center justify-center">
                <CustomInput
                  multiline="true"
                  placeholder={commentPlaceholder}
                  handleChangeText={handleCommentChange}
                  value={comment}
                  title={commentTitle}
                />
              </View>
              <Button
                className="w-[50%] h-[42] rounded-2xl items-center pb-0.5 mt-5"
                onPress={handleSaveAndExit}
              >
                <Text className="text-lg font-qsemibold text-white">
                  Enviar
                </Text>
              </Button>
              <TouchableOpacity
                className={"w-[40%] items-center justify-center pt-4"}
                onPress={onClose}
              >
                <Text className="font-qsemibold text-red-600 underline">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </YStack>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default RateCommentModal;
