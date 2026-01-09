# Study Planner

Live version: https://study-planner-authentication.vercel.app/

This project is a full-stack web application built to help manage study tasks in a simple and structured way.  
It allows users to create an account, log in and manage their own study tasks independently.

Each authenticated user can create tasks, mark them as completed, add optional deadlines and see how much time is left for each task.  
Tasks are private and visible only to the user who created them.

The application is built using Next.js and TypeScript and is deployed in production on Vercel.  
A PostgreSQL database hosted on Supabase is used for data persistence.


## Features

- User authentication (register, login, logout)
- User-specific tasks
- Create and delete tasks
- Mark tasks as completed
- Optional due dates for tasks
- Automatic status display (today, overdue, days left)
- Data persistence using PostgreSQL


## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API routes
- NextAuth (Credentials provider)
- Prisma ORM

### Database
- PostgreSQL (Supabase)

### Deployment
- Vercel
