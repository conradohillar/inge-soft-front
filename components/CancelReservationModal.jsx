import { Modal, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CancelReservationModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View
          className="bg-white rounded-3xl p-6 mx-4 w-11/12"
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
          {/* Ícono de advertencia */}
          <View className="items-center mb-4">
            <MaterialIcons name="warning" size={40} color="#EF4444" />
          </View>

          {/* Mensaje */}
          <Text className="text-xl font-qbold text-center text-gray-900 mb-2">
            Cancelar reserva
          </Text>
          <Text className="text-base font-qregular text-center text-gray-600 mb-6">
            ¿Estás seguro de que querés cancelar tu reserva para este viaje?
          </Text>

          {/* Botones */}
          <View className="flex-row justify-end space-x-3">
            <Pressable
              onPress={onClose}
              className="bg-gray-100 rounded-xl py-3 px-6"
            >
              <Text className="text-base font-qsemibold text-gray-700">
                No, volver
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="bg-red-500 rounded-xl py-3 px-6"
            >
              <Text className="text-base font-qsemibold text-white">
                Sí, cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelReservationModal;
