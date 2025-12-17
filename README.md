
# 📌 Task Manager — MERN Stack (React + Node.js + Express + MongoDB)

A full-stack Task Management System where users can:

* Sign up / Log in
* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* All tasks are stored securely in MongoDB
* User authentication is handled using JWT

This project demonstrates **full CRUD operations**, **authentication**, **REST APIs**, and **frontend–backend integration**.

## 🚀 Tech Stack

### **Frontend**

* React.js
* Vite
* Axios
* React Router DOM
* Tailwind CSS

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Bcrypt Password Hashing
* CORS
* Dotenv

# 🧠 **Features**

### ✅ Authentication

* User Signup
* User Login
* JSON Web Tokens for session handling
* Protected routes on backend

### ✅ Task Management (CRUD)

* Create Task
* Read Tasks (User-specific)
* Update Task (Edit Task & Mark Complete)
* Delete Task

### ✅ UI Features

* Responsive & styled with Tailwind
* Dashboard showing all tasks
* Add Task page
* Edit Task page


# 🔧 **How to Run the Project Locally**

## 1️⃣ **Clone repositories**

```
git clone https://github.com/yourusername/task-manager-backend
git clone https://github.com/yourusername/task-manager-frontend


## 2️⃣ **Backend Setup**

```bash
cd task-manager-backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URL=your-mongo-atlas-connection-string
JWT_SECRET=your-secret-key
```

Start backend:

```
node server.js
```

---

## 3️⃣ **Frontend Setup**

```bash
cd task-manager-frontend
npm install
npm run dev
```

Visit:

```
http://localhost:5173
```

---

# 🔐 API Endpoints

### **Auth Routes**

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| POST   | /api/auth/signup | Create user |
| POST   | /api/auth/login  | Login user  |

### **Task Routes**

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | /api/tasks/create       | Create Task            |
| GET    | /api/tasks/all          | Get all tasks for user |
| GET    | /api/tasks/:id          | Get a single task      |
| PUT    | /api/tasks/update/:id   | Update task            |
| PATCH  | /api/tasks/complete/:id | Mark complete          |
| DELETE | /api/tasks/delete/:id   | Delete task            |


# 🤝 Contributors

* Shreelakshmi DS (Developer)

# 🏆 Future Improvements

* Logout button
* Filters (priority, category)
* Overdue task highlighting
* Admin panel
* Drag-and-drop task sorting
* Deploy backend (Render/Railway)
* Deploy frontend (Vercel)
