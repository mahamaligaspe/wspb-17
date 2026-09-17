import { useState } from "react";
import { CategoryForm } from "./components/CategoryForm";
import { CategoryList } from "./components/CategoryList";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseTotal } from "./components/ExpenseTotal";
import { useCategories } from "./hooks/useCategories";
import { useExpenses } from "./hooks/useExpenses";

type View = "expenses" | "categories";

// Composition root: wires the data hooks to the presentational components.
// No fetch/state logic here on purpose — see hooks/useExpenses.ts and
// hooks/useCategories.ts.
function App() {
	const [view, setView] = useState<View>("expenses");
	const { expenses, addExpense, editExpense, removeExpense } = useExpenses();
	const { categories, addCategory, editCategory, removeCategory } =
		useCategories();

	return (
		<>
			<h1>Expense tracker</h1>
			<nav>
				<button
					type="button"
					disabled={view === "expenses"}
					onClick={() => setView("expenses")}
				>
					Expenses
				</button>
				<button
					type="button"
					disabled={view === "categories"}
					onClick={() => setView("categories")}
				>
					Categories
				</button>
			</nav>
			{view === "expenses" && (
				<>
					<ExpenseForm onAdd={addExpense} />
					<ExpenseList
						expenses={expenses}
						onUpdate={editExpense}
						onDelete={removeExpense}
					/>
					<ExpenseTotal expenses={expenses} />
				</>
			)}
			{view === "categories" && (
				<>
					<CategoryForm onAdd={addCategory} />
					<CategoryList
						categories={categories}
						onUpdate={editCategory}
						onDelete={removeCategory}
					/>
				</>
			)}
		</>
	);
}

export default App;
