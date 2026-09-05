import { useState } from "react";
import type { Expense, NewExpense } from "../types/expense";
import { formatAmount } from "../utils/currency";
import { formatDate, toIsoDate } from "../utils/date";

type ExpenseListItemProps = {
	expense: Expense;
	onUpdate: (id: string, expense: NewExpense) => void;
	onDelete: (id: string) => void;
};

// A single row, in either view or edit mode. Editing state is local to
// the row (not lifted to a parent "which row is editing" id) so rows
// don't need to know about each other.
export function ExpenseListItem({
	expense,
	onUpdate,
	onDelete,
}: ExpenseListItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	// Draft fields, seeded from the expense when edit mode starts.
	const [description, setDescription] = useState(expense.description);
	const [amount, setAmount] = useState(String(expense.amount));
	const [date, setDate] = useState(formatDate(expense.date));

	// Re-seed the draft each time, in case the expense changed since the
	// last time this row was edited (e.g. after another edit was saved).
	function startEdit() {
		setDescription(expense.description);
		setAmount(String(expense.amount));
		setDate(formatDate(expense.date));
		setIsEditing(true);
	}

	function handleSave() {
		onUpdate(expense.id, {
			description,
			amount: Number(amount),
			date: toIsoDate(date),
		});
		setIsEditing(false);
	}

	// Edit mode: same three fields as ExpenseForm, but inline in the row.
	if (isEditing) {
		return (
			<li>
				<input
					name="editDescription"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<input
					name="editAmount"
					type="number"
					step="0.01"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
				<input
					name="editDate"
					type="text"
					placeholder="dd.mm.yyyy"
					pattern="\d{2}\.\d{2}\.\d{4}"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
				/>
				<button type="button" onClick={handleSave}>
					Save
				</button>
				<button type="button" onClick={() => setIsEditing(false)}>
					Cancel
				</button>
			</li>
		);
	}

	return (
		<li>
			<span className="description">{expense.description}</span>
			<span className="date">{formatDate(expense.date)}</span>
			<span className="amount">{formatAmount(expense.amount)}</span>
			<button type="button" onClick={startEdit}>
				Edit
			</button>
			<button type="button" onClick={() => onDelete(expense.id)}>
				Delete
			</button>
		</li>
	);
}
