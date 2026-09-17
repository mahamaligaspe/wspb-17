export type Category = {
	id: string;
	name: string;
};

// Shape of the data a client sends when creating or updating a category;
// the id is assigned by the store.
export type NewCategory = Omit<Category, "id">;
