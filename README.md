# J.Giridhar Construction Company

Full-stack dynamic website for **J.Giridhar Construction Company**, a civil construction firm specialising in road work (concrete and asphalt) and infrastructure projects.

## Tech Stack

- **Frontend:** React 19 + Vite + React Router (responsive, modern UI)
- **Backend:** Node.js + Express REST API
- **Database:** MariaDB (dynamic data for projects & clients)

## Project Structure

```
├── server/                 # Node.js Express backend
│   ├── index.js            # API entry point
│   ├── routes/             # projects.js, clients.js routers
│   ├── db/                 # MariaDB pool, init.sql schema + seed, setup.sh
│   └── .env                # DB credentials (see .env.example)
└── client/                 # React frontend (Vite)
    ├── src/pages/          # Home, About, Services, Fleet, Projects, Contact
    ├── src/components/     # Navbar, Footer, StatusBadge
    ├── src/api.js          # API client
    └── vite.config.js      # dev proxy /api -> :5000
```

## Setup

### 1. Database (MariaDB)

```bash
# Start MariaDB and run setup
sudo service mariadb start
bash server/db/setup.sh
```

This creates the `giridhar_construction` database, the `clients` and `projects` tables, and seeds key clients (Puravankara, Sattva, Lodha, DENSGATE, Phoenix) plus 10 projects.

### 2. Backend API

```bash
cd server
npm install
cp .env.example .env   # edit credentials if needed
npm start              # serves on :5000
```

### 3. Frontend

```bash
cd client
npm install
npm run dev            # serves on :5173, proxies /api to :5000
```

Open http://localhost:5173

## API Endpoints

| Method | Endpoint                     | Description                                  |
| ------ | ---------------------------- | -------------------------------------------- |
| GET    | `/api/health`                | Health check (includes DB connectivity)      |
| GET    | `/api/projects`              | List projects (filters: `?status=`, `?type=`) |
| GET    | `/api/projects/:id`          | Get single project                           |
| POST   | `/api/projects`              | Create a project                             |
| PUT    | `/api/projects/:id`          | Update a project                             |
| PATCH  | `/api/projects/:id/status`   | Toggle status (Completed / Under Progress)   |
| GET    | `/api/clients`               | List clients with project counts             |
| POST   | `/api/clients`               | Add a client                                 |

## Key Features

- Branding and sticky navigation with all required sections
- Services: Infrastructure Development, Asphalt Road Construction, Concrete Road Work, Paver Road Works, Hardscape Works, External Civil Works
- External works focus: retaining wall works, RCC drains, kerb works, paver works, block work, plastering
- Machinery & Fleet section highlighting fully-owned heavy equipment and asphalt/concrete batching plants
- Dynamic Projects & Clients section driven by MariaDB with status badges
- High-quality placeholder imagery across all sections
