import * as Yup from 'yup'

export const formSchema = Yup.object({
    first_name: Yup.string().required().label('First name'),
    middle_name: Yup.string().label('Middle name'),
    last_name: Yup.string().required().label('Last name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(6).label('Password')
})