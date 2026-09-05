import { type FormEvent, useState } from "react";
import type { NewExpense } from "../types/expense";
import { toIsoDate } from "../utils/date";

type ExpenseFormProps = {
	// Called with the new expense on submit; the parent decides what
	// happens next (this component doesn't know about the API).
	onAdd: (expense: NewExpense) => void;
};

// Form for adding a new expense. Keeps its own draft state and resets
// itself after a successful submit.
export function ExpenseForm({ onAdd }: ExpenseFormProps) {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	// Held as dd.mm.yyyy text (matching how it's displayed elsewhere) and
	// only converted to ISO right before it leaves this component.
	const [date, setDate] = useState("");

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		onAdd({ description, amount: Number(amount), date: toIsoDate(date) });

		setDescription("");
		setAmount("");
		setDate("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				name="description"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<input
				name="amount"
				type="number"
				step="0.01"
				placeholder="Amount (€)"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				required
			/>
			<input
				name="date"
				type="text"
				placeholder="dd.mm.yyyy"
				pattern="\d{2}\.\d{2}\.\d{4}"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				required
			/>
			<button type="submit">Add</button>
		</form>
	);
}
