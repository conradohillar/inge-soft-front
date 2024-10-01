import { Text, View, Pressable } from 'react-native';
import { H5, Separator, SizableText, Tabs } from 'tamagui';
import { useState } from 'react';
import { styled } from 'nativewind'

const StyledPressable = styled(Pressable);
const StyledText = styled(SizableText);

export default function HorizontalTabs(){
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [viewMode, setViewMode] = useState('driver'); // New state to track Driver/Rider mode

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  }

    return (
      <View className="flex-1 w-full">
      <View className="flex-row justify-center my-4">
        <StyledPressable
          onPress={() => toggleViewMode('driver')}
          className={`w-[30%] px-4 py-2 rounded-md mr-2 justify-center items-center bg-primary opacity-${viewMode === 'driver' ? '100' : '70'}`}
        >
          <StyledText className={`text-black font-bold`}>
            Conductor
          </StyledText>
        </StyledPressable>
        <StyledPressable
          onPress={() => toggleViewMode('rider')}
          className={`w-[30%] px-4 py-2 rounded-md justify-center items-center bg-primary opacity-${viewMode === 'rider' ? '100' : '70'}`}
        >
          <StyledText className={`text-black font-bold`}>
            Pasajero
          </StyledText>
        </StyledPressable>
      </View>
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
        className='bg-background'
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.List
          separator={<Separator vertical />}
          disablePassBorderRadius="bottom"
          aria-label="Manage your account"
        >
          <Tabs.Tab flex={1} value="tab1" backgroundColor="#59A58A" style={{opacity: selectedTab === 'tab1' ? 1 : 0.5 }}>
            <SizableText className='text-black font-qsemibold'>Próximos viajes</SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab2" backgroundColor="#59A58A" style={{opacity: selectedTab === 'tab2' ? 1 : 0.5 }}>
            <SizableText className='text-black font-qsemibold'>Historial</SizableText>
          </Tabs.Tab>
        </Tabs.List>
        <Separator />
        <Tabs.Content value="tab1">
          <View className="h-full w-full bg-background items-center mt-12">
            <Text className="text-3xl font-qbold">Próximos viajes {viewMode === 'driver' ? '(conductor)' : '(pasajero)'}</Text>
          </View>
        </Tabs.Content>
  
        <Tabs.Content value="tab2">
          <View className="h-full w-full bg-background items-center mt-12">
            <Text className="text-3xl font-qbold">Historial {viewMode === 'driver' ? '(conductor)' : '(pasajero)'}</Text>
          </View>
        </Tabs.Content>
      </Tabs>
      </View>
    )
  }

