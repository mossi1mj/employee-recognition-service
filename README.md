# 🎉 Employee Recognition Service

A modern, full-stack employee recognition platform where teammates can celebrate each other with live updates, personalized feeds, and team insights.

## Live Site: [Employees Recognition Sercive](https://employee-recognition-9xlt.onrender.com)

![Next.js](https://img.shields.io/badge/frontend-next.js-000?logo=next.js)
![FastAPI](https://img.shields.io/badge/backend-fastapi-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/database-postgresql-336791?logo=postgresql)
![Firebase](https://img.shields.io/badge/authentication-firebase-ffca28?logo=firebase)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Users](#-users)
  - [Recognition System](#-recognition-system)
  - [Team Page](#-team-page)
  - [Auth](#-auth)
- [Tech Stack](#tech-stack)
  - [Frontend (Next.js)](#-frontend-nextjs)
  - [Backend (FastAPI)](#-backend-fastapi)
  - [Database](#-database)
  - [Testing](#-testing)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
  - [Frontend `.env.local`](#-frontend-envlocal)
  - [Backend `.env`](#-backend-env)
- [Backend API Overview](#backend-api-overview)
  - [User Routes](#user-routes)
  - [Recognition Routes](#recognition-routes)
  - [WebSocket Endpoint](#websocket-endpoint)
- [Installation Instructions](#installation-instructions)
  - [Prerequisites](#prerequisites)
  - [Clone the repository](#clone-the-repository)
  - [Setup Backend (FastAPI)](#setup-backend-fastapi)
  - [Setup Frontend (Next.js)](#setup-frontend-nextjs)
- [API Documentation](#api-documentation)
- [Project Features](#project-features)
  - [Authentication](#-authentication)
  - [Recognition System](#-recognition-system-1)
  - [User Directory](#-user-directory)
  - [Filtering & Sorting](#-filtering--sorting)
  - [Backend (FastAPI + PostgreSQL)](#-backend-fastapi--postgresql)
  - [Validation & Error Handling](#-validation--error-handling)
  - [Polished UI](#-polished-ui)
- [Roadmap / Future Work](#roadmap--future-work)
- [Credits / Acknowledgments](#credits--acknowledgments)
- [License](#license)

## Overview

This is a simulated employee recognition platform that mimics how modern organizations use tools like Microsoft Viva or Lattice to celebrate team contributions.

- Users are fetched from [dummyjson](https://dummyjson.com/users) to simulate integration with services like Microsoft Graph API.
- Auth is managed via Firebase OTP (phone/email) for real-world feel.
- Every new session randomly assigns a simulated user from the org.
- Built with a Next.js frontend and a FastAPI backend (PostgreSQL + WebSockets).

## Features

### 🧑‍💼 Users

- List all users from dummy API
- Search and filter by attributes (e.g. role)
- View user profile and recognitions

### 👏 Recognition System

- Give real-time recognition via a beautiful Hero UI form
- Feed of all recognitions with WebSocket-powered live updates
- Filter recognitions by sender/receiver
- Dashboard: view your 5 most recent recognitions (sent or received)

### 👥 Team Page

- See your team based on shared job title
- Track how many recognitions each team member has

### 🔐 Auth

- Firebase OTP verification (email or phone)
- Random user assignment to simulate signed-in company employee

## Tech Stack

### 🖥 Frontend (Next.js)

- Tailwind CSS + Hero UI for modern UI/UX
- React Context + Hooks for shared state
- Firebase Auth (OTP flow)

### ⚙️ Backend (FastAPI)

- REST API for users and recognitions
- PostgreSQL with async support via SQLAlchemy or Tortoise
- WebSockets for real-time updates

### 🗄 Database

- PostgreSQL (recognitions stored here)

### 🧪 Testing

- Minimal setup with auto reload & dev servers

## Project Structure

```bash
employee-recognition-service/
├── client/                      # Next.js frontend
│   ├── app/                    # App router (pages, layouts)
│   ├── components/             # Reusable UI components
│   ├── config/                 # Firebase and other app-level configs
│   ├── context/                # React Context providers
│   ├── hooks/                  # Custom React hooks
│   ├── public/                 # Static assets
│   ├── styles/                 # Global and component-level styles
│   ├── types/                  # TypeScript type definitions
│   ├── .env.local              # Firebase environment variables
│   ├── firebase.ts            # Firebase client SDK initialization
│   ├── package.json            # Frontend dependencies and scripts
│   └── package-lock.json       # Lock file for reproducible installs
│
├── server/                     # FastAPI backend
│   ├── alembic/                # Alembic migrations
│   ├── app/
│   │   ├── database/           # DB config and connection
│   │   ├── models/             # SQLAlchemy models
│   │   ├── routes/             # API routes for users & recognitions
│   │   └── services/           # Business logic for API routes
│   ├── .env                    # Backend environment variables (PostgreSQL)
│   ├── requirements.txt        # Python dependencies
│   └── venv/                   # Virtual environment (should be in .gitignore)
```

## Environment Setup

This project uses `.env` files to manage environment variables separately for the frontend and backend.

### 🔐 Frontend `.env.local`

Located in: `client/.env.local`

```ini
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Note:** This project uses Firebase OTP authentication to validate real users, but then randomly assigns a user from the dummy JSON API for demo purposes.

### Backend `.env`

Located in: `server/.env`

```ini
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_database_name

DATABASE_URL=postgresql+asyncpg://your_database_user:your_database_password@localhost:5432/your_database_name
```

**Note:** This project uses PostgreSQL to store recognition data, with async SQLAlchemy and FastAPI integration.

## Backend API Overview

The backend is built with FastAPI and provides routes to manage users and recognitions. Users are fetched from an external API (Dummy JSON) simulating company users, and recognitions are stored in a PostgreSQL database.

### User Routes

- `GET /users/`  
  Fetch all users from the external API.

- `GET /users/search?q=searchTerm`  
  Search users by a query string.

- `GET /users/filter?key=role&value=admin`  
  Filter users by key-value pairs, e.g., role.

- `GET /users/{user_id}`  
  Fetch a single user by their ID.

### Recognition Routes

- `POST /recognition/`  
  Create a new recognition entry.

- `GET /recognition/`  
  Get all recognitions, with optional filters for sender_id, recipient_id, pagination with limit and skip.

- `GET /recognition/user/{user_id}`  
  Get all recognitions sent or received by a specific user. Supports filtering by recognition type and pagination.

### WebSocket Endpoint

- `ws://<server>/ws/recognitions`  
  WebSocket connection for live updates on new recognitions posted.

This setup allows the frontend to interact with user data and recognitions efficiently, and receive real-time updates via WebSocket.

## Installation Instructions

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher recommended)
- Python 3.9+
- PostgreSQL installed and running
- [Poetry](https://python-poetry.org/) or `pip` for Python dependency management
- Firebase project setup for authentication (see `.env.local`)

### Clone the repository

```bash
git clone https://github.com/mossi1mj/employee-recognition-service.git
cd employee-recognition-service
```

### Setup Backend (FastAPI)

## In Terminal 1:

1. Navigate to the server folder:

```bash
cd server
```

2. Create and activate a Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

5. Configure your PostgreSQL database and update the `.env` file in `server/` with your database credentials.

6. Run database migrations (if using Alembic):

```bash
alembic upgrade head
```

### Setup Frontend (Next.js)

## In Terminal 2 (new terminal window/tab):

1. Navigate to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the Next.js project:

```bash
npm run dev
```

## 📚 API Documentation

Once the FastAPI backend is running, you can explore and test the API using the built-in Swagger UI:

- Open your browser and navigate to: [http://localhost:8000/docs](http://localhost:8000/docs)

This provides a live and interactive documentation for all available routes, including:

- `GET /users/`: Get all users from the dummy JSON API.
- `GET /users/search?q=...`: Search users by name or other criteria.
- `GET /users/filter?key=...&value=...`: Filter users by a specific key/value pair (e.g., role).
- `GET /users/{id}`: Get a specific user by ID.
- `POST /recognition/`: Post a new recognition.
- `GET /recognition/`: Get all recognitions, with optional filters like sender_id or recipient_id.
- `GET /recognition/user/{id}`: Get recognitions sent/received by a specific user.
- `WebSocket /ws/recognitions`: Live recognition broadcast for real-time updates.

## Project Features

### 🔐 Authentication

- Firebase OTP (One-Time Password) phone authentication
- Users verify with a real phone number but are assigned a random profile from the DummyJSON Users API for demo purposes

### 🌟 Recognition System

- Authenticated users can send recognitions to coworkers
- Each recognition includes:
  - A short message
  - Sender and recipient information
  - Timestamp

### 🧑‍🤝‍🧑 User Directory

- Integrated with DummyJSON API to simulate an employee directory
- Supports searching and selecting users via autocomplete input

### 🔎 Filtering & Sorting

- View all recognition entries
- Filter by sender or recipient
- Sort by most recent

### 🧠 Backend (FastAPI + PostgreSQL)

- RESTful API endpoints to:
  - Create new recognition entries
  - Fetch all or filtered/sorted entries
- PostgreSQL database stores only recognition data

### ✅ Validation & Error Handling

- Frontend and backend form validation
- Handles network and API errors gracefully with user feedback

### 🎨 Polished UI

- Built with Next.js and Tailwind CSS
- Uses Hero UI components and Lucide icons

## Roadmap / Future Work

- Implement real company user integration with Microsoft Graph API or similar
- Replace DummyJSON users with real authenticated users from Firebase
- Add user profile pages with detailed recognition history
- Implement notifications for new recognitions in real-time
- Enhance websocket functionality for live updates across all clients
- Add admin dashboard for managing users and recognitions
- Improve UI with more detailed analytics and charts
- Add support for multiple recognition types or categories
- Deploy backend and frontend to a production-ready environment with CI/CD
- Add localization and multi-language support

## Credits / Acknowledgments

This employee recognition platform was **designed and developed solely by me** as a portfolio project.

It has since been **adopted by my current employer**, where it is used internally to recognize employees.

Significant customization was done to:

- Standardize application names and categories
- Replaced terminology with "recognitions"
- Update icons and UI elements
- Ensure compliance with copyright and branding standards

Special thanks to the open source communities and technologies that made this possible, including:

- [FastAPI](https://fastapi.tiangolo.com/)
- [Next.js](https://nextjs.org/)
- [Hero UI](https://hero-ui.dev/)
- [Firebase](https://firebase.google.com/)
- [DummyJSON](https://dummyjson.com/users)
- [PostgreSQL](https://www.postgresql.org/)
- [Alembic](https://alembic.sqlalchemy.org/en/latest/)

This project is a proud achievement and a key part of my professional journey.

## License

MIT © [Myron Moss](https://google.com)
