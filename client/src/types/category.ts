export type Category = {
	id: string;
	name: string;
};

// Shape of the data sent when creating or updating a category.
export type NewCategory = Omit<Category, "id">;
