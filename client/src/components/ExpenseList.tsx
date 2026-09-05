import type { Expense, NewExpense } from "../types/expense";
import { ExpenseListItem } from "./ExpenseListItem";

type ExpenseListProps = {
	expenses: Expense[];
	// Passed straight through to each row; ExpenseList itself holds no
	// state and makes no decisions about editing.
	onUpdate: (id: string, expense: NewExpense) => void;
	onDelete: (id: string) => void;
};

export function ExpenseList({
	expenses,
	onUpdate,
	onDelete,
}: ExpenseListProps) {
	return (
		<ul>
			{expenses.map((expense) => (
				<ExpenseListItem
					key={expense.id}
					expense={expense}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
}
