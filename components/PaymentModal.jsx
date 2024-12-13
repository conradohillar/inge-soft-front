import { Modal, View, Text, Pressable } from "react-native";
import { XStack, YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";

const PaymentModal = ({ isVisible, onClose, onPay, onCancel }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl p-6 w-11/12 shadow-lg">
          <YStack space="$4">
            <XStack className="items-center justify-between">
              <Text className="text-xl font-qbold text-gray-900">
                ¡Tu solicitud fue aceptada!
              </Text>
              <Pressable onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </XStack>

            <Text className="text-base font-qregular text-gray-600">
              Una vez que pagues, si decidís cancelar la reserva no se te
              retribuirá el dinero.
            </Text>

            <XStack className="justify-end space-x-4 mt-2">
              <Pressable
                onPress={onCancel}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                <Text className="text-base font-qsemibold text-gray-700">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={onPay}
                className="px-4 py-2 bg-primary rounded-lg"
              >
                <Text className="text-base font-qsemibold text-white">
                  Pagar viaje
                </Text>
              </Pressable>
            </XStack>
          </YStack>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
