import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import LandingPage from '../app/(pages)/LandingPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';



describe('LandingPage', () => {
    it('renders correctly', async () => {
        const { getByText } = render(
            <TamaguiProvider config={config}>
                <LandingPage />
            </TamaguiProvider >

        );


        await waitFor(() => {

            expect(getByText('Iniciar sesión')).toBeTruthy();
            expect(getByText('Continuar sin cuenta')).toBeTruthy();
            expect(getByText('No tenés cuenta?')).toBeTruthy();
            expect(getByText('Registrate')).toBeTruthy();

        });

    });
});