# 🌍 Travel Companion

A full-stack **TypeScript** web application that helps users discover compatible travel partners based on their destination and travel dates.

Users can register, authenticate securely, create travel plans, and search for fellow travelers whose trips overlap, making it easier to share journeys and experiences.

---

## Live at

https://travel-companion-topaz.vercel.app/


---
## Demo  login

email : test@123
pass : 123456


---

# 🚀 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password hashing using bcrypt
- Protected API routes

---

## ✈️ Trip Management

- Add travel plans
- View personal trips
- Search for travel companions
- Match users based on:
  - Same destination
  - Overlapping travel dates

---

## 👤 User Profile

- View profile information
- Display user bio
- Logout functionality

---

## 💻 Modern Frontend

- Built with React + TypeScript
- Responsive UI
- Glassmorphism design
- Clean landing page
- Search interface
- Results page with travel companion cards

---

## ⚙️ Backend

- Node.js
- Express.js
- TypeScript
- MySQL
- JWT Authentication
- Modular architecture
- RESTful APIs

---

# 🛠️ Tech Stack

## Frontend

- React 19
- TypeScript
- React Router DOM
- Axios
- Vite
- CSS3

## Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt
- dotenv
- mysql2

## Database

- MySQL

---

# 📂 Project Structure

```text
TravelCompanion/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   └── index.css
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

---

# ⚡ Installation

## 1. Clone the repository

```bash
git clone https://github.com/<your-username>/TravelCompanion.git
```

```bash
cd TravelCompanion
```

---

## 2. Backend Setup

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=travel_companion

JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal

```bash
cd Frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

---

## Trips

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/trips/add` | Add a trip |
| GET | `/api/trips/my` | Get user's trips |
| POST | `/api/trips/search` | Search travel companions |

---

# 🧠 Matching Algorithm

Travel companions are matched when:

- Destination is the same
- Travel dates overlap

The SQL query filters users using:

```sql
t.destination = ?
AND t.user_id != ?
AND t.start_date <= ?
AND t.end_date >= ?
```

---

# 🔒 Security Features

- JWT Authentication
- Password hashing with bcrypt
- Protected Routes
- Environment variables using dotenv
- SQL parameterized queries to prevent SQL Injection

---

# 🚀 Future Improvements

- Edit/Delete Trips
- Real-time chat between travelers
- Email notifications
- Profile picture upload
- Google Maps integration
- Destination recommendations
- Friend requests
- Trip history
- Pagination & filtering

---

# 👨‍💻 Author

**Yuva Balaji Kumar**

- GitHub: https://github.com/<your-github>
- LinkedIn: https://linkedin.com/in/<your-linkedin>

---

⭐ If you found this project useful, consider giving it a star!