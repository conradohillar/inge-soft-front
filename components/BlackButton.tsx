import {Button} from "tamagui";
import { useState } from "react";

export default function BlackButton({children, height, width, ...props}){
    const [isPressed, setIsPressed] = useState(false);

    return(
        <Button
            height={height}
            width={width}
           // className={'${className}'}
            themeInverse
            borderRadius={100}
            margin="$3"
            style={{backgroundColor: isPressed ? '#59A58A' : '#000'}}
            {... props}

            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >
            {children}
        </Button>
    );
}