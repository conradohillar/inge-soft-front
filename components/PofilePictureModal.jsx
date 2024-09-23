import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { XStack } from 'tamagui';
import { icons } from '../constants';
import { Image } from 'tamagui';

const ProfilePictureModal = ({ isVisible, onClose, onChooseFromLibrary, onTakePicture, onDeletePicture }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} className="justify-center items-center">
      <View className="bg-background p-5 rounded-xl items-start w-[90%]">
        <TouchableOpacity onPress={onChooseFromLibrary} className="py-2 ">
            <XStack className="w-[80%] items-center justify-start space-x-5">
                <Image source={icons.image} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Text className="text-lg font-qsemibold">Elegir del carrete</Text>
            </XStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={onTakePicture} className=" w-full py-2 border-t border-b border-gray-400 py-3">
            <XStack className="w-[80%] items-center justify-start space-x-5 ">
                <Image source={icons.camera} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Text className="text-lg font-qsemibold">Sacar una foto</Text>
            </XStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeletePicture} className="py-2">
            <XStack className="w-[80%] items-center justify-start space-x-5">
                <Image source={icons.trash} className="h-6 w-6" tintColor="#aaa" resizeMode='contain'/>
                <Text className="text-lg font-qsemibold">Eliminar foto</Text>
            </XStack>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ProfilePictureModal;