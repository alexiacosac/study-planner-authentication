Study Planner

Live version: https://study-planner-authentication.vercel.app/

This project is a full-stack web application built to help manage study tasks in a simple and structured way. It allows users to create an account, log in and manage their own study tasks independently.

Each authenticated user can create tasks, mark them as completed, add optional deadlines and see how much time is left for each task. Tasks are private and visible only to the user who created them.

The application is built using Next.js and TypeScript and is deployed in production on Vercel. A PostgreSQL database hosted on Supabase is used for data persistence.

Features:

User authentication (register, login, logout)
User-specific tasks
Create and delete tasks
Mark tasks as completed
Optional due dates for tasks
Automatic status display (today, overdue, days left)
Data persistence using PostgreSQL

Technologies Used

Frontend:

Next.js
React
TypeScript
Tailwind CSS

Backend:

Next.js API routes
NextAuth (Credentials provider)
Prisma ORM

Database:

PostgreSQL (Supabase)

Deployment:

Vercel

Project Overview

The frontend communicates with the backend through REST API routes. Authentication is handled using NextAuth with email and password credentials. User passwords are securely hashed before being stored in the database.

All database operations are managed using Prisma, providing type-safe access to the PostgreSQL database. The application is deployed on Vercel and uses a Supabase connection pooler to ensure compatibility with a serverless environment.
