<script setup lang="ts">
    import { ErrorMessage, Field, Form } from 'vee-validate'
    import Brand from '~/components/brand.vue'

    import { formSchema } from '~/lib/validation-schemas/LoginSchema'

    const { public: { appName } } = useRuntimeConfig()

    definePageMeta({
        layout: 'simple',
        middleware: 'auth',
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/dashboard'
        }
    })

    useHead({
        title: 'Login :: ' + appName
    })

    const formSubmit = (values: any) => {
        console.log(values)
    }
</script>

<template>
    <Form class="account__form" action="#" @submit="formSubmit" :validation-schema="formSchema">
        <div class="text--center">
            <Brand />
        </div>
        <h1>Sign in</h1>
        <div class="form__group">
            <label for="lf__email">Email</label>
            <Field type="email" id="lf__email" name="email" />
            <ErrorMessage name="email" title="Email" />
        </div>
        <div class="form__group">
            <label for="lf__password">Password</label>
            <Field type="password" id="lf__password" name="password" />
            <ErrorMessage name="password" title="Password" />
        </div>
        <div class="text--right">
            <button type="submit" class="btn btn__primary">Sign in</button>
        </div>
        <div class="account__action">
            <span class="seperator">OR</span>
            <p>No account? <NuxtLink to="/register">Sign up</NuxtLink> here</p>
        </div>
    </Form>
</template>