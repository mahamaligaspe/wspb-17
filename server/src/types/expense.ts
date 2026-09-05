export type Expense = {
	id: string;
	description: string;
	amount: number;
	// ISO date string, e.g. "2026-08-01".
	date: string;
};

// Shape of the data a client sends when creating or updating an expense;
// the id is assigned by the store.
export type NewExpense = Omit<Expense, "id">;
