// The one place that knows where the API lives.
// Runtime config (staging/production) wins; Vite env is the local-dev fallback.
export const API_URL =
	window.__ENV__?.API_URL ??
	import.meta.env.VITE_API_URL ??
	"http://localhost:3001";
