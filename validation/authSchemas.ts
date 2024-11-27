import * as yup from 'yup';


// Schema for Sign In
export const signInSchema = yup.object().shape({
    email: yup
        .string()
        .required('Campo requerido')
        .email('E-mail inválido'),
    password: yup
        .string()
        .required('Campo requerido')
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

// Schema for Sign Up - Part 1
export const signUpPart1Schema = yup.object().shape({
    userName: yup
        .string()
        .required('Campo requerido'),
    dni: yup
        .string()
        .required('Campo requerido'),
    address: yup
        .string()
        .required('Campo requerido'),
});

// Schema for Sign Up - Part 2
export const signUpPart2Schema = yup.object().shape({
    email: yup
        .string()
        .required('Campo requerido')
        .email('E-mail inválido'),
    password: yup
        .string()
        .required('Campo requerido')
        .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Campo requerido'),
});
