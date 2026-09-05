import type { Expense } from "../types/expense";
import { formatAmount } from "../utils/currency";

type ExpenseTotalProps = {
	expenses: Expense[];
};

// Derives the total from the expenses list on every render — no separate
// total state to keep in sync.
export function ExpenseTotal({ expenses }: ExpenseTotalProps) {
	const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

	return <p className="total">Total: {formatAmount(total)}</p>;
}
