import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Profile from '../app/(tabs)/profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import axios from 'axios';

jest.mock('axios');

global.alert = jest.fn();

const queryClient = new QueryClient();
const Provider = ({ children }) => (
    <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
);

describe('Profile Component', () => {

    const name = "Santiago Bassi";
    const email = "santaigobassi21@gmail.com";
    const url = "https://i.ibb.co/WxTJXCZ/de12caf4398b.jpg";
    const data = {
        "name": name,
        "email": email,
        "address": "Chascomús, Partido de Chascomús, Buenos Aires, Argentina",
        "dni": 123456789,
        "photo_url": url,
        "is_driver": true
    };

    axios.get.mockResolvedValue({ data });

    it('data ok', async () => {
        const { getByText, findByTestId } = render(<Provider><Profile /></Provider>);

        await waitFor(() => {
            expect(getByText(name)).toBeTruthy();
            expect(getByText(email)).toBeTruthy();
            expect(findByTestId("profile-picture")).toBeTruthy();
            expect(getByText("Credenciales")).toBeTruthy();
            expect(getByText("Mis autos")).toBeTruthy();
        });
    });



    describe('profile page Snapshot', () => {
        it('debería coincidir con la snapshot', () => {
            const tree = render(<Provider><Profile /></Provider>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

});