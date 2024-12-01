import React from "react";
import { Button, XStack, YStack } from "tamagui";
import CustomInput from "./CustomInput";
import { View, Text, TouchableOpacity } from "react-native";
import ModalTemplate from "./ModalTemplate";
import { MaterialIcons } from "@expo/vector-icons";

const EditNameModal = ({ isVisible, onClose, onSave, onTextChange, value }) => {
  return (
    <ModalTemplate isVisible={isVisible} onBackdropPress={onClose}>
      <View className="px-6 justify-center flex-1">
        <View
          className="bg-white rounded-3xl p-6"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          {/* Header */}
          <XStack className="items-center justify-between">
            <Text className="text-2xl font-qbold text-black">
              Cambiar nombre
            </Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </XStack>

          {/* Input */}
          <View className="items-center my-6">
            <CustomInput
              placeholder="Ingresá tu nuevo nombre"
              value={value}
              handleChangeText={onTextChange}
              width="95%"
            />
          </View>

          {/* Botones */}
          <YStack className="mt-2">
            <Button
              className="bg-primary h-[42] rounded-2xl items-center justify-center"
              pressStyle={{ opacity: 0.8 }}
              onPress={onSave}
            >
              <Text className="text-lg font-qsemibold text-white">Guardar</Text>
            </Button>
          </YStack>
        </View>
      </View>
    </ModalTemplate>
  );
};

export default EditNameModal;
