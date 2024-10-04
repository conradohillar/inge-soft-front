import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router';
import Header from '../../components/Header'

import { icons } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={"items-center justify-center gap-1 pt-2"}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7"
      />
      <Text className={`${focused ? "font-qbold" : "font-qmedium"} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#309090',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#f5f5f5',
            borderTopWidth: 1,
            borderTopColor: '#CDCDE0',
            height: "9%",
          }
        }}
      >
        <Tabs.Screen name="trips"
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
            )
          }} />
        <Tabs.Screen name="home"
          options={{
            gestureEnabled: false,
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Inicio"
                focused={focused}
              />
            )
          }} />
        <Tabs.Screen name="profile"
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
            )
          }} />
      </Tabs>
      <StatusBar style="dark" />
    </>

  )
}

export default TabsLayout

