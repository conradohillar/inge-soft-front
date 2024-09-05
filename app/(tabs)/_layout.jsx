import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router';

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={"items-center justify-center gap-2"}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-9 h-9"
      />
      <Text className={`${focused ? "font-qbold" : "font-qmedium"} text-xs`} style={{ color: color}}>
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
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#FFF',
            borderTopWidth: 1,
            borderTopColor: '#CDCDE0',
            height: 100
          }
        }}
      >
        <Tabs.Screen name="trips" 
          options={{
            title: "Trips", 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.car}
                color={color}
                name="Trips"
                focused={focused}
              />
        )}}/>
        <Tabs.Screen name="home" 
          options={{
            title: "Home", 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
        )}}/>
        <Tabs.Screen name="profile" 
          options={{
            title: "Profile", 
            headerShown: false, 
            tabBarIcon: ({ color, focused}) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
        )}}/>
      </Tabs>
      
    </>
  )
}

export default TabsLayout

