import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../app/(auth)/sign-in';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";

const queryClient = new QueryClient();
const Provider = ({ children }) => (
    <TamaguiProvider config={config}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
);

describe('SignIn component', () => {
    it('should render the component', async () => {
        const { getByPlaceholderText } = render(<Provider><SignIn /></Provider>);

        const emailInput = getByPlaceholderText("Ingresá tu e-mail");

        fireEvent.changeText(emailInput, "santiagobassi21@gmail.com");

        await waitFor(() => {
            expect(emailInput.props.value).toBe("santiagobassi21@gmail.com");
        });
    });

    it('should display error messages for invalid inputs', async () => {
        const { getByText, getByPlaceholderText } = render(<Provider><SignIn /></Provider>);

        const emailInput = getByPlaceholderText("Ingresá tu e-mail");
        const passwordInput = getByPlaceholderText("Ingresá tu contraseña");
        const submitButton = getByText("Ir al Inicio");

        fireEvent.changeText(emailInput, "invalid-email");
        fireEvent.changeText(passwordInput, "short");
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(getByText("E-mail no es válido")).toBeTruthy();
            expect(getByText("La contraseña debe tener al menos 8 caracteres")).toBeTruthy();
        });
    });


});