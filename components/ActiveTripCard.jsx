import { Card, XStack, YStack } from "tamagui";
import { Text, Image, View, Pressable } from "react-native";
import icons from "../constants/icons";
import VarButton from "./VarButton";
import { MaterialIcons } from "@expo/vector-icons";

const ActiveTripCard = ({
  from,
  to,
  passengers,
  packages,
  departure,
  isActive,
  handleStartTrip,
  handleEndTrip,
}) => {
  return (
    <Card
      className="bg-white rounded-3xl my-2"
      bordered
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
      {/* Header con origen y destino */}
      <YStack className="p-4 border-b border-gray-100">
        <XStack className="items-center space-x-2">
          <MaterialIcons name="location-on" size={24} color="#59A58A" />
          <Text className="text-xl font-qbold text-gray-900">{from}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#9CA3AF" />
          <Text className="text-xl font-qbold text-gray-900">{to}</Text>
        </XStack>
      </YStack>

      {/* Detalles del viaje */}
      <YStack className="p-4 space-y-4">
        {/* Pasajeros y paquetes */}
        <XStack className="justify-between px-3 mb-3">
          <XStack className="space-x-3 items-center">
            <MaterialIcons name="people" size={22} color="#6B7280" />
            <Text className="font-qsemibold text-gray-600 text-base">
              {passengers} {passengers === 1 ? "pasajero" : "pasajeros"}
            </Text>
          </XStack>
          <XStack className="space-x-3 items-center">
            <Image source={icons.mypackage} className="w-6 h-6" />
            <Text className="font-qsemibold text-gray-600 text-base">
              {packages} {packages === 1 ? "paquete" : "paquetes"}
            </Text>
          </XStack>
        </XStack>

        {/* Hora de salida */}
        <XStack className="items-center space-x-2 ml-3 mb-5">
          <MaterialIcons name="schedule" size={22} color="#6B7280" />
          <Text className="text-base font-qsemibold text-gray-600">
            Salida:
          </Text>
          <Text className="text-base font-qbold text-gray-700">
            {departure}
          </Text>
        </XStack>

        {/* Botones de acción */}
        <XStack className="justify-between">
          <View className="flex-1">
            <VarButton
              onPress={handleStartTrip}
              variant="secondary"
              opacity={isActive ? 0.5 : 1}
              disabled={isActive}
            >
              <XStack className="items-center justify-center space-x-2">
                <MaterialIcons
                  name="play-circle-filled"
                  size={20}
                  color="white"
                />
                <Text className="text-base font-qsemibold text-white mb-1">
                  Comenzar
                </Text>
              </XStack>
            </VarButton>
          </View>
          <View className="flex-1">
            <VarButton
              onPress={handleEndTrip}
              opacity={isActive ? 1 : 0.5}
              disabled={!isActive}
            >
              <XStack className="items-center justify-center space-x-2">
                <MaterialIcons name="stop-circle" size={20} color="white" />
                <Text className="text-base font-qsemibold text-white mb-1">
                  Terminar
                </Text>
              </XStack>
            </VarButton>
          </View>
        </XStack>
      </YStack>

      {/* Estado del viaje */}
      {isActive && (
        <XStack className="items-center justify-center bg-primary/10 py-2 mb-4 rounded-xl">
          <MaterialIcons name="directions-car" size={20} color="#59A58A" />
          <Text className="ml-2 text-base font-qsemibold text-primary">
            Viaje en curso
          </Text>
        </XStack>
      )}

      {/* Footer */}
      <XStack className="p-4 mr-2 pt-2 justify-end">
        <Text className="text-xs font-qsemibold text-gray-400 italic">
          Como conductor
        </Text>
      </XStack>
    </Card>
  );
};

export default ActiveTripCard;
