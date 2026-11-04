// Runs on the server only, so process.env and other server-side resources stay
// out of the browser bundle. Runtime variables, such as those of linked
// services, are read here at request time.
export default defineEventHandler(() => ({
  node: process.version,
  environment: process.env.WODBY_ENV_TYPE || 'local',
  renderedAt: new Date().toISOString(),
}))
