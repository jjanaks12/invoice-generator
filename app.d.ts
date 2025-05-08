import NextAuth from "next-auth"

type Status = 'success' | 'info' | 'danger'

interface InvoiceItem {
    description: string
    addition_detail: string
    rate: number
    quantity: number
}

interface InvoiceDetail {
    date: string
    currency: string
    invoice_no: string
    from_name: string
    from_email: string
    from_address: string
    from_city: string
    from_state: string
    from_country: string
    from_post_code: string

    to_name: string
    to_email: string
    to_address: string
    to_city: string
    to_state: string
    to_country: string
    to_post_code: string

    bank_name: string
    bank_branch: string
    bank_account_holder_name: string
    bank_account_number: string
    bank_swift_code: string
}

type CurrencyDetail = {
    symbol: string
    name: string
    symbol_native: string
    decimal_digits: number
    rounding: number
    code: string
    name_plural: string
}

type Currency = {
    [propname: string]: CurrencyDetail
}

type APIError = {
    [propsName: string]: string[]
}

type APISuccessResponse<T> = {
    status: 'success'
    data: T | null
}

type APIErrorResponse = {
    status: 'failed'
    message: string
    errors?: APIError
}

type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse


declare global {
    namespace PrismaJson {
        type JSONInvoiceDetail = {
            data: InvoiceDetail
            fields: InvoiceItem[]
        }
    }
}
declare module "next-auth" {
    /**
     * Returned by `useSession` `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: {
            id?: string
        } & DefaultSession["user"]
    }
}