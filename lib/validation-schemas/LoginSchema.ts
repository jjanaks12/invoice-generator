import * as Yup from 'yup'

export const formSchema = Yup.object({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().label('Password')
})