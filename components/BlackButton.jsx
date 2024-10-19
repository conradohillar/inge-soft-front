import { Button } from "tamagui";
import { useState } from "react";
import { Link } from "expo-router";
import { View } from "react-native";

export default function BlackButton({ href, children, variant, disabled, ...props }) {
    const [isPressed, setIsPressed] = useState(false);

    const primaryColor = variant === "secondary" ? "#59A58A" : "black";
    const secondaryColor = variant === "secondary" ? "black" : "#59A58A";

    return (
        <View className="items-center w-full">
            <Link href={href} asChild>
                <Button
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    disabled={disabled}
                    style={{
                        backgroundColor: isPressed ? secondaryColor : primaryColor,
                        borderColor: "black", borderWidth: 1
                    }}
                    className="w-[85%] h-[75px] rounded-full items-center justify-center m-2"
                    {...props}>

                    {children}

                </Button>
            </Link>
        </View>
    )
}