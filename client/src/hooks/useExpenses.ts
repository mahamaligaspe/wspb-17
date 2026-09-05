import { useEffect, useState } from "react";
import * as expensesApi from "../api/expenses";
import type { Expense, NewExpense } from "../types/expense";

// Owns the expenses list and keeps it in sync with the API. Components
// only see the resulting state and these action functions — they never
// call the api/ layer directly.
export function useExpenses() {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	// Load the initial list once, on mount.
	useEffect(() => {
		expensesApi.fetchExpenses().then(setExpenses);
	}, []);

	// Each action calls the API, then patches local state from the response
	// rather than refetching the whole list.
	async function addExpense(expense: NewExpense) {
		const created = await expensesApi.createExpense(expense);
		setExpenses((current) => [...current, created]);
	}

	async function editExpense(id: string, expense: NewExpense) {
		const updated = await expensesApi.updateExpense(id, expense);
		setExpenses((current) =>
			current.map((existing) => (existing.id === id ? updated : existing)),
		);
	}

	async function removeExpense(id: string) {
		await expensesApi.deleteExpense(id);
		setExpenses((current) => current.filter((expense) => expense.id !== id));
	}

	return { expenses, addExpense, editExpense, removeExpense };
}
