<script lang="ts" setup>
  const { appName } = useRuntimeConfig()
</script>

<template>
  <div class="text__center">
    <brand />
  </div>
  <main id="main">
    <slot />
  </main>
</template>


<style lang="scss" scoped>
  @import '~/assets/scss/base/variables';

  #main {
    background: $white;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>