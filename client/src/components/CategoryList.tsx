import type { Category, NewCategory } from "../types/category";
import { CategoryListItem } from "./CategoryListItem";

type CategoryListProps = {
	categories: Category[];
	onUpdate: (id: string, category: NewCategory) => void;
	onDelete: (id: string) => void;
};

export function CategoryList({
	categories,
	onUpdate,
	onDelete,
}: CategoryListProps) {
	return (
		<ul>
			{categories.map((category) => (
				<CategoryListItem
					key={category.id}
					category={category}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
}
