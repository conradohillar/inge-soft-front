import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ButtonNext from '../../components/ButtonNext';
import { YStack } from 'tamagui';
import { Link } from 'expo-router';

export default function CredentialsPage(){

    const handleContinue = () => {
        
    }

    return (
        <SafeAreaView className="h-full w-full bg-background">
            <YStack className="items-center justify-evenly h-full">
                <Text className="text-black text-3xl font-qbold">Mis credenciales</Text>
                <ButtonNext variant={"secondary"} onPress={handleContinue}>
                    <Text className="text-white text-2xl font-qsemibold">Quiero ser conductor</Text>
                </ButtonNext>
                <Link href="/(tabs)/profile" asChild>
                    <Text className="text-primary text-lg font-qsemibold underline">Volver</Text>
                </Link>
            </YStack>
        </SafeAreaView>
    );
};
