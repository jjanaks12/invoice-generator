<script lang="ts" setup>
  import { ErrorMessage, Field, Form } from 'vee-validate'

  import { formSchema } from '~/lib/validation-schemas/RegisterSchema'

  const { appName } = useRuntimeConfig()

  useHead({
    title: 'Register :: ' + appName
  })

  definePageMeta({
    layout: 'simple'
  })

  const formSubmit = (values: any) => {
    console.log(values)
  }
</script>

<template>
  <Form action="#" :validation-schema="formSchema" @submit="formSubmit">
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
    </div>
    <div class="form__group">
      <label for="rf__email">Email</label>
      <Field type="email" id="rf__email" name="email" />
      <ErrorMessage name="email" />
    </div>
    <div class="form__group">
      <label for="rf__password">Password</label>
      <Field type="password" id="rf__password" name="password" />
      <ErrorMessage name="password" />
    </div>
    <div class="text--right">
      <button type="submit" class="btn btn__primary">Sign in</button>
    </div>
    <span class="seperator">OR</span>
    <div class="">
      <p>Already have and account? <NuxtLink to="/login">Sign in</NuxtLink> here.</p>
    </div>
  </Form>
</template>