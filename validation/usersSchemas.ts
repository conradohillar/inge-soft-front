import * as yup from 'yup';

export const addCarSchema = yup.object().shape({
    model: yup
        .string()
        .required('Model is required'),
    plate: yup
        .string()
        .required('Plate is required')
        .matches(/^[a-zA-Z]{3}-\d{3}$/, 'Plate must have the format abc-123'),
        
    color: yup
        .string()
        .required('Color is required'),
});