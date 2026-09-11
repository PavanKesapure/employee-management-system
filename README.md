# 👥 Employee Management System

A full-stack **MERN** application to manage employees — with live search, filters,
dashboard stats, and **Day / Night mode**.

**Stack:** MongoDB · Express.js · React (Vite) · Node.js

---

## ✨ Features

- Full **CRUD** — Create, View, Edit, Delete employees
- 🔍 Live **search** by name / email / position
- 🏷️ **Filter** by department + status (combinable)
- 📊 **Dashboard stats** — Total / Active / On Leave / Inactive + department breakdown
- 🌙☀️ **Day / Night mode** — one-click toggle, saved in `localStorage`
- ✅ Validation — required fields, email format, unique email, salary ≥ 0
- 📱 Responsive — works on desktop + mobile
- 🌱 Seed script — 5 demo employees in one command

## 🗂️ Project Structure

```
employee-management-system/
├── PROJECT_OVERVIEW.txt      # detailed views, features & MongoDB guide
├── backend/                  # Express + Mongoose API (port 5000)
│   ├── server.js             # entry point
│   ├── seed.js               # sample data loader
│   ├── .env.example          # connection string template
│   ├── config/db.js          # mongoose.connect(MONGO_URI)
│   ├── models/Employee.js    # employee schema
│   ├── controllers/employeeController.js
│   ├── routes/employeeRoutes.js
│   └── middleware/errorHandler.js
├── frontend/                 # React + Vite UI (port 3000)
│   ├── vite.config.js        # port 3000 + /api proxy to :5000
│   └── src/
│       ├── App.jsx / main.jsx / index.css
│       ├── context/ThemeContext.jsx  # day/night logic
│       ├── services/api.js           # axios CRUD calls
│       ├── components/               # Navbar, StatsCards, SearchBar,
│       │                             # EmployeeTable, EmployeeForm
│       └── pages/Dashboard.jsx       # main page
└── .vscode/                  # VS Code settings, extensions, F5 launch configs
```

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ and MongoDB (local, Docker, or Atlas — see
`PROJECT_OVERVIEW.txt` section 4 for step-by-step connection guides).

```bash
# 1. Backend
cd backend
npm install
npm run seed     # first time only — loads 5 demo employees
npm run dev      # → http://localhost:5000

# 2. Frontend (second terminal)
cd frontend
npm install
npm run dev      # → http://localhost:3000
```

Or from the project root:

```bash
npm run install:all
npm run seed
```

### VS Code (F5 debugging)

1. Open the `employee-management-system` folder in VS Code.
2. Install the recommended extensions when prompted.
3. Press **F5** → **Full Stack (backend + frontend)**.

## 🔌 API Endpoints

| Method | Endpoint                              | Description                  |
|--------|---------------------------------------|------------------------------|
| GET    | `/`                                   | Health check                 |
| GET    | `/api/employees?search=&department=&status=&sort=&page=&limit=` | List + search/filter |
| GET    | `/api/employees/:id`                  | Single employee              |
| POST   | `/api/employees`                      | Create employee              |
| PUT    | `/api/employees/:id`                  | Update employee              |
| DELETE | `/api/employees/:id`                  | Delete employee              |
| GET    | `/api/employees/stats/summary`        | Dashboard counts             |

## 🌙 Day / Night Mode

Click the **Night/Day** button in the navbar (top-right).
Implemented in `frontend/src/context/ThemeContext.jsx` — theme state sets the
`data-theme` attribute, CSS variables in `index.css` switch the palette, and the
choice persists in `localStorage` (`ems-theme`).

## 🍃 MongoDB Connection

The backend reads `backend/.env` → `MONGO_URI`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employeeDB   # local
DB_NAME=employeeDB
# Atlas cloud:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority
```

Full guides (local install / Atlas cloud / Docker) are in
[`PROJECT_OVERVIEW.txt`](./PROJECT_OVERVIEW.txt).

## 📝 License

MIT — free to use and modify.
