<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    name: 'dashboard'
  })

  const fetch = async () => {
    const a = await $fetch('/api/dashboard')
    console.log(a);
  }

  onMounted(() => {
    fetch()
  })
</script>

<template>
  <div>

  </div>
</template>
