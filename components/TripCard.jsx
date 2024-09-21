import { Image, View, Text, Pressable } from "react-native";
import { Button, XStack, YStack, Avatar } from "tamagui";
import icons from '../constants/icons';

export default function TripCard({from, to, driver, date, price}){
    return (
        <View className="py-3">
            <Pressable 
                     style={({ pressed }) => ({ 
                        height:210, width:350, paddingVertical:15, paddingHorizontal:18, marginHorizontal:6,
                        borderWidth:2, borderColor:"#ccc", borderRadius:40,
                        opacity: pressed ? 0.7 : 1,
                        backgroundColor: pressed ? "#cdddcd":"#eee"
                     })}
                     onPress={() => {}}>
                <YStack>
                    <XStack className="items-center justify-between mb-2">
                        <XStack className="items-center">
                            <Text className="text-2xl font-qbold text-black">{from} </Text>
                            <Avatar circular size="$7" borderColor="$black" borderWidth={1}>
                              <Avatar.Image
                                accessibilityLabel="Cam"
                                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                              />
                            <Avatar.Fallback backgroundColor="$gray5" />
                            </Avatar>
                            <Text className="text-2xl font-qbold text-black"> {to}</Text>
                        </XStack>
                        <Button className="h-16 w-16 bg-gray-300 rounded-full border-2 border-gray-400">
                            <Image source={icons.profile} className="w-12 h-12" resizeMode="contain"/>
                        </Button>
                    </XStack>
                    <YStack>
                        <Text className="text-base font-qsemibold text-grey-100">Conductor: {driver}</Text>
                        <Text className="text-basefont-qsemibold text-grey-100 mb-3">{date}</Text>
                        <Text className="text-xl font-qbold text-grey-800">${price}</Text>
                    </YStack>
                </YStack>
            </Pressable>
        </View>
    );
}