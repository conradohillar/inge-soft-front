import { render } from '@testing-library/react-native';

import LandingPage from '@/app/(pages)/LandingPage';

describe('<LandingPage />', () => {
    test('Text renders correctly on LandingPage', () => {
        const { getByText } = render(<LandingPage />);

        getByText('rydio');
        getByText('Iniciar sesión');
        getByText('Continuar sin cuenta');
        getByText('No tenés cuenta?');
        getByText('Registrate');
    });
});
