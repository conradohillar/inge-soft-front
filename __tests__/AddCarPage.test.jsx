import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AddCarPage from '../app/(pages)/AddCarPage';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config'

jest.mock('axios');

const queryClient = new QueryClient();
const Provider = ({ children }) => (
    <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
);

describe('AddCarPage', () => {
    beforeEach(() => {
        axios.post.mockClear();
    });

    it('renders correctly', () => {
        const { getByText } = render(
            <Provider>
                <AddCarPage />
            </Provider>
        );
        expect(getByText('Cargá los datos')).toBeTruthy();
        expect(getByText('tu auto')).toBeTruthy();
    });

    it('displays error messages when form is submitted with empty fields', async () => {
        const { getByText } = render(
            <Provider>
                <AddCarPage />
            </Provider>
        );
        fireEvent.press(getByText('Agregar auto'));

        await waitFor(() => {
            expect(getByText('Model is required')).toBeTruthy();
            expect(getByText('Plate is required')).toBeTruthy();
            expect(getByText('Color is required')).toBeTruthy();
        });
    });

    it('calls mutation with correct data when form is submitted', async () => {
        axios.post.mockResolvedValueOnce({ data: {} });

        const { getByText, getByPlaceholderText } = render(
            <Provider>
                <AddCarPage />
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText('Ej: Toyota etios'), 'Toyota etios');
        fireEvent.changeText(getByPlaceholderText('Ej: abc-123'), 'abc-123');
        fireEvent.changeText(getByPlaceholderText('Ej: Rojo'), 'Red');
        fireEvent.press(getByText('Agregar auto'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://192.168.100.158:8000/users/addcar', {
                model: 'Toyota etios',
                plate: 'abc-123',
                color: 'Red',
            },
                { "headers": { "Authorization": "Bearer null", "Content-Type": "application/json" } });
        });
    });
    it('updates form field values correctly when typing', async () => {
        const { getByPlaceholderText } = render(
            <Provider>
                <AddCarPage />
            </Provider>
        );


        const modelInput = getByPlaceholderText('Ej: Toyota etios')
        const plateInput = getByPlaceholderText('Ej: abc-123');
        const colorInput = getByPlaceholderText('Ej: Rojo');


        fireEvent.changeText(modelInput, 'Toyota');
        fireEvent.changeText(plateInput, 'abc-123');
        fireEvent.changeText(colorInput, 'Red');


        await waitFor(() => {
            expect(modelInput.props.value).toBe('Toyota');
            expect(plateInput.props.value).toBe('abc-123');
            expect(colorInput.props.value).toBe('Red');
        });
    });


    describe('add car page Snapshot', () => {
        it('debería coincidir con la snapshot', () => {
            const tree = render(<Provider><AddCarPage /></Provider>).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
