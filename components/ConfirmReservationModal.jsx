import { Modal, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { XStack, YStack } from "tamagui";

const ConfirmReservationModal = ({ isVisible, onClose, onConfirm }) => {
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
          <XStack className="items-center mb-4">
            <View className="items-center mr-6">
              <MaterialIcons name="info-outline" size={40} color="#59A58A" />
            </View>
            <Text className="text-xl font-qbold text-center text-gray-900 mr-1">
              ¿Confirmar reserva?
            </Text>
          </XStack>

          {/* Información importante */}
          <YStack className="mb-8">
            <View className="space-y-2">
              <Text className="text-base font-qregular text-gray-600 mb-2">
                • Podrás cancelar la reserva hasta un día antes de la fecha de
                salida.
              </Text>
              <Text className="text-base font-qregular text-gray-600">
                • Se te solicitará el pago una vez que el conductor acepte tu
                solicitud.
              </Text>
            </View>
          </YStack>

          {/* Botones */}
          <View className="flex-row justify-end space-x-3">
            <Pressable
              onPress={onClose}
              className="bg-gray-100 rounded-xl py-3 px-6"
            >
              <Text className="text-base font-qsemibold text-gray-700">
                Cancelar
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="bg-primary rounded-xl py-3 px-6"
            >
              <Text className="text-base font-qsemibold text-white">
                Confirmar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmReservationModal;
