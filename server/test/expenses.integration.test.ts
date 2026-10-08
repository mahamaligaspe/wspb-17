import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { pool } from "../src/db/pool.js";

// Reset to two known rows before every test, so each test is an island
// regardless of what ran before it.
beforeEach(async () => {
	await pool.query("DELETE FROM expenses");
	await pool.query(
		`INSERT INTO expenses (description, amount, date) VALUES
		   ('Groceries', 42.50, '2026-08-01'),
		   ('Bus ticket', 3.20, '2026-08-03')`,
	);
});

// Close the connection pool once all tests in this file are done, so the
// process can exit cleanly.
afterAll(async () => {
	await pool.end();
});

describe("GET /api/expenses", () => {
	it("returns expenses with numbers and ISO dates", async () => {
		const res = await request(app).get("/api/expenses");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const groceries = res.body.find(
			(e: { description: string }) => e.description === "Groceries",
		);
		expect(groceries.amount).toBe(42.5); // number, not "42.50"
		expect(groceries.date).toBe("2026-08-01"); // ISO string, not a timestamp
	});
});

describe("POST /api/expenses", () => {
	it("creates an expense and returns 201 with the created row", async () => {
		const res = await request(app)
			.post("/api/expenses")
			.send({ description: "Coffee", amount: 3.5, date: "2026-08-10" });

		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({
			description: "Coffee",
			amount: 3.5,
			date: "2026-08-10",
		});
		expect(res.body.id).toBeDefined(); // an id exists — we don't pin its value
	});

	it("returns 400 when a required field is missing", async () => {
		const res = await request(app)
			.post("/api/expenses")
			.send({ description: "Broken", date: "2026-08-10" }); // no amount

		expect(res.status).toBe(400);
	});
});

describe("PUT /api/expenses/:id", () => {
	it("returns 404 for an id that does not exist", async () => {
		const res = await request(app)
			.put("/api/expenses/00000000-0000-0000-0000-000000000000")
			.send({ description: "Nope", amount: 1, date: "2026-08-10" });

		expect(res.status).toBe(404);
	});
});

describe("DELETE /api/expenses/:id", () => {
	it("deletes an existing expense and returns 204", async () => {
		// Arrange: grab a real id from the seeded list
		const list = await request(app).get("/api/expenses");
		const id = list.body[0].id;

		const res = await request(app).delete(`/api/expenses/${id}`);
		expect(res.status).toBe(204);
	});
});
