# UrNextJob

**Connecting people with dignified and safe employment opportunities.**

UrNextJob is a web-based employment platform designed to connect immigrants with companies offering dignified and safe job opportunities. The platform aims to facilitate access to the labor market through a centralized environment where job seekers and employers can interact.

## Technologies

### Frontend
- React
- TypeScript
- React Bootstrap
- Bootstrap

### Backend
- Node.js
- Express.js
- TypeScript
- MVC / Clean Architecture principles

### Database
- MySQL

## Main Features

- **Authentication and Authorization:** Role-based access for job seekers, companies, and administrators.
- **Job Offers Management:** Companies can publish and manage employment opportunities.
- **Job Search:** Users can browse available job offers.
- **Favorites:** Users can save job offers for later.
- **Resume Management:** Users can create and manage their professional profiles and resumes.
- **Skills Management:** Integration with ESCO occupational skills and classifications.
- **Comments and Interactions:** Users can interact with job offers through comments and replies.
- **Notifications:** Notification system for relevant platform activities.
- **Reporting System:** Users can report inappropriate content and administrators can manage reports.

## Architecture

The backend follows MVC and Clean Architecture principles, separating responsibilities into different layers:

- **Controllers:** Handle HTTP requests, validate input, and return responses.
- **Services:** Contain application and business logic.
- **Models:** Handle database operations.
- **Routes:** Define API endpoints and connect them to their respective controllers.

The frontend is developed using a component-based architecture with React and TypeScript.

## Database

UrNextJob uses MySQL as its relational database management system.

The database includes entities for users, companies, job offers, resumes, skills, notifications, comments, and reports, among others.

## Installation and Setup

Setup instructions and environment variables will be documented here.

## Development

This project was developed as part of an academic degree project, applying software engineering principles and full-stack web development technologies.

---

**UrNextJob — Connecting people with opportunities.**
