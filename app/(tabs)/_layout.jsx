import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-1 w-10">
    <Image
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-7 h-7"
    />
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
          backgroundColor: "#fff",
          borderTopColor: "#CDCDE0",
          height: "75",
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
              icon={icons.car}
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
              icon={icons.home}
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
              icon={icons.profile2}
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
