import { Modal, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PaymentRequiredModal = ({ isVisible, onClose }) => {
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
          {/* Header con ícono */}
          <View className="items-center mb-4">
            <MaterialIcons
              name="chat-bubble-outline"
              size={40}
              color="#59A58A"
            />
          </View>

          {/* Mensaje */}
          <Text className="text-xl font-qbold text-center text-gray-900 mb-2">
            Chat no disponible
          </Text>
          <Text className="text-base font-qregular text-center text-gray-600 mb-6">
            El chat se habilitará una vez que el pasajero realice el pago del
            viaje
          </Text>

          {/* Botón de cerrar */}
          <Pressable
            onPress={onClose}
            className="bg-primary rounded-xl py-2 w-[60%] self-center"
          >
            <Text className="text-base font-qsemibold text-white text-center">
              Entendido
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentRequiredModal;
