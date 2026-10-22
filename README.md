# Room Reservation

Web app for booking meeting rooms in an office. Backend is ASP.NET with an EF Core in-memory database, frontend is React + TypeScript (Vite, Tailwind).

## Requirements

- .NET 10 SDK
- Node.js 20.19+ or 22.12+ (needed by Vite) and npm

## Running the app

Start the backend first, then the frontend, each in its own terminal.

### Backend

```
cd backend
dotnet run
```

The API runs on http://localhost:5156. Swagger is available at http://localhost:5156/swagger.

The database is in-memory and gets seeded with sample rooms, users and reservations on startup, so all data resets when the backend is restarted.

Booking limits (max duration and booking horizon) are set in `backend/appsettings.Development.json` under `BookingRules`.

### Frontend

```
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

By default the frontend calls the API at http://localhost:5156/api, so no extra setup is needed. If the backend runs on a different address, create `frontend/.env`:

```
VITE_API_URL="http://localhost:5156/api"
```
