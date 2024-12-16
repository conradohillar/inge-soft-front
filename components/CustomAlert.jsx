import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ModalTemplate from "./ModalTemplate";
import { MaterialIcons } from "@expo/vector-icons";

const CustomAlert = ({
  isVisible,
  onClose,
  title = "Atención",
  message,
  confirmText = "Aceptar",
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

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
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-qbold text-black flex-1 text-center mr-6">
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} className="absolute right-0">
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Mensaje */}
          <Text className="text-base font-qregular text-gray-600 text-center mb-6">
            {message}
          </Text>

          {/* Botón */}
          <TouchableOpacity
            className="bg-primary h-[42] rounded-2xl items-center justify-center"
            onPress={handleConfirm}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text className="text-lg font-qsemibold text-white">
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalTemplate>
  );
};

export default CustomAlert;
