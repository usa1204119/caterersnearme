# Caterers Near Me

A full-stack catering search platform built with Node.js + Express (backend) and Next.js 14 (frontend).

## Project Structure

```
caterersnearme/
├── backend/          # Node.js + Express API
│   ├── data/
│   │   └── caterers.json   # JSON data store
│   ├── routes/
│   │   └── caterers.js     # API route handlers
│   └── server.js
└── frontend/         # Next.js 14 app
    ├── app/
    │   ├── page.js           # Landing page
    │   └── caterers/
    │       └── page.js       # Caterers listing page
    └── components/
        ├── Navbar.jsx
        └── CatererCard.jsx
```

## Setup & Run

### Prerequisites
- Node.js 18+
- npm

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev        # uses nodemon for hot reload
# OR
npm start          # production
```

The API will be available at `http://localhost:5000`.

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

> The frontend proxies `/api/*` requests to the backend via `next.config.mjs`, so both must be running.

---

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/caterers`       | List all caterers        |
| GET    | `/api/caterers/:id`   | Get caterer by ID        |
| POST   | `/api/caterers`       | Create a new caterer     |

### POST `/api/caterers` – Request Body

```json
{
  "name": "My Caterer",
  "location": "Mumbai, Maharashtra",
  "pricePerPlate": 500,
  "cuisines": ["North Indian", "Continental"],
  "rating": 4.5
}
```

### Validation Rules
- `name` — required, non-empty string
- `location` — required, non-empty string
- `pricePerPlate` — required, positive number
- `cuisines` — required, non-empty array
- `rating` — required, number between 1 and 5

---

## Features

- Search caterers by name (real-time)
- Filter by price per plate range
- Sort by rating or price
- Skeleton loading states
- Empty / error states
- Responsive grid layout (1 → 2 → 3 → 4 columns)
- Clean, modern UI with Tailwind CSS

## Optional Deployment

| Service | Target         |
|---------|---------------|
| Vercel  | Frontend       |
| Render  | Backend        |

Set the `NEXT_PUBLIC_API_URL` env var on Vercel to your backend URL, and update `next.config.mjs` rewrites accordingly.
