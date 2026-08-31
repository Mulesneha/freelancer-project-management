# 💼 Freelancer Project Management System

A full-stack web application that connects **clients and freelancers** through a simple project management platform.

Clients can create and manage projects, while freelancers can discover available projects and work on them. The application uses a React frontend, Node.js/Express backend, and MongoDB database.

---

## 🚀 Features

### 👤 Client Features

* Client dashboard
* View all posted projects
* Post a new project
* Store project details in MongoDB
* View project status
* View assigned freelancer
* Track project budget
* Project statistics

### 🧑‍💻 Freelancer Features

* View available projects
* View project details
* Apply for projects
* Manage assigned projects
* Track project status

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes

### 📊 Project Management

* Create projects
* Store projects in MongoDB
* Display projects dynamically on dashboard
* Project status management
* Budget management
* Freelancer assignment

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* JavaScript
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

### Development Tools

* VS Code
* Git
* GitHub
* Postman
* MongoDB Atlas
* Nodemon

---

## 📁 Project Structure

```text
freelancer-project-management/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ClientDashboard.jsx
│   │   │   ├── CreateProject.jsx
│   │   │   └── ...
│   │   │
│   │   ├── components/
│   │   │   └── ...
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Project.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── projectRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── projectController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/freelancer-project-management.git
```

Move into the project:

```bash
cd freelancer-project-management
```

---

# 🔧 Backend Setup

Go to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

> ⚠️ Never upload `.env` to GitHub because it contains sensitive credentials.

Start the backend:

```bash
npm run dev
```

The server should run on:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal.

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🗄️ MongoDB

This project uses **MongoDB Atlas** for storing application data.

Example database:

```text
freelancerDB
```

Example collections:

```text
users
projects
```

### Project Document

A project can contain information such as:

```json
{
  "title": "E-Commerce Website",
  "description": "Need a modern responsive shopping website.",
  "budget": 25000,
  "category": "Web Development",
  "status": "Open",
  "freelancer": null
}
```

---

# 🔄 Project Creation Flow

When the client clicks:

```text
+ Post New Project
```

the application opens the Create Project page.

The client enters:

* Project title
* Description
* Budget
* Category
* Skills
* Deadline

After clicking **Create Project**:

```text
React Form
     ↓
POST /api/projects
     ↓
Express Server
     ↓
Project Controller
     ↓
Mongoose
     ↓
MongoDB Atlas
```

After successful creation:

```text
MongoDB
     ↓
GET /api/projects
     ↓
Client Dashboard
     ↓
Projects displayed
```

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Projects

### Create Project

```http
POST /api/projects
```

Example request:

```json
{
  "title": "E-Commerce Website",
  "description": "Build a modern e-commerce website",
  "budget": 25000,
  "category": "Web Development"
}
```

### Get Projects

```http
GET /api/projects
```

### Get Single Project

```http
GET /api/projects/:id
```

### Update Project

```http
PUT /api/projects/:id
```

### Delete Project

```http
DELETE /api/projects/:id
```

---

# 📊 Client Dashboard

The client dashboard displays project information dynamically.

Example:

```text
Client Dashboard

Total Projects     Active Projects     Completed Projects
      5                   2                    1

My Projects

┌──────────────────────────────┐
│ E-Commerce Website           │
│                              │
│ Build modern shopping site   │
│                              │
│ Budget: ₹25,000              │
│ Status: Open                 │
│ Freelancer: Not Assigned     │
└──────────────────────────────┘
```

Projects are retrieved from MongoDB instead of being hard-coded.

---

# 🔐 Environment Variables

The backend uses environment variables for configuration.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Add `.env` to `.gitignore`:

```gitignore
node_modules/
.env
```

---

# 🧪 Testing

You can test backend APIs using **Postman**.

Example:

```text
POST http://localhost:5000/api/projects
```

Then check MongoDB Atlas to verify that the project has been stored.

---

# 🌐 Deployment

The project is designed to be deployable.

### Frontend

Can be deployed using platforms such as:

* Vercel
* Netlify

### Backend

Can be deployed using platforms such as:

* Render
* Railway

### Database

MongoDB Atlas can be used as the cloud database.

Deployment architecture:

```text
                    ┌─────────────────┐
                    │    React App    │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             │ API Requests
                             ↓
                    ┌─────────────────┐
                    │ Node + Express  │
                    │     Backend     │
                    └────────┬────────┘
                             │
                             │ Mongoose
                             ↓
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │    Database     │
                    └─────────────────┘
```

---

# 🔮 Future Improvements

* Freelancer registration and profiles
* Project application system
* Real-time messaging
* Notifications
* Payment integration
* Reviews and ratings
* Advanced project search
* Skill-based freelancer matching
* Admin dashboard
* Project analytics
* File/document sharing
* Email notifications

---

# 🎯 Objective

The main objective of this project is to provide a centralized platform where clients can **post projects, manage freelancers, track project progress, and communicate efficiently**, while freelancers can discover suitable projects and manage their work.

---

# 👩‍💻 Author

**Sneha Mule**

Computer Science & Engineering Student

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📜 License

This project is created for educational and portfolio purposes.
