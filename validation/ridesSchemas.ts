import * as yup from 'yup';

export const postTripSchema = yup.object().shape({
    fromLocation: yup.string().required('Campo obligatorio.'),
    toLocation: yup.string().required('Campo obligatorio.'),
    date: yup
        .string()
        .required('Campo obligatorio.')
        .test('is-valid-date', 'Fecha inválida.', value => !isNaN(Date.parse(value))),
    time: yup.string().required('Campo obligatorio.')
});

export const postTripDetailsSchema = yup.object().shape({
    car: yup.string().required('Campo obligatorio.'),
    availableSeats: yup
        .number()
        .min(0, 'Debe haber al menos un asiento disponible.')
        .required('Campo obligatorio.'),
    spacesSmallPackage: yup
        .number()
        .min(0, 'El número de espacios para paquetes pequeños no puede ser negativo.')
        .required('Campo obligatorio.'),
    spacesMediumPackage: yup
        .number()
        .min(0, 'El número de espacios para paquetes medianos no puede ser negativo.')
        .required('Campo obligatorio.'),
    spacesLargePackage: yup
        .number()
        .min(0, 'El número de espacios para paquetes grandes no puede ser negativo.')
        .required('Campo obligatorio.'),
    pricePerson: yup
        .number()
        .min(yup.ref('defaultPricePerson'), 'El precio no puede ser menor que el mínimo.')
        .required('Campo obligatorio.'),
    priceSmallPackage: yup
        .number()
        .min(yup.ref('defaultPriceSmallPackage'), 'El precio no puede ser menor que el mínimo.')
        .required('Campo obligatorio.'),
    priceMediumPackage: yup
        .number()
        .min(yup.ref('defaultPriceMediumPackage'), 'El precio no puede ser menor que el mínimo.')
        .required('Campo obligatorio.'),
    priceLargePackage: yup
        .number()
        .min(yup.ref('defaultPriceLargePackage'), 'El precio no puede ser menor que el mínimo.')
        .required('Campo obligatorio.'),
});

export const searchTripSchema = yup.object().shape({
    fromLocation: yup.string().required('Campo obligatorio.'),
    toLocation: yup.string().required('Campo obligatorio.'),
    date: yup
        .string()
        .required('Campo obligatorio.')
        .test('is-valid-date', 'Fecha inválida.', value => !isNaN(Date.parse(value))),
});
