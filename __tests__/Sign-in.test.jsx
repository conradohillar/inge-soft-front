import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../app/(auth)/sign-in';
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

describe('SignIn component', () => {
    const user = [{
        "name": "Santiago Bassi",
        "email": "santiagobassi21@gmail.com",
        "address": "Chascomús, Partido de Chascomús, Buenos Aires, Argentina",
        "dni": 123456789,
        "photo_url": "https://i.ibb.co/WxTJXCZ/de12caf4398b.jpg",
        "is_driver": true
    }];

    axios.get.mockResolvedValue(user);

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

    it('should display error message for non-existent email and password', async () => {
        axios.post.mockRejectedValue({
            response: {
                status: 401,
                data: { message: 'E-mail o contrasena invalidos.' }
            }
        });

        const { getByText, getByPlaceholderText } = render(<Provider><SignIn /></Provider>);

        const emailInput = getByPlaceholderText("Ingresá tu e-mail");
        const passwordInput = getByPlaceholderText("Ingresá tu contraseña");
        const submitButton = getByText("Ir al Inicio");

        fireEvent.changeText(emailInput, "nonexistent@example.com");
        fireEvent.changeText(passwordInput, "wrongpassword");
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(getByText("E-mail o contrasena invalidos.")).toBeTruthy();
        });
    });
    it('should display error message for non-existent email and password', async () => {
        axios.post.mockRejectedValue({
            response: {
                status: 408,
                data: { message: 'Axios error. Timeout' }
            }
        });

        const { getByText, getByPlaceholderText } = render(<Provider><SignIn /></Provider>);

        const emailInput = getByPlaceholderText("Ingresá tu e-mail");
        const passwordInput = getByPlaceholderText("Ingresá tu contraseña");
        const submitButton = getByText("Ir al Inicio");

        fireEvent.changeText(emailInput, "nonexistent@example.com");
        fireEvent.changeText(passwordInput, "wrongpassword");
        fireEvent.press(submitButton);

        await waitFor(() => {
            expect(getByText("Error de conexion, intente mas tarde.")).toBeTruthy();
        });
    });
});
