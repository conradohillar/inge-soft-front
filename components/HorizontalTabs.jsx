import { Text, View, Pressable } from "react-native";
import { H5, Separator, SizableText, Tabs } from "tamagui";
import { useState } from "react";
import TripList from "./TripList";

export default function HorizontalTabs({ category }) {
  const [selectedTab, setSelectedTab] = useState("tab1");

  const tab1Title = category === "driver" ? "Publicados" : "Reservados";

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (isLoading) return <LoadingPage />;

  if (error) return <ErrorPage />;

  return (
    <View className="h-full w-full">
      <Tabs
        defaultValue="tab1"
        orientation="horizontal"
        flexDirection="column"
        width="100%"
        height="100%"
        borderRadius="$4"
        borderWidth="$0.25"
        overflow="hidden"
        borderColor="$borderColor"
        className="bg-background"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.List
          separator={<Separator vertical />}
          disablePassBorderRadius="bottom"
          aria-label="Manage your account"
        >
          <Tabs.Tab
            flex={1}
            value="tab1"
            backgroundColor="#59A58A"
            style={{ opacity: selectedTab === "tab1" ? 1 : 0.5 }}
          >
            <SizableText className="text-white font-qsemibold">
              {tab1Title}
            </SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            flex={1}
            value="tab2"
            backgroundColor="#59A58A"
            style={{ opacity: selectedTab === "tab2" ? 1 : 0.5 }}
          >
            <SizableText className="text-white font-qsemibold">
              Historial
            </SizableText>
          </Tabs.Tab>
        </Tabs.List>
        <Separator />
        <Tabs.Content value="tab1">
          <TripList
            type="upcoming"
            category={category}
            setError={setError}
            setIsLoading={setIsLoading}
          />
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <TripList
            type="history"
            category={category}
            setError={setError}
            setIsLoading={setIsLoading}
          />
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
