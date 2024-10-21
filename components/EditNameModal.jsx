import React from "react";
import { Button, XStack, YStack } from "tamagui";
import CustomInput from "./CustomInput";
import { View, Text, TouchableOpacity } from "react-native";
import ModalTemplate from "./ModalTemplate";

const EditNameModal = ({ isVisible, onClose, onSave, onTextChange, value }) => {
  return (
    <ModalTemplate isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <YStack className="bg-gray-100 p-5 rounded-xl items-center w-full">
          <Text className="text-2xl font-bold color-primary">
            Cambiar nombre
          </Text>
          <CustomInput
            placeholder="Ingresá tu nuevo nombre"
            value={value}
            handleChangeText={onTextChange}
            height={50}
          />
          <YStack className="w-full pt-4 items-center justify-around">
            <Button
              className="w-[50%] h-[42] rounded-2xl items-center pb-0.5"
              onPress={onSave}
            >
              <Text className="text-lg font-qsemibold text-white">Guardar</Text>
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
        </YStack>
      </View>
    </ModalTemplate>
  );
};

export default EditNameModal;
