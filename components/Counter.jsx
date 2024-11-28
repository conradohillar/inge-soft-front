import { XStack, Text } from "tamagui";
import { Pressable } from "react-native";

const Counter = ({ count, handleChangeCount, maxCount, bgColor = "#fff" }) => {
  const increment = () => {
    if (count < maxCount) {
      const newCount = count + 1;
      handleChangeCount(newCount);
    }
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      handleChangeCount(newCount);
    }
  };

  return (
    <XStack className="items-center justify-between w-[150px]">
      <Pressable
        onPress={decrement}
        disabled={count === 0}
        style={{ padding: 10 }}
      >
        <Text
          className="font-qsemibold text-4xl"
          style={{ color: count === 0 ? bgColor : "#000" }}
        >
          -
        </Text>
      </Pressable>
      <Text className="text-4xl font-qsemibold text-black">{count}</Text>
      <Pressable
        onPress={increment}
        disabled={count === maxCount}
        style={{ padding: 10 }}
      >
        <Text
          className="font-qsemibold text-4xl"
          style={{ color: count === maxCount ? bgColor : "#000" }}
        >
          +
        </Text>
      </Pressable>
    </XStack>
  );
};

export default Counter;
