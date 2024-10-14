import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import MyCarsPage from '../app/(pages)/MyCarsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import axios from 'axios';

jest.mock('axios');


const queryClient = new QueryClient();
const Provider = ({ children }) => (
    <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
);

describe('MyCarsPage', () => {


    it('renders loading state initially', () => {
        const { getByText } = render(<Provider><MyCarsPage /></Provider>);

        expect(getByText('Estamos cargando')).toBeTruthy();

    });

    const cars = [
        { model: 'Toyota', plate: 'ABC123' },
        { model: 'Honda', plate: 'XYZ789' },
    ];


    axios.get.mockResolvedValueOnce({ data: cars });

    it('renders list of cars', async () => {


        const { getByText } = render(<Provider><MyCarsPage /></Provider>);


        await waitFor(() => {
            expect(getByText('Toyota')).toBeTruthy();
            expect(getByText('Honda')).toBeTruthy();
        });
    });
    describe('my cars page Snapshot', () => {
        it('debería coincidir con la snapshot', () => {
            const tree = render(<Provider><MyCarsPage /></Provider>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

});
