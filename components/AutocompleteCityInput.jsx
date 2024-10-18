import { autocomplete } from "../services/utils";
import React, { memo, useCallback, useRef, useState } from "react";
import { Button, Dimensions, Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { YStack } from "tamagui";

export default function AutocompleteCityInput({
  title,
  placeholder,
  setValue,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  const getSuggestions = useCallback(async (text) => {
    if (text.length < 3) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    try {
      const items = await autocomplete(text);
      const suggestions = items.map((item, index) => ({
        id: index,
        title: item.display_name,
      }));

      setSuggestionsList(suggestions);
      setLoading(false);
    } catch (e) {
      throw e;
    }



  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => { }, []);

  return (
    <>
      <YStack className="w-full items-center justify-center mt-4">
        <View className="w-full items-center px-2">
          <View className="w-[85%]">
            <Text className="text-m font-qbold text-gray-600 mb-2">
              {title}
            </Text>
          </View>
        </View>
        <AutocompleteDropdown
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: "down" })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            setValue(item ? item.title : "");
            setSuggestionsList(null);
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: placeholder,
            autoCorrect: false,
            autoCapitalize: "none",
            style: {
              color: "#000",
              fontFamily: "Quicksand-Semibold",
              fontSize: 14,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,
            alignSelf: "center",
          }}
          inputContainerStyle={{
            backgroundColor: "#eee",
            height: 50,
            width: "100%",
            borderRadius: 8,
            borderWidth: isFocused ? 2 : 1,
            borderColor: isFocused ? "#59A58A" : "#333",
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#ddd",
            borderWidth: 1,
            borderColor: "#000",
          }}
          containerStyle={{
            width: "85%",
          }}
          renderItem={(item, text) => (
            <Text
              style={{
                color: "#000",
                padding: 15,
                fontFamily: "Quicksand-Semibold",
              }}
            >
              {item.title}
            </Text>
          )}
          //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
          //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
          inputHeight={50}
          showChevron={true}
          closeOnBlur={true}
          showClear={false}
        />
      </YStack>
    </>
  );
}
