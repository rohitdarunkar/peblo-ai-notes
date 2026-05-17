# Peblo AI Notes

AI-powered full stack notes management application built using the MERN stack.

---

# Live Links

Frontend:  
https://peblo-ai-notes-sigma.vercel.app/

Backend:  
https://peblo-ai-notes-jhft.onrender.com/

---

# Features

- User Authentication (JWT)
- Create Notes
- Edit Notes
- Delete Notes
- AI-generated Summaries
- Tags and Categories
- Public Note Sharing
- Dashboard Insights
- Search and Filtering
- Archive Notes

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## AI
- Google Gemini API

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# Project Architecture

Frontend communicates with backend REST APIs using Axios.

Backend handles:
- Authentication
- Notes CRUD operations
- AI summary generation
- Sharing functionality
- Dashboard insights

MongoDB stores:
- Users
- Notes

JWT is used for authentication and route protection.

---

# Setup Instructions

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside backend:

```env
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
```

---

# Testing the Application

1. Register a user
2. Login
3. Create a note
4. Edit note
5. Generate AI summary
6. Share note publicly
7. Search and filter notes
8. View dashboard insights

---

# API Examples

## Login

POST `/auth/login`

```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

---

## Create Note

POST `/notes`

```json
{
  "title": "AI Test Note",
  "content": "Today we completed backend authentication and notes APIs successfully.",
  "tags": ["ai", "backend"],
  "category": "Work"
}
```

---

# Sample AI Summary

"Backend authentication and notes APIs were successfully completed."

---

# Database Collections

- Users
- Notes

---

# Screenshots

Add screenshots for:
- Login Page
- Register Page
- Dashboard
- AI Summary
- Shared Notes
- Insights Page

---

## Demo Video

https://drive.google.com/file/d/10vVYE6xulDhVi-fR-IutJZr6kPkjIYSi/view?usp=sharing

---
# Author

Rohit Darunkar
