<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import moment from 'moment'

    import countries from '@/lib/country'
    import currencies from '@/lib/currency'
    import { formSchema } from '~/lib/validation-schemas/InvoiceSchema'
    import { useInvoiceStore } from '@/store/invoice'

    import Confirm from '@/components/confirm.vue'
    import Preview from '~/components/invoice/preview.client.vue'

    import type { InvoiceDetail, InvoiceItem } from '~/app'

    useHead({
        title: 'Invoice Generator'
    })

    interface FormProps {
        invoiceIndex?: number
    }

    const props = defineProps<FormProps>()
    const { invoices, fieldLength, totolInvoices } = storeToRefs(useInvoiceStore())
    const { getInvoice, isInInvoiceList } = useInvoiceStore()

    const minDate = moment().local().format('YYYY-MM-DD')
    const maxDate = moment().local().add(5, 'days').format('YYYY-MM-DD')

    const fields = ref<InvoiceItem[]>([])
    const showAlert = ref(false)
    const showPreview = ref(false)
    const showErrorALert = ref(false)
    const invoiceForm = ref()
    const formData = ref<InvoiceDetail>()

    const removeItem = (index: number) => {
        if (fields.value.length == 1) {
            fields.value.splice(index, 1)
            addItem()
        } else
            fields.value.splice(index, 1)
    }

    const addItem = () => {
        fields.value.push({
            description: '',
            addition_detail: '',
            rate: 0.00,
            quantity: 1
        })
    }

    const submitHandler = (values: any) => {
        showPreview.value = true

        if (fieldLength.value > 160 && !isLoaded.value) {
            formData.value = values as InvoiceDetail
            showAlert.value = true
        }

        if (formData.value && isLoaded.value) {
            formData.value.date = minDate
            formData.value.invoice_no = invoiceNo.value
        }
    }

    const onAlertConfirm = () => {
        if (fieldLength.value > 160 && formData.value) {
            if (!isInInvoiceList(formData.value))
                invoices.value.push(formData.value)
            else
                showErrorALert.value = true
        }
    }

    const checkForProps = () => {
        if (typeof props.invoiceIndex != 'undefined' && props.invoiceIndex >= 0) {
            formData.value = getInvoice(props.invoiceIndex)
        }
    }

    const invoiceNo = computed(() => {
        const today = new Date()
        const company_name = formData.value?.to_name
            ? formData.value.to_name.substring(0, 4).toUpperCase()
            : 'INV'
        const num = today.getFullYear().toString().substring(2, 4) + (today.getMonth() + 1).toString().padStart(2, '0') + totolInvoices.value

        return `${company_name}${num}1`
    })

    const resetForm = () => {
        invoiceForm.value.setValues({
            date: '',
            invoice_no: '',
            from_name: '',
            from_email: '',
            from_address: '',
            from_city: '',
            from_state: '',
            from_country: '',
            from_post_code: '',

            to_name: '',
            to_email: '',
            to_address: '',
            to_city: '',
            to_state: '',
            to_country: '',
            to_post_code: '',
        })
    }

    const isLoaded = computed(() => typeof props.invoiceIndex != 'undefined' && props.invoiceIndex >= 0)

    onMounted(() => {
        addItem()
        checkForProps()
    })

    watch(props, () => {
        checkForProps()
    }, {
        deep: true,
        immediate: true
    })

    defineExpose({ resetForm })
</script>

<template>
    <Form action="#" ref="invoiceForm" @submit="submitHandler" :validation-schema="formSchema" class="invoice__form"
        v-slot="{ values }">
        <div class="row">
            <div class="col-12">
                <legend>Bank Details</legend>
            </div>
            <div class="col-6">
                <div class="form__group">
                    <label for="f__bank_name">Bank name</label>
                    <Field :readonly="isLoaded" type="text" id="f__bank_name" name="bank_name"
                        :value="formData?.bank_name" />
                    <ErrorMessage name="bank_name" />
                </div>
                <div class="form__group">
                    <label for="f__bank_branch">Bank branch name</label>
                    <Field :readonly="isLoaded" type="text" id="f__bank_branch" name="bank_branch"
                        :value="formData?.bank_branch" />
                    <ErrorMessage name="bank_branch" />
                </div>
                <div class="form__group">
                    <label for="f__bank_account_holder_name">Account holder name</label>
                    <Field :readonly="isLoaded" type="text" id="f__bank_account_holder_name"
                        name="bank_account_holder_name" :value="formData?.bank_account_holder_name" />
                    <ErrorMessage name="bank_account_holder_name" />
                </div>
            </div>
            <div class="col-6">
                <div class="form__group">
                    <label for="f__bank_account_number">Account number</label>
                    <Field :readonly="isLoaded" type="text" id="f__bank_account_number" name="bank_account_number"
                        :value="formData?.bank_account_number" />
                    <ErrorMessage name="bank_account_number" />
                </div>
                <div class="form__group">
                    <label for="f__bank_swift_code">Account number</label>
                    <Field :readonly="isLoaded" type="text" id="f__bank_swift_code" name="bank_swift_code"
                        :value="formData?.bank_swift_code" />
                    <ErrorMessage name="bank_swift_code" />
                </div>
            </div>
            <div class="col-12">
                <legend>Personal Details</legend>
            </div>
            <div class="col-8">
                <div class="row">
                    <div class="col-6">
                        <fieldset>
                            <strong class="title">From</strong>
                            <div class="form__group">
                                <label for="f__from_name">Name</label>
                                <Field :readonly="isLoaded" type="text" id="f__from_name" name="from_name"
                                    :value="formData?.from_name" />
                                <ErrorMessage name="from_name" title="Name" />
                            </div>
                            <div class="form__group">
                                <label for="f__from_email">Email</label>
                                <Field :readonly="isLoaded" type="email" id="f__from_email" name="from_email"
                                    title="Email" :value="formData?.from_email" />
                                <ErrorMessage name="from_email" />
                            </div>
                            <div class="form__group">
                                <label for="f__from_address">Address</label>
                                <Field :readonly="isLoaded" type="text" id="f__from_address" name="from_address"
                                    :value="formData?.from_address" />
                                <ErrorMessage name="from_address" />
                            </div>
                            <template v-if="values.from_address">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__from_city">City</label>
                                            <Field :readonly="isLoaded" type="text" id="f__from_city" name="from_city"
                                                :value="formData?.from_city" />
                                            <ErrorMessage name="from_city" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__from_state">State</label>
                                            <Field :readonly="isLoaded" type="text" id="f__from_state" name="from_state"
                                                :value="formData?.from_state" />
                                            <ErrorMessage name="from_state" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__from_city">Country</label>
                                            <Field :readonly="isLoaded" as="select" id="f__from_country"
                                                name="from_country" :value="formData?.from_country">
                                                <option value="">Select a country</option>
                                                <option v-for="country in countries" :value="country.code">{{
                                                    country.name }}
                                                </option>
                                            </Field>
                                            <ErrorMessage name="from_country" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__from_city">Post code</label>
                                            <Field :readonly="isLoaded" type="text" id="f__from_post_code"
                                                name="from_post_code" :value="formData?.from_post_code" />
                                            <ErrorMessage name="from_post_code" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </fieldset>
                    </div>
                    <div class="col-6">
                        <fieldset>
                            <strong class="title">Bill to</strong>
                            <div class="form__group">
                                <label for="f__to_name">Name</label>
                                <Field :readonly="isLoaded" type="text" id="f__to_name" name="to_name"
                                    :value="formData?.to_name" />
                                <ErrorMessage name="to_name" />
                            </div>
                            <div class="form__group">
                                <label for="f__to_email">Email</label>
                                <Field :readonly="isLoaded" type="email" id="f__to_email" name="to_email"
                                    :value="formData?.to_email" />
                                <ErrorMessage name="to_email" />
                            </div>
                            <div class="form__group">
                                <label for="f__to_address">Address</label>
                                <Field :readonly="isLoaded" type="text" id="f__to_address" name="to_address"
                                    :value="formData?.to_address" />
                                <ErrorMessage name="to_address" />
                            </div>
                            <template v-if="values.to_address">
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__to_city">City</label>
                                            <Field :readonly="isLoaded" type="text" id="f__to_city" name="to_city"
                                                :value="formData?.to_city" />
                                            <ErrorMessage name="to_city" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__to_state">State</label>
                                            <Field :readonly="isLoaded" type="text" id="f__to_state" name="to_state"
                                                :value="formData?.to_state" />
                                            <ErrorMessage name="to_state" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__to_country">Country</label>
                                            <Field :readonly="isLoaded" as="select" id="f__to_country" name="to_country"
                                                :value="formData?.to_country">
                                                <option value="">Select a country</option>
                                                <option v-for="country in countries" :value="country.code">{{
                                                    country.name }}
                                                </option>
                                            </Field>
                                            <ErrorMessage name="to_country" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form__group">
                                            <label for="f__to_post_code">Post code</label>
                                            <Field :readonly="isLoaded" type="text" id="f__to_post_code"
                                                name="to_post_code" :value="formData?.to_post_code" />
                                            <ErrorMessage name="to_post_code" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </fieldset>
                    </div>
                </div>
                <fieldset class="w--full">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Description</th>
                                <th>Rate</th>
                                <th>QTY</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in fields">
                                <td><button type="button" class="btn btn__secondary btn--outline btn--icon"
                                        @click="removeItem(index)">&times;</button></td>
                                <td>
                                    <input type="text" placeholder="Item Description" v-model="item.description">
                                    <textarea placeholder="Additional Details" v-model="item.addition_detail" />
                                </td>
                                <td class="rate">
                                    <input type="number" class="text--right" min="0.00" v-model="item.rate">
                                </td>
                                <td class="quantity">
                                    <input type="number" class="text--right" v-model="item.quantity">
                                </td>
                                <td class="text--center total">{{ currencies[values.currency].symbol }} {{ item.rate *
                                    item.quantity }}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <button type="button" class="btn btn__primary btn--icon"
                                        @click="addItem">&plus;</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>
            </div>
            <div class="col-4">
                <div class="form__group">
                    <label for="f__date">Date</label>
                    <Field type="date" id="f__date" name="date" :min="minDate" :max="maxDate" :value="minDate" />
                    <ErrorMessage name="date" />
                </div>
                <div class="form__group">
                    <label for="f__invoice_no">Invoice No.</label>
                    <Field :readonly="isLoaded" type="text" id="f__invoice_no" name="invoice_no" :value="invoiceNo" />
                    <ErrorMessage name="invoice_no" />
                </div>
                <div class="form__group">
                    <label for="f__currency">Currency</label>
                    <Field as="select" :disabled="isLoaded" id="f__currency" name="currency" value="USD">
                        <option value="">Select an currency</option>
                        <option v-for="(item, currency) in currencies" :value="currency">{{ item.symbol }}: {{ item.name
                            }}</option>
                    </Field>
                    <ErrorMessage name="currency" />
                </div>
                <button type="submit" class="btn btn--block btn__primary">
                    <MdiIcon size="24" icon="mdiFileEye" />
                    Preview
                </button>
                <NuxtLink to="/invoices" class="btn btn--block btn__primary btn--outline">
                    <MdiIcon size="24" icon="mdiArrowLeft" />
                    Back
                </NuxtLink>
            </div>
        </div>
    </Form>
    <Confirm v-model:show="showAlert" status="info" title="Do you want to Save for later?"
        description="If you save for later you can use same details for later." cancel-text="No" confirm-text="Yes"
        :on-cancel="() => { showAlert = false }" :on-confirm="onAlertConfirm" />
    <Confirm v-model:show="showErrorALert" status="danger" title="The Invoice You want to add already exists."
        :description="`Looks like you have already added for ${formData?.to_name} do you still want to add?`" />
    <preview v-model:show="showPreview" v-if="formData" :fields="fields" :data="formData" />
</template>