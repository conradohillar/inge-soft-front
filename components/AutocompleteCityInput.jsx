import { autocomplete } from "../services/utils";
import React, { memo, useCallback, useRef, useState } from "react";
import { Button, Dimensions, Text, View, Platform } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { YStack, Label } from "tamagui";

export default function AutocompleteCityInput({
  title,
  placeholder,
  setValue,
  hint,
  borderColor,
  width,
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
      console.log(items);
      const suggestions = items.map((item, index) => ({
        id: index,
        title: item.display_name,
      }));

      setSuggestionsList(suggestions);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const onClearPress = useCallback(() => {
    setSuggestionsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  return (
    <>
      <YStack
        className={`w-[${width ? width : "85%"}] items-center justify-center`}
      >
        <Text className="text-m font-qbold text-gray-600 px-2 mb-2 self-start">
          {title}
        </Text>
        <AutocompleteDropdown
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          direction={Platform.select({ ios: "down" })}
          dataSet={suggestionsList}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
            backgroundColor: "#F5F5F5",
            height: 55,
            width: "100%",
            borderRadius: 8,
            borderWidth: isFocused ? 2 : 1,
            borderColor: borderColor
              ? borderColor
              : isFocused
              ? "#59A58A"
              : "#333",
          }}
          containerStyle={{
            width: "100%",
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#F5F5F5",
            borderWidth: 1,
            borderColor: "#000",
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
          inputHeight={50}
          showChevron={false}
          closeOnBlur={true}
          showClear={false}
        />
        {hint && (
          <Text className="text-red-500 text-sm font-qsemibold pt-2 px-2 self-start">
            {" "}
            {hint}
          </Text>
        )}
      </YStack>
    </>
  );
}
