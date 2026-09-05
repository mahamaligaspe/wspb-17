import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseTotal } from "./components/ExpenseTotal";
import { useExpenses } from "./hooks/useExpenses";

// Composition root: wires the data hook to the presentational components.
// No fetch/state logic here on purpose — see hooks/useExpenses.ts.
function App() {
	const { expenses, addExpense, editExpense, removeExpense } = useExpenses();

	return (
		<>
			<h1>Expense tracker</h1>
			<ExpenseForm onAdd={addExpense} />
			<ExpenseList
				expenses={expenses}
				onUpdate={editExpense}
				onDelete={removeExpense}
			/>
			<ExpenseTotal expenses={expenses} />
		</>
	);
}

export default App;
