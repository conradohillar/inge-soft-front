import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignIn from '../app/(auth)/sign-in';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('SignIn component', () => {
    const queryClient = new QueryClient();
    test('should render the component', () => {
        const { getByText } = render(<QueryClientProvider client={queryClient}><SignIn /></QueryClientProvider>);
        expect(getByText('Sign in')).not.toBeNull();
    });

});