import { Text, View } from 'react-native'
import { H5, Separator, SizableText, Tabs,} from 'tamagui'
import { useState } from 'react'

export default function HorizontalTabs(){
  const [selectedTab, setSelectedTab] = useState('tab1');

    return (
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
          <Tabs.Tab flex={1} value="tab1" backgroundColor="#59A58A" style={{opacity: selectedTab === 'tab1' ? 1 : 0.7 }}>
            <SizableText className='text-background font-qsemibold'>Próximos viajes</SizableText>
          </Tabs.Tab>
          <Tabs.Tab flex={1} value="tab2" backgroundColor="#59A58A" style={{opacity: selectedTab === 'tab2' ? 1 : 0.7 }}>
            <SizableText className='text-background font-qsemibold'>Historial</SizableText>
          </Tabs.Tab>
        </Tabs.List>
        <Separator />
        <Tabs.Content value="tab1">
          <View className="h-full w-full bg-background items-center mt-12">
            <Text className="text-3xl font-qbold">Próximos viajes</Text>
          </View>
        </Tabs.Content>
  
        <Tabs.Content value="tab2">
          <View className="h-full w-full bg-background items-center mt-12">
            <Text className="text-3xl font-qbold">Historial</Text>
          </View>
        </Tabs.Content>
      </Tabs>
    )
  }

