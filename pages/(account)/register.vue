<script lang="ts" setup>
  import { ErrorMessage, Field, Form } from 'vee-validate'

  import { formSchema } from '~/lib/validation-schemas/RegisterSchema'

  const { public: { appName } } = useRuntimeConfig()

  useHead({
    title: 'Register :: ' + appName
  })

  definePageMeta({
    layout: 'simple',
    middleware: 'auth',
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/dashboard'
    },
    path: '/register'
  })

  const isLoading = ref(false)

  const formSubmit = async (values: any) => {
    isLoading.value = true
    
    await $fetch('/api/auth/register', {
      body: values,
      method: 'POST'
    })
      .finally(() => {
        isLoading.value = false
      })
  }
</script>

<template>
  <Form class="account__form" action="#" :validation-schema="formSchema" @submit="formSubmit">
    <div class="text--center">
      <Brand />
    </div>
    <h1>Sign Up</h1>
    <div class="row">
      <div class="col-4">
        <div class="form__group">
          <label for="rf__first_name">First name</label>
          <Field type="text" id="rf__first_name" name="first_name" />
          <ErrorMessage name="first_name" />
        </div>
      </div>
      <div class="col-4">
        <div class="form__group">
          <label for="rf__middle_name">Middle name</label>
          <Field type="text" id="rf__middle_name" name="middle_name" />
          <ErrorMessage name="middle_name" />
        </div>
      </div>
      <div class="col-4">
        <div class="form__group">
          <label for="rf__last_name">Last Name</label>
          <Field type="text" id="rf__last_name" name="last_name" />
          <ErrorMessage name="last_name" />
        </div>
      </div>
      <div class="col-12">
        <div class="form__group">
          <label for="rf__email">Email</label>
          <Field type="email" id="rf__email" name="email" />
          <ErrorMessage name="email" />
        </div>
      </div>
      <div class="col-6">
        <div class="form__group">
          <label for="rf__password">Password</label>
          <Field type="password" id="rf__password" name="password" />
          <ErrorMessage name="password" />
        </div>
      </div>
      <div class="col-6">
        <div class="form__group">
          <label for="rf__confirm_password">Confirm your password</label>
          <Field type="password" id="rf__confirm_password" name="confirm_password" />
          <ErrorMessage name="confirm_password" />
        </div>
      </div>
    </div>
    <div class="text--right">
      <button type="submit" :class="{ 'btn btn__primary': true, loading: isLoading }">Sign in</button>
    </div>
    <div class="account__action">
      <span class="seperator">OR</span>
      <p>Already have and account? <NuxtLink to="/login">Sign in</NuxtLink> here.</p>
    </div>
  </Form>
</template>