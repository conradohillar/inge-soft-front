import { View } from "react-native";
import { SizableText, Tabs } from "tamagui";
import { useState } from "react";
import TripList from "./TripList";

export default function HorizontalTabs({ category }) {
  const [selectedTab, setSelectedTab] = useState("tab1");

  const tab1Title = category === "driver" ? "Publicados" : "Reservados";

  return (
    <View className="h-full w-full">
      <Tabs
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        width="100%"
        height="100%"
        borderRadius="$4"
        overflow="hidden"
        className="bg-background"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.List
          aria-label="Manage your account"
          justifyContent="space-between"
          paddingHorizontal={16}
          paddingVertical={8}
        >
          <Tabs.Tab
            value="tab1"
            backgroundColor={selectedTab === "tab1" ? "#000" : "#ddd"}
            borderRadius={20}
            paddingHorizontal={16}
            paddingVertical={8}
            flex={1}
            marginHorizontal={4}
          >
            <SizableText
              size="$5"
              className={`font-qsemibold ${
                selectedTab === "tab1" ? "text-white" : "text-black"
              }`}
            >
              {tab1Title}
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            value="tab2"
            backgroundColor={selectedTab === "tab2" ? "#000" : "#ddd"}
            borderRadius={20}
            paddingHorizontal={16}
            paddingVertical={8}
            flex={1}
            marginHorizontal={4}
          >
            <SizableText
              size="$5"
              className={`font-qsemibold ${
                selectedTab === "tab2" ? "text-white" : "text-black"
              }`}
            >
              Historial
            </SizableText>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <TripList type="upcoming" category={category} />
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <TripList type="history" category={category} />
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
