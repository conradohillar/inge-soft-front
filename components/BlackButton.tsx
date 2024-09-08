import {Button} from "tamagui";
import { useState } from "react";
import { Link } from "expo-router";

export default function BlackButton({children, height, width, href, ...props}){
    const [isPressed, setIsPressed] = useState(false);

    return(
        <Link href={href} asChild>
            <Button
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                style={{backgroundColor: isPressed ? '#59A58A' : '#000000'}}
                height={height}
                width={width}
               // className={'${className}'}
                //themeInverse
                borderRadius={100}
                margin="$3"
                {... props}
        
            >
                {children}
            </Button>
        </Link>
    );
}