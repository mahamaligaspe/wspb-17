import { pool } from "../db/pool.js";
import type { Expense, NewExpense } from "../types/expense.js";

// Maps a raw database row to an Expense. Postgres returns NUMERIC as a
// string and DATE as a JS Date, so both need converting to match the type.
export function toExpense(row: {
	id: string;
	description: string;
	amount: string;
	date: Date;
}): Expense {
	return {
		id: row.id,
		description: row.description,
		amount: Number(row.amount),
		// Read the date from its LOCAL parts. The pg driver parses a DATE
		// into a Date at local midnight, so local getters round-trip it
		// faithfully. toISOString() would convert to UTC first and, east of
		// UTC, roll the date back a day.
		date: formatDate(row.date),
	};
}

// Formats a Date as YYYY-MM-DD using its local calendar parts.
function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
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
