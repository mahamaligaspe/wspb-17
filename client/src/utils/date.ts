// Converts an ISO date ("2026-08-01") to display format ("01.08.2026").
export function formatDate(isoDate: string): string {
	const [year, month, day] = isoDate.split("-");
	return `${day}.${month}.${year}`;
}

// Converts a display date ("01.08.2026") to ISO format ("2026-08-01").
export function toIsoDate(displayDate: string): string {
	const [day, month, year] = displayDate.split(".");
	return `${year}-${month}-${day}`;
}
