import { pool } from "../db/pool.js";
import type { Expense, NewExpense } from "../types/expense.js";

// Maps a raw database row to an Expense. Postgres returns NUMERIC as a
// string and DATE as a JS Date, so both need converting to match the type.
function toExpense(row: {
	id: string;
	description: string;
	amount: string;
	date: Date;
}): Expense {
	return {
		id: row.id,
		description: row.description,
		amount: Number(row.amount),
		date: row.date.toISOString().slice(0, 10),
	};
}

export async function getExpenses(): Promise<Expense[]> {
	const { rows } = await pool.query(
		"SELECT id, description, amount, date FROM expenses ORDER BY date",
	);
	return rows.map(toExpense);
}

export async function addExpense(newExpense: NewExpense): Promise<Expense> {
	const { rows } = await pool.query(
		`INSERT INTO expenses (description, amount, date)
		 VALUES ($1, $2, $3)
		 RETURNING id, description, amount, date`,
		[newExpense.description, newExpense.amount, newExpense.date],
	);
	return toExpense(rows[0]);
}

// Returns the updated expense, or null if no expense has this id.
export async function updateExpense(
	id: string,
	update: NewExpense,
): Promise<Expense | null> {
	const { rows } = await pool.query(
		`UPDATE expenses
		 SET description = $1, amount = $2, date = $3
		 WHERE id = $4
		 RETURNING id, description, amount, date`,
		[update.description, update.amount, update.date, id],
	);
	return rows[0] ? toExpense(rows[0]) : null;
}

// Returns true if an expense was removed, false if no expense has this id.
export async function deleteExpense(id: string): Promise<boolean> {
	const { rowCount } = await pool.query("DELETE FROM expenses WHERE id = $1", [
		id,
	]);
	return rowCount !== null && rowCount > 0;
}
