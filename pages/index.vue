<script lang="ts" setup>
  const { public: { appName } } = useRuntimeConfig()

  useHead({
    title: `Home :: ${appName}`
  })
  
  definePageMeta({
    layout: 'default'
  })
</script>

<template>
  <div class="container">
  </div>
</template>