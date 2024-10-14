import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignIn from '../app/(auth)/sign-in';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import axios from 'axios';
import SignUp from '../app/(auth)/sign-up';



jest.mock('axios');

const queryClient = new QueryClient();
const Provider = ({ children }) => (
    <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
);

describe('SignUp Component', () => {

    describe('sign-up page Snapshot', () => {
        it('debería coincidir con la snapshot', () => {
            const tree = render(<Provider><SignUp /></Provider>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

});