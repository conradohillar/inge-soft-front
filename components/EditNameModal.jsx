import React from 'react';
import { Button, XStack, YStack } from 'tamagui';
import Modal from 'react-native-modal';
import CustomInput from './CustomInput';
import { View, TouchableWithoutFeedback, Keyboard, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

const EditNameModal = ({ isVisible, onClose, onSave, onTextChange, value }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View className="bg-gray-100 p-5 rounded-xl items-center w-[90%] justify-center">
                            <Text className="text-2xl font-bold color-primary">Cambiar nombre</Text>
                            <CustomInput
                                placeholder="Ingresá tu nuevo nombre"
                                value={value}
                                handleChangeText={onTextChange}
                            />
                            <YStack className="w-full pt-4 items-center justify-around">
                                <Button className={"w-[40%]"} onPress={onSave}>
                                    <Text className="text-lg font-qsemibold color-white">Guardar</Text>
                                </Button>
                                <TouchableOpacity className={"w-[40%] items-center justify-center pt-4"} onPress={onClose}>
                                    <Text className="font-qsemibold color-[#F00] underline" >Cancelar</Text>
                                </TouchableOpacity>
                            </YStack>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default EditNameModal;
