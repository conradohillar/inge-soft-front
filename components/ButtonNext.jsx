import {Button} from "tamagui";
import { useState } from "react";
import { View } from "react-native";

export default function ButtonNext({children, variant , ...props}){
    const [isPressed, setIsPressed] = useState(false);
    // const screenHeight = Dimensions.get('window').height;
    // const screenWidth = Dimensions.get('window').width;
    // const buttonHeight = screenHeight * 0.07; // 7% of screen height
    // const buttonWidth = screenWidth * 0.45; // 45% of screen width
    const primaryColor = variant === "secondary" ? "#59A58A" : "black";
    const secondaryColor = variant === "secondary" ? "black" : "#59A58A";

    return(
        <View className="items-center w-full">
            <Button
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={{backgroundColor: isPressed ? secondaryColor : primaryColor,
                borderColor: "black", borderWidth: 1
                }}
                className="w-[85%] h-[75px] rounded-full items-center justify-center m-2"
                {...props}>
                
                {children}
            </Button>
        </View>
    )
}