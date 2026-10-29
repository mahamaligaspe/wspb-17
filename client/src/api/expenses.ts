import type { Expense, NewExpense } from "../types/expense";
import { API_URL } from "./config";

// Thin wrapper around the backend REST API — one function per endpoint.
// Nothing else in the app should call `fetch` directly; this is the only
// place that knows the API's shape (the base URL comes from ./config).
const ENDPOINT = `${API_URL}/api/expenses`;

export async function fetchExpenses(): Promise<Expense[]> {
	const res = await fetch(ENDPOINT);
	return res.json();
}

export async function createExpense(expense: NewExpense): Promise<Expense> {
	const res = await fetch(ENDPOINT, {
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
	const res = await fetch(`${ENDPOINT}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expense),
	});
	return res.json();
}

export async function deleteExpense(id: string): Promise<void> {
	await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
}
