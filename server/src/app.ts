import cors from "cors";
import express from "express";
import { categoryRouter } from "./routes/category.js";
import { expenseRouter } from "./routes/expense.js";

// Builds the Express app but does not start listening, so it can be
// imported directly in tests (e.g. with supertest) without opening a port.
export const app = express();

// Allow the Vite dev server (a different origin) to call this API.
app.use(cors());

// Parse JSON request bodies into req.body.
app.use(express.json());

app.use("/api/expenses", expenseRouter);
app.use("/api/categories", categoryRouter);
