# Nuxt starter for Wodby

A starter for the [Wodby Nuxt service](https://github.com/wodby/service-nuxt) and
[Nuxt stack](https://github.com/wodby/stack-nuxt).

It includes:

- [Nuxt](https://nuxt.com) 4 with Vue, TypeScript and file-based routing
- a server route in `server/api/info.get.ts`, called with `useFetch` during
  server rendering and from the browser
- Nitro's Node.js server output, started with `node .output/server/index.mjs`
- Wodby CI build, push, deployment and a post-deployment health check
- a lightweight health endpoint at `/healthz`

## Local development

Requires Node.js 22.22.3 or later in the 22 line, 24.15.0 or later in the 24
line, or 26 and later.

```shell
npm install
npm run dev
```

Open http://localhost:3000. Edit `app/pages/index.vue`; the page updates as
you save. Add a page by creating a file in `app/pages`, and a server route by
creating a file in `server/api` or `server/routes`.

Check types and run the production build locally:

```shell
npm run typecheck
npm run build
npm run start
```

## Configuration

Settings that differ between environments belong in `runtimeConfig` in
`nuxt.config.ts`. Declare each key there with a default, and set it at runtime
with a variable named after it, such as `NUXT_API_SECRET` for
`runtimeConfig.apiSecret` or `NUXT_PUBLIC_API_BASE` for
`runtimeConfig.public.apiBase`. Keys under `public` are sent to the browser.
The production server does not read `.env` files.

## On Wodby

The pipeline in `.wodby/pipeline.yml` installs dependencies with `npm ci`, then
the service's image build runs `npm run build`. The container starts with
`npm run start` and listens on port 3000.

Runtime variables, including the database, Redis and mail variables of linked
services, are not available during the build, and `nuxt.config.ts` is
evaluated only then. Read them in server routes or server middleware with
`process.env` or `useRuntimeConfig(event)`, at request time.

Wodby generates `NUXT_APP_SECRET` for each environment. Nuxt's sessions
(`useSession` from `nuxt/server`) and modules that derive secrets from it use
that value.

In a development workspace, Wodby starts Nuxt's development server with
`nuxt dev`. `nuxt.config.ts` allows the environment's host names from
`WODBY_HOSTS`, which the development server needs to answer requests for them.
Workspace storage does not report file changes, so the development server polls
for them; `nuxt.config.ts` also lets Nuxt restart itself when that file changes.
