import { View, Text, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import CarCard from "../../components/CarCard";
import LoadingPage from "../(pages)/LoadingPage";
import ErrorPage from "./ErrorPage";
import { getMyCars } from "../../services/users";
import AddCarModal from "../../components/AddCarModal";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "tamagui";

export default function MyCarsPage() {
  const [isAddCarModalVisible, setIsAddCarModalVisible] = useState(false);

  const toggleAddCarModal = () => {
    setIsAddCarModalVisible(!isAddCarModalVisible);
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getCars"],
    queryFn: getMyCars,
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <View className="flex-1 bg-background">
      {/* Header con gradiente */}
      <LinearGradient
        colors={["#59A58A", "#7AB5A0"]}
        style={{
          width: "100%",
          paddingTop: 60,
          paddingBottom: 80,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <View className="px-6 items-center">
          <Text className="text-4xl font-qbold text-white">Mis autos</Text>
        </View>
      </LinearGradient>

      {/* Lista de autos */}
      <View className="px-6 -mt-12 flex-1">
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.plate}
            renderItem={({ item }) => (
              <CarCard model={item.model} plate={item.plate} />
            )}
            contentContainerStyle={{
              gap: 12,
              paddingTop: 12,
              paddingBottom: 12,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="items-center justify-center flex-1">
            <Text className="text-lg font-qsemibold text-gray-400 text-center mb-4">
              No tenés autos registrados
            </Text>
          </View>
        )}
      </View>

      {/* Botón de agregar auto */}
      <View className="px-6 py-6">
        <Button
          className="bg-white rounded-2xl h-14 flex-row items-center justify-center"
          pressStyle={{ opacity: 0.8 }}
          onPress={toggleAddCarModal}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 3,
          }}
        >
          <MaterialIcons name="add" size={24} color="#59A58A" />
          <Text className="text-lg font-qsemibold text-primary ml-2">
            Agregá un auto nuevo
          </Text>
        </Button>
      </View>

      <AddCarModal
        isVisible={isAddCarModalVisible}
        onClose={toggleAddCarModal}
      />
    </View>
  );
}
