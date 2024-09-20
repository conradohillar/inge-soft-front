import {Button} from "tamagui";
import { useState } from "react";
import { Link } from "expo-router";
import { Dimensions } from "react-native";

export default function ButtonNext({children, height, width, className = '', ...props}){
    const [isPressed, setIsPressed] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const buttonHeight = screenHeight * 0.07; // 7% of screen height
    const buttonWidth = screenWidth * 0.45; // 45% of screen width

    return(
        
        <Button
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={{ height: (height ? height: buttonHeight), width: (width ? width : buttonWidth) }}
        className={`
            ${isPressed ? 'bg-secondary' : 'bg-black'}
            rounded-full 
            flex
            items-center
            justify-center
            m-2
          ${className}`}
          {...props}

    >
        {children}
    </Button>
      
    );
}