<script lang="ts" setup>

  definePageMeta({
    layout: 'default'
  })

  const sendEmail = async () => {
    $fetch('/api/sendEmail', {
      method: 'GET'
    })
      .then((res) => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      })
  }
</script>

<template>
  <div class="container">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, quisquam facilis veritatis ullam, voluptatibus nisi
    itaque officiis quos unde in quia minus expedita laboriosam. Corrupti temporibus illo amet. Aut, vitae?
    <button @click="sendEmail">send email</button>
  </div>
</template>