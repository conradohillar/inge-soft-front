import * as yup from 'yup';

export const postTripSchema = yup.object().shape({
    fromLocation: yup.string().required('El campo "Desde" es obligatorio.'),
    toLocation: yup.string().required('El campo "Hasta" es obligatorio.'),
    date: yup
        .string()
        .required('El campo "Fecha de salida" es obligatorio.')
        .test('is-valid-date', 'El campo "Fecha de salida" debe ser una fecha válida.', value => !isNaN(Date.parse(value))),
    time: yup.string().required('El campo "Hora de salida" es obligatorio.')
});

export const postTripDetailsSchema = yup.object().shape({
    // car: yup.string().required('El campo "Auto" es obligatorio.'),
    // availableSeats: yup
    //     .number()
    //     .min(0, 'Debe haber al menos un asiento disponible.')
    //     .required('El campo "Asientos disponibles" es obligatorio.'),
    // spacesSmallPackage: yup
    //     .number()
    //     .min(0, 'El número de espacios para paquetes pequeños no puede ser negativo.')
    //     .required('El campo "Espacios para paquetes pequeños" es obligatorio.'),
    // spacesMediumPackage: yup
    //     .number()
    //     .min(0, 'El número de espacios para paquetes medianos no puede ser negativo.')
    //     .required('El campo "Espacios para paquetes medianos" es obligatorio.'),
    // spacesLargePackage: yup
    //     .number()
    //     .min(0, 'El número de espacios para paquetes grandes no puede ser negativo.')
    //     .required('El campo "Espacios para paquetes grandes" es obligatorio.'),
    // minPricePerson: yup.number().min(0, 'El precio mínimo por persona no puede ser negativo.').required(),
    // pricePerson: yup
    //     .number()
    //     .min(yup.ref('defaultPricePerson'), 'El precio por persona no puede ser menor que el valor mínimo.')
    //     .required('El campo "Precio por persona" es obligatorio.'),
    // minPriceSmallPackage: yup.number().min(0, 'El precio mínimo por paquete pequeño no puede ser negativo.').required(),
    // priceSmallPackage: yup
    //     .number()
    //     .min(yup.ref('defaultPriceSmallPackage'), 'El precio por paquete pequeño no puede ser menor que el valor mínimo.')
    //     .required('El campo "Precio por paquete pequeño" es obligatorio.'),
    // minPriceMediumPackage: yup.number().min(0, 'El precio mínimo por paquete mediano no puede ser negativo.').required(),
    // priceMediumPackage: yup
    //     .number()
    //     .min(yup.ref('defaultPriceMediumPackage'), 'El precio por paquete mediano no puede ser menor que el valor mínimo.')
    //     .required('El campo "Precio por paquete mediano" es obligatorio.'),
    // minPriceLargePackage: yup.number().min(0, 'El precio mínimo por paquete grande no puede ser negativo.').required(),
    // priceLargePackage: yup
    //     .number()
    //     .min(yup.ref('defaultPriceLargePackage'), 'El precio por paquete grande no puede ser menor que el valor mínimo.')
    //     .required('El campo "Precio por paquete grande" es obligatorio.'),
});

export const searchTripSchema = yup.object().shape({
    fromLocation: yup.string().required('El campo "Desde" es obligatorio.'),
    toLocation: yup.string().required('El campo "Hasta" es obligatorio.'),
    date: yup
        .string()
        .required('El campo "Fecha de salida" es obligatorio.')
        .test('is-valid-date', 'El campo "Fecha de salida" debe ser una fecha válida.', value => !isNaN(Date.parse(value))),
});