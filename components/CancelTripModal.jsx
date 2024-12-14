import { Modal, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CancelTripModal = ({
  isVisible,
  onClose,
  onConfirm,
  canCancel = true,
  hasRiders = false,
}) => {
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
          {/* Ícono */}
          <View className="items-center mb-4">
            <MaterialIcons
              name={canCancel ? "warning" : "info"}
              size={40}
              color={canCancel ? "#EF4444" : "#6B7280"}
            />
          </View>

          {/* Título y mensaje */}
          <Text className="text-xl font-qbold text-center text-gray-900 mb-2">
            {canCancel ? "Cancelar viaje" : "No es posible cancelar"}
          </Text>
          <Text className="text-base font-qregular text-center text-gray-600 mb-8 mt-3">
            {canCancel
              ? "¿Estás seguro de cancelar el viaje?\nEsta acción no se puede deshacer."
              : hasRiders
              ? "Ya no es posible cancelar este viaje porque hay pasajeros anotados.\n\nPor favor, contactá a los pasajeros en caso de querer cancelar el viaje."
              : "Ya no es posible cancelar este viaje.\n\nSolo se pueden cancelar viajes hasta un día antes de la fecha de salida."}
          </Text>

          {/* Botones */}
          {canCancel ? (
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
          ) : (
            <View className="flex-row justify-end">
              <Pressable
                onPress={onClose}
                className="bg-gray-100 rounded-xl py-3 px-6"
              >
                <Text className="text-base font-qsemibold text-gray-700">
                  Entendido
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CancelTripModal;
