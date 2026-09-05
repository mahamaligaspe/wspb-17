import type { Expense, NewExpense } from "../types/expense";

// Thin wrapper around the backend REST API — one function per endpoint.
// Nothing else in the app should call `fetch` directly; this is the only
// place that knows the API's URL and shape.
const API_URL = "http://localhost:3001/api/expenses";

export async function fetchExpenses(): Promise<Expense[]> {
	const res = await fetch(API_URL);
	return res.json();
}

export async function createExpense(expense: NewExpense): Promise<Expense> {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expense),
	});
	return res.json();
}

export async function updateExpense(
	id: string,
	expense: NewExpense,
): Promise<Expense> {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expense),
	});
	return res.json();
}

export async function deleteExpense(id: string): Promise<void> {
	await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
