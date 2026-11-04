// https://nuxt.com/docs/4.x/api/nuxt-config

// Host names the development server answers for. Wodby sets WODBY_HOSTS to a
// JSON array of the environment's domains and WODBY_APP_SERVICE_NAME to the
// internal service name. Localhost and IP addresses are always allowed.
function allowedHosts(): string[] {
  const hosts: string[] = []
  try {
    const parsed: unknown = JSON.parse(process.env.WODBY_HOSTS || '[]')
    if (Array.isArray(parsed)) {
      hosts.push(...parsed.filter((host): host is string => typeof host === 'string'))
    }
  } catch {
    console.warn('WODBY_HOSTS is not a JSON array; ignoring it')
  }
  if (process.env.WODBY_APP_SERVICE_NAME) {
    hosts.push(process.env.WODBY_APP_SERVICE_NAME)
  }
  return hosts
}

// A Wodby workspace keeps the code on shared storage that does not deliver file
// events, and its start command sets CHOKIDAR_USEPOLLING. The watchers of Nuxt,
// Nitro and Vite all poll then, except the one that restarts the development
// server when this file changes; Nuxt's own watcher restarts it instead.
const polling = ['1', 'true'].includes((process.env.CHOKIDAR_USEPOLLING || '').toLowerCase())

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Nuxt on Wodby',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  watch: polling ? ['../nuxt.config.ts'] : [],
  vite: {
    server: {
      allowedHosts: allowedHosts(),
    },
  },
})
