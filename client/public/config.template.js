// Filled in at container startup from the API_URL environment variable.
// The app reads window.__ENV__ instead of a value baked in at build time.
window.__ENV__ = {
  API_URL: "${API_URL}",
};
