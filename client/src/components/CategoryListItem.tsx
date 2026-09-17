import { useState } from "react";
import type { Category, NewCategory } from "../types/category";

type CategoryListItemProps = {
	category: Category;
	onUpdate: (id: string, category: NewCategory) => void;
	onDelete: (id: string) => void;
};

// A single row, in either view or edit mode. Editing state is local to
// the row so rows don't need to know about each other.
export function CategoryListItem({
	category,
	onUpdate,
	onDelete,
}: CategoryListItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(category.name);

	// Re-seed the draft each time, in case the category changed since the
	// last time this row was edited (e.g. after another edit was saved).
	function startEdit() {
		setName(category.name);
		setIsEditing(true);
	}

	function handleSave() {
		onUpdate(category.id, { name });
		setIsEditing(false);
	}

	if (isEditing) {
		return (
			<li>
				<input
					name="editName"
					value={name}
					onChange={(e) => setName(e.target.value)}
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
			<span className="description">{category.name}</span>
			<button type="button" onClick={startEdit}>
				Edit
			</button>
			<button type="button" onClick={() => onDelete(category.id)}>
				Delete
			</button>
		</li>
	);
}
