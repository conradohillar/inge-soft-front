import * as yup from 'yup';


// Schema for Sign In
export const signInSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters'),
});

// Schema for Sign Up - Part 1
export const signUpPart1Schema = yup.object().shape({
    userName: yup
        .string()
        .required('User name is required'),
    dni: yup
        .string()
        .required('DNI is required'),
    address: yup
        .string()
        .required('Address is required'),
});

// Schema for Sign Up - Part 2
export const signUpPart2Schema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must contain at least 8 characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});