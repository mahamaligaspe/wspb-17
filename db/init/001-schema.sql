-- Runs once, on first boot, when the data directory is empty.
-- Creates the tables the server expects and seeds the same sample rows
-- the in-memory store used to hardcode.

CREATE TABLE IF NOT EXISTS categories (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  amount      NUMERIC(10, 2) NOT NULL,
  date        DATE NOT NULL
);

INSERT INTO categories (name) VALUES ('Groceries'), ('Transport');

INSERT INTO expenses (description, amount, date) VALUES
  ('Groceries', 42.50, '2026-08-01'),
  ('Bus ticket', 3.20, '2026-08-03');
