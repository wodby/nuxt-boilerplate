<script setup lang="ts">
// The server route in server/api/info.get.ts. During server rendering useFetch
// calls it in the same process, and the result is sent with the page; refresh()
// fetches it again from the browser over HTTP.
const { data: info, refresh, status } = await useFetch('/api/info')
</script>

<template>
  <main>
    <h1>Nuxt on Wodby</h1>
    <p class="lead">
      Edit <code>app/pages/index.vue</code> to start building.
    </p>

    <dl v-if="info">
      <dt>Node.js</dt>
      <dd>{{ info.node }}</dd>
      <dt>Environment</dt>
      <dd>{{ info.environment }}</dd>
      <dt>Server time</dt>
      <dd>{{ info.renderedAt }}</dd>
    </dl>

    <button type="button" :disabled="status === 'pending'" @click="refresh()">
      Call the server route again
    </button>
  </main>
</template>
