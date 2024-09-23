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
                            <Image source={icons.arrowright} className="w-4 h-4" tintColor="#000" resizeMode="contain"/>
                            <Text className="text-2xl font-qbold text-black"> {to}</Text>
                        </XStack>
                        <Avatar circular size="$7" borderColor="$black" borderWidth={1}>
                              <Avatar.Image
                                accessibilityLabel="Cam"
                                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                              />
                            <Avatar.Fallback backgroundColor="$gray5" />
                        </Avatar>
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