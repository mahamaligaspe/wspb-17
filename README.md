# Expense Tracker

Starting point for the Web Software Production course project. 
This project will grow week by week.

- `client/` — React + Vite + TypeScript frontend
- `server/` — Node + Express + TypeScript backend (PostgreSQL storage)
- `db/init/` — SQL schema + seed data, run by Postgres on first boot

Each part is an independent npm project with its own `node_modules`, and its own Biome config for linting/formatting.

## Running

**Whole stack with Docker Compose** (client http://localhost:8080, API http://localhost:3001, Adminer http://localhost:8088):

```
docker compose up -d
```

**Server on its own** (http://localhost:3001) — the database still runs in Compose:

```
docker compose up -d db
cd server
cp .env.example .env   # then fill in PGPASSWORD (app_pw, from compose.yaml)
npm install
npm run dev
```

Starts the Express API with `tsx watch --env-file=.env`, so it restarts on file changes. Once it's up you should see `Server listening on http://localhost:3001` in the terminal. The `.env` file holds the database credentials and is git-ignored — never commit it.

```
src/
  app.ts                     # configures the Express app (middleware + routes)
  server.ts                  # entry point: starts listening
  db/pool.ts                 # shared PostgreSQL connection pool
  types/                     # Expense / Category types
  store/                     # SQL queries (expense.ts maps rows with toExpense)
  routes/                    # GET/POST/PUT/DELETE handlers + request validation
```

Storage is PostgreSQL (see `server/src/db/pool.ts`). The pool reads its connection details from the `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD` and `PGDATABASE` environment variables — set in `compose.yaml` when running in Compose, and in `server/.env` when running with `npm run dev`. Data lives in the `db_data` volume, so it survives restarts.

Available endpoints, under `/api/expenses` and `/api/categories`:

| Method | Path             | Description                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/expenses`     | List all expenses           |
| POST   | `/api/expenses`     | Create an expense           |
| PUT    | `/api/expenses/:id` | Update an expense           |
| DELETE | `/api/expenses/:id` | Delete an expense           |
| GET    | `/api/categories`     | List all categories       |
| POST   | `/api/categories`     | Create a category         |
| PUT    | `/api/categories/:id` | Update a category         |
| DELETE | `/api/categories/:id` | Delete a category         |

`POST`/`PUT` for expenses expect a JSON body with `description` (string), `amount` (number), and `date` (ISO string, e.g. `2026-08-01`); categories expect `name` (string). A missing/wrong-typed field returns `400`. Updating or deleting an unknown `id` returns `404`.

You can try it without the client, e.g.:

```
curl http://localhost:3001/api/expenses
```

**Client** (http://localhost:5173):

```
cd client
npm install
npm run dev
```

Starts the Vite dev server with hot reload. The app calls the API directly at `http://localhost:3001`, so the server needs to be running too (see above) — without it you'll see a "Failed to fetch" error in the browser console.

The UI is split by responsibility rather than kept in one file:

```
src/
  types/expense.ts          # Expense / NewExpense types
  api/expenses.ts           # the only place that calls fetch()
  hooks/useExpenses.ts      # owns the expenses state, exposes add/edit/remove
  utils/date.ts             # dd.mm.yyyy <-> ISO date conversion
  utils/currency.ts         # € formatting
  components/
    ExpenseForm.tsx         # add-expense form
    ExpenseList.tsx         # renders one ExpenseListItem per expense
    ExpenseListItem.tsx     # a row; toggles its own view/edit mode
    ExpenseTotal.tsx        # running total
  App.tsx                   # composition root, no fetch/state logic itself
```

## Testing

### Server tests (Vitest + Supertest)

The server has unit tests for its pure functions (`toExpense`, `parseNewExpense`, `parseNewCategory`) and integration tests that drive the real API routes against a real PostgreSQL database. Test files live in `server/test/` (`*.unit.test.ts` and `*.integration.test.ts`).

The tests use their **own database, `app_test_db`**, never the development `app_db` — the integration tests delete and re-seed tables before every test, so running them against `app_db` would wipe your data. `server/vitest.config.ts` points every test at `app_test_db`.

The database must be running first. Create the test database once:

```
docker compose up -d db
docker compose exec db psql -U app -d app_db -c "CREATE DATABASE app_test_db;"
docker compose exec -T db psql -U app -d app_test_db < db/init/001-schema.sql
```

Then, from inside `server/`:

```
npm test            # run every test once (what CI will run)
npm run test:watch  # re-run on every save while writing tests
```

## Linting

[Biome](https://biomejs.dev/) handles both linting and formatting — there's no separate Prettier/ESLint setup. `client/` and `server/` each have their own `biome.json`, so they can drift independently as the course progresses; there's no shared/root config to keep in sync.

Run from inside either project:

```
npm run lint      # check formatting, imports, and lint rules
npm run lint:fix  # same, but apply the fixes it can make automatically
```

`lint:fix` won't touch anything it can't fix safely (e.g. an unused variable) — it'll still report those for you to fix by hand.
