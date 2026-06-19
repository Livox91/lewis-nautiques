# LEWIS NAUTIQUES — Luxury Marine Website

A production-ready luxury boat sales website with lead capture and admin management.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, React Router |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (Neon / Supabase / self-hosted) |
| Deployment | Docker + Docker Compose / GoDaddy Containers |

---

## Project Structure

```
lewis-nautiques/
├── frontend/          React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    Reusable components
│   │   ├── pages/         Route pages (Home, Fleet, Detail, Bespoke, Contact, Admin)
│   │   ├── hooks/         Data & utility hooks
│   │   ├── services/      API client
│   │   ├── types/         TypeScript interfaces
│   │   └── utils/         Helpers
│   └── public/            Static assets, sitemap, robots.txt
├── backend/           Express API
│   └── src/
│       ├── config/        DB + env
│       ├── controllers/   Route handlers
│       ├── middleware/     Auth, rate limiting, validation, headers
│       ├── routes/        Express routers
│       ├── services/      Business logic
│       ├── db/            Schema + seed SQL
│       └── utils/         Logger
├── Dockerfile.frontend
├── Dockerfile.backend
├── docker-compose.yml
└── .env.example
```

---

## Quick Start (Development)

### Prerequisites
- Node.js 20+
- PostgreSQL database (free tier: [Neon](https://neon.tech) or [Supabase](https://supabase.com))

### 1. Clone and configure

```bash
cp .env.example .env
# Edit .env with your DATABASE_URL and ADMIN_SECRET
```

### 2. Set up the database

```bash
psql $DATABASE_URL -f backend/src/db/schema.sql
psql $DATABASE_URL -f backend/src/db/seed.sql
```

### 3. Start the backend

```bash
cd backend
npm install
npm run dev
# API running at http://localhost:5000
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
# Site running at http://localhost:5173
```

---

## Production Deployment

### Docker Compose (recommended)

```bash
# 1. Copy and fill in environment variables
cp .env.example .env

# 2. Build and start
docker compose up -d --build

# 3. Run database migrations (first time only)
docker compose exec api node -e "
  const {execSync}=require('child_process');
  execSync('psql \$DATABASE_URL -f src/db/schema.sql',{stdio:'inherit'});
  execSync('psql \$DATABASE_URL -f src/db/seed.sql',{stdio:'inherit'});
"
```

### GoDaddy VPS / Containers

1. Install Docker and Docker Compose on your VPS
2. Copy project files to `/opt/lewis-nautiques`
3. Create `.env` with production values
4. Run `docker compose up -d --build`
5. Configure a reverse proxy (Nginx/Caddy) to forward port 80

### Environment Variables (Production)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string with SSL |
| `ADMIN_SECRET` | Yes | Strong random string for admin auth |
| `FRONTEND_URL` | Yes | Your domain (for CORS) |
| `NODE_ENV` | Yes | Set to `production` |
| `PORT` | No | API port (default: 5000) |
| `VITE_API_URL` | No | API URL seen by browser (default: `/api`) |

---

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/boats` | List all boats |
| `GET` | `/api/boats?featured=true` | Featured boats only |
| `GET` | `/api/boats/:slug` | Single boat by slug |
| `POST` | `/api/inquiries` | Submit an inquiry |
| `GET` | `/health` | Health check |

### Admin (Bearer token required)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/admin/inquiries` | List inquiries (filterable) |
| `PATCH` | `/api/admin/inquiries/:id` | Update inquiry status |
| `DELETE` | `/api/admin/inquiries/:id` | Delete inquiry |

---

## Admin Panel

Navigate to `/admin` and enter your `ADMIN_SECRET` to access the lead management dashboard.

Features:
- View all inquiries with search and status filtering
- Mark leads as **Contacted** or **Closed**
- Delete inquiries
- Real-time stats (total, new, contacted, closed)

---

## Security Features

- Helmet.js secure HTTP headers
- CORS restricted to configured origin
- Rate limiting (100 req/15min general; 5 req/hr on inquiry submission)
- Input validation via express-validator
- XSS sanitization via xss library
- Admin endpoints protected by Bearer token
- SQL injection prevention via parameterized queries
- Request body size limit (10kb)
