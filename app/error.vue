<script setup lang="ts">
import type { NuxtError } from '#app'

// Rendered for errors and for pages that do not exist. The response keeps the
// error's status code, such as 404.
defineProps<{ error: NuxtError }>()
</script>

<template>
  <main>
    <h1>{{ error.status === 404 ? 'Page not found' : 'Something went wrong' }}</h1>
    <p>
      <button type="button" @click="clearError({ redirect: '/' })">
        Go to the home page
      </button>
    </p>
  </main>
</template>
