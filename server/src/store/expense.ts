import { randomUUID } from "node:crypto";
import type { Expense, NewExpense } from "../types/expense.js";

// In-memory storage: resets whenever the server restarts. Seeded with a
// couple of sample expenses so the app has something to show on first run.
const expenses: Expense[] = [
	{
		id: randomUUID(),
		description: "Groceries",
		amount: 42.5,
		date: "2026-08-01",
	},
	{
		id: randomUUID(),
		description: "Bus ticket",
		amount: 3.2,
		date: "2026-08-03",
	},
];

export function getExpenses(): Expense[] {
	return expenses;
}

export function addExpense(newExpense: NewExpense): Expense {
	const expense: Expense = { id: randomUUID(), ...newExpense };
	expenses.push(expense);
	return expense;
}

// Returns the updated expense, or null if no expense has this id.
export function updateExpense(id: string, update: NewExpense): Expense | null {
	const expense = expenses.find((expense) => expense.id === id);
	if (!expense) return null;
	Object.assign(expense, update);
	return expense;
}

// Returns true if an expense was removed, false if no expense has this id.
export function deleteExpense(id: string): boolean {
	const index = expenses.findIndex((expense) => expense.id === id);
	if (index === -1) return false;
	expenses.splice(index, 1);
	return true;
}
