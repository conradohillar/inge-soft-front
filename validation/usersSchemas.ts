import * as yup from 'yup';

export const addCarSchema = yup.object().shape({
    model: yup
        .string()
        .required('Campo obligatorio'),
    plate: yup
        .string()
        .required('Campo obligatorio')
        .matches(/(^[a-zA-Z]{3}-\d{3}$)|(^[a-zA-Z]{2}-\d{3}-[a-zA-Z]{2}$)/, 'Patentes validas: AAA-000 o AA-000-AA'),
        
    color: yup
        .string()
        .required('Campo obligatorio'),
});