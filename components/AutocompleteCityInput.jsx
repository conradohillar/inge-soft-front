import React, { useState } from 'react';
import { Input } from 'tamagui';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { autocomplete } from '../services/autocomplete';

export default function AutocompleteCityInput({ title, placeholder, value, onChangeText }) {
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias

  const handleInputChange = async (text) => {
    onChangeText(text);
    if (text.length > 2) { // Solo buscar si el texto tiene más de 2 caracteres
      const results = await autocomplete(text);
      setSuggestions(results); // Guardar las sugerencias
    } else {
      setSuggestions([]); // Limpiar sugerencias si el texto es demasiado corto
    }
  };

  const handleSuggestionPress = (displayName) => {
    onChangeText(displayName); // Actualizar el valor del campo de texto
    setSuggestions([]); // Limpiar la lista de sugerencias
  };

  return (
    <View className="w-full items-flex-start justify-center py-3 px-10">
      <Text className="text-xs font-qsemibold text-gray-600 px-1.5 mb-2">{title}</Text>
      <Input
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        style={{ backgroundColor: "#EEEEEE" }}
        value={value}
        onChangeText={handleInputChange} // Llamar a la función que maneja el autocompletado
      />
      {/* Mostrar sugerencias debajo del input */}
      {(
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item.display_name)}>
              <Text className="p-2 text-black">{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
