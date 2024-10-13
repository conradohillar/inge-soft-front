import React, { useState } from 'react';
import { TextInput } from 'react-native';


const Test = () => {
    const [email, setEmail] = useState('');



    return (

        <TextInput
            type="email"
            id="email"
            value={email}
            onChangeText={setEmail}
            placeholder='hola'
        />

    );
};

export default Test;