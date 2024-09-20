import {Button} from "tamagui";
import { useState } from "react";
import { Link } from "expo-router";

export default function BlackButton({href, children, className = '', ...props}){
    const [isPressed, setIsPressed] = useState(false);

    return(
        <Link href={href} asChild>
            <Button
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                className={`
                    ${isPressed ? 'bg-secondary' : 'bg-black'}
                    rounded-full 
                    m-3 
                    flex
                    items-center
                    justify-center
                    ${className}
                  `}
                  {...props}
        
            >
                {children}
            </Button>
        </Link>
    );
}