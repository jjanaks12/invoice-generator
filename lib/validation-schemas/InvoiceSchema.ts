import * as Yup from 'yup'

export const formSchema = Yup.object({
    date: Yup.string().label('Date'),
    invoice_no: Yup.string().label('Invoice number'),
    from_name: Yup.string().label('Name'),
    from_email: Yup.string().email().label('Email'),
    from_address: Yup.string().label('Address'),
    from_city: Yup.string().label('City').when('from_address', (from_address, schema) => {
        if (!from_address)
            return schema.required()
        return schema
    }),
    from_state: Yup.string().label('State').when('from_address', (from_address, schema) => {
        if (!from_address)
            return schema.required()
        return schema
    }),
    from_country: Yup.string().label('Country').when('from_address', (from_address, schema) => {
        if (!from_address)
            return schema.required()
        return schema
    }),
    from_post_code: Yup.string().label('Post code').when('from_address', (from_address, schema) => {
        if (!from_address)
            return schema.required()
        return schema
    }),

    to_name: Yup.string().label('Name'),
    to_email: Yup.string().email().label('Email'),
    to_address: Yup.string().label('Address'),
    to_city: Yup.string().label('City').when('to_address', (to_address, schema) => {
        if (!to_address)
            return schema.required()
        return schema
    }),
    to_state: Yup.string().label('State').when('to_address', (to_address, schema) => {
        if (!to_address)
            return schema.required()
        return schema
    }),
    to_country: Yup.string().label('Country').when('to_address', (to_address, schema) => {
        if (!to_address)
            return schema.required()
        return schema
    }),
    to_post_code: Yup.string().label('Post code').when('to_address', (to_address, schema) => {
        if (!to_address)
            return schema.required()
        return schema
    }),
})