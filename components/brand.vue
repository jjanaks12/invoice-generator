<script lang="ts" setup>
  const { public: { appName } } = useRuntimeConfig()
</script>

<template>
  <div class="logo">
    <NuxtLink to="/">{{ appName }}</NuxtLink>
  </div>
</template>