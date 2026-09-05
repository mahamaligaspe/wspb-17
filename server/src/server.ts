import { app } from "./app.js";

// Entry point: starts the HTTP server. Kept separate from app.ts so the
// app itself can be imported without side effects.
const port = 3001;

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
