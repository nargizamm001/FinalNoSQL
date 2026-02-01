# Fitness Tracker — Advanced Databases (NoSQL)

## Project Overview
This is a full-stack web application for tracking workouts and daily fitness metrics.
Users can register, log in, manage workouts, track metrics, and view analytics.
The project was developed as the final project for the Advanced Databases (NoSQL) course.

## Tech Stack
Frontend: React, Vite  
Backend: Node.js, Express  
Database: MongoDB, Mongoose  
Authentication: JWT  

## System Architecture
The frontend communicates with the backend through a REST API.
The backend handles authentication, business logic, and database access.
MongoDB is used as the primary NoSQL database with both embedded and referenced data models.

Client → REST API → Express Server → MongoDB

## Environment Configuration
Sensitive configuration values such as JWT secrets and database connection strings
are stored in environment variables.  
A `.env.example` file is provided to document required variables without exposing
real credentials.

## Database Design

### Collections
**Users (referenced)**
- email (unique)
- password
- createdAt

**Workouts (referenced + embedded)**
- user (ref User)
- date
- duration
- exercises (embedded array)
  - name
  - sets
  - reps
  - weight

**Metrics (referenced)**
- user (ref User)
- date
- weight
- steps

### Embedded vs Referenced
Referenced documents are used to separate user data and ensure security.
Embedded documents are used for workout exercises to allow fast reads without joins.

## Indexing and Optimization
Compound indexes are used to optimize common queries.

- Workouts index: `{ user: 1, date: -1 }`
  - speeds up fetching user workouts by date
- Metrics index: `{ user: 1, date: -1 }`
  - improves performance of analytics queries

## REST API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Workouts
- POST `/api/workouts`
- GET `/api/workouts`
- GET `/api/workouts/:id`
- PUT `/api/workouts/:id`
- DELETE `/api/workouts/:id`
- POST `/api/workouts/:id/exercises`
- DELETE `/api/workouts/:id/exercises/:exerciseId`

### Metrics
- POST `/api/metrics`
- GET `/api/metrics`
- PUT `/api/metrics/:id`
- DELETE `/api/metrics/:id`

### Analytics (Aggregation)
- GET `/api/analytics/workouts`
- GET `/api/analytics/metrics`

## MongoDB Features Used
- Full CRUD operations across multiple collections
- Embedded and referenced data models
- Advanced update operators ($set, $push, $pull)
- Multi-stage aggregation pipelines
- Compound indexes
- Authentication and authorization

## Frontend Pages
- Login
- Register
- Workouts
- Workout Details
- Metrics
- Analytics

## Student Contributions
**Arailym**
- Frontend development and API integration

**Nargiza**
- Backend development, MongoDB models, and analytics

## Deployment
Frontend deployed on Vercel  
Backend deployed on Render
