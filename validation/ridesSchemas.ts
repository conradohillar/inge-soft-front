import * as yup from 'yup';

export const postTripSchema = yup.object().shape({
    fromLocation: yup.string().required('Campo obligatorio.'),
    toLocation: yup.string().required('Campo obligatorio.'),
    date: yup
        .string()
        .required('Campo obligatorio.')
        .test('is-valid-date', 'Fecha inválida.', value => !isNaN(Date.parse(value)))
        .test('is-not-past', 'Fecha inválida.', value => {
            const selectedDate = new Date(value);
            const today = new Date();
            
            selectedDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            
            return selectedDate >= today;
        }),
    time: yup
        .string()
        .required('Campo obligatorio.')
        .test('is-valid-time', 
            "Hora inválida", 
            (value, context) => {
            if (!value || !context.parent.date) return true;

                const selectedTime = new Date(context.originalValue);
                const selectedDate = new Date(context.parent.date);
                const today = new Date();
                
                if (selectedDate.getDate() === today.getDate() &&
                    selectedDate.getMonth() === today.getMonth() &&
                    selectedDate.getFullYear() === today.getFullYear()) {
                    
                    const hours = selectedTime.getHours();
                    const minutes = selectedTime.getMinutes();
                    const currentHour = today.getHours();
                    const currentMinutes = today.getMinutes();

                    const selectedTimeInMinutes = hours * 60 + minutes;
                    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
                    
                    return selectedTimeInMinutes > currentTimeInMinutes;
                }
                
                return true;
            })
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
