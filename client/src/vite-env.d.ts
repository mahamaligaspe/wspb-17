/// <reference types="vite/client" />

// Runtime config written into config.js when the container starts.
interface Window {
	__ENV__?: { API_URL?: string };
}
