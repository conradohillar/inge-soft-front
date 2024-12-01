import { View, Text } from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

const TabIcon = ({ iconName, color, name, focused }) => (
  <View className="items-center justify-center gap-1 w-16">
    <MaterialIcons name={iconName} size={28} color={color} />
    <Text
      className={`${focused ? "font-qbold" : "font-qmedium"} text-xs`}
      style={{ color }}
      numberOfLines={1}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => (
  <SafeAreaView className="flex-1 bg-background2">
    <Header />

    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#309090",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          borderTopColor: "#CDCDE0",
          height: 55,
          paddingBottom: 15,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="trips"
        options={{
          title: "trips",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="directions-car"
              color={color}
              name="Viajes"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="home"
              color={color}
              name="Inicio"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconName="person"
              color={color}
              name="Perfil"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
    <StatusBar style="dark" />
  </SafeAreaView>
);

export default TabsLayout;
