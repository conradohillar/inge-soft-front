import { Button } from "tamagui";
import { useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";

export default function BlackButton({
  href,
  replace,
  children,
  variant,
  disabled,
  height,
  width,
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false);

  const primaryColor = variant === "secondary" ? "#59A58A" : "black";
  const secondaryColor = variant === "secondary" ? "black" : "#59A58A";

  return (
    <View className="items-center w-full">
      <Button
        height={height ? height : 65}
        width={width ? width : "85%"}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={replace ? () => router.replace(href) : () => router.push(href)}
        disabled={disabled}
        style={{
          backgroundColor: isPressed ? secondaryColor : primaryColor,
          borderColor: "black",
          borderWidth: 1,
        }}
        className="rounded-full items-center justify-center m-2"
        {...props}
      >
        {children}
      </Button>
    </View>
  );
}
