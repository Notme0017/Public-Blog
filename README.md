# Public Blog

Public Blog is the public-facing frontend for a blog platform. It is built with React and Vite and provides a simple, fast experience for reading posts, viewing article details, and joining the conversation through comments and authentication.

## Overview

This project is the customer-facing UI for the blog application. It allows users to:

- browse the latest published posts on the home page
- open a full post and read its content
- view paginated comments on each article
- sign up or log in to participate in discussions
- create comments using the authenticated API

The app communicates with a backend API via a small fetch-based wrapper and uses client-side routing for navigation.

## Tech Stack

- React 18
- Vite
- React Router DOM
- JavaScript (ES modules)
- Fetch-based API client for backend communication

## Project Structure

```text
Public-Blog/
├── README.md
├── public-blog/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── helpers/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.production
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
└── .gitignore
```

Key app areas:

- `public-blog/src/pages` – page-level views such as the home feed and post detail page
- `public-blog/src/components` – shared UI including auth, header, comments, and forms
- `public-blog/src/api/api.js` – centralized API helper for requests to the backend
- `public-blog/src/helpers/helpers.js` – utility functions for post/comment pagination
- `public-blog/vite.config.js` – local dev server proxy configuration

## Features

- Home page with latest post listing
- Post detail view with article content and metadata
- Comment feed with pagination support
- Login and signup flow with auth context
- Logout handling and protected comment submission
- Responsive styling for public-facing browsing

## Getting Started

From the repository root:

```bash
cd public-blog
npm install
npm run dev
```

Then open the app in your browser at:

```text
http://localhost:5173
```

The dev server is configured to proxy `/api` requests to a local backend at `http://localhost:8080`.

## Production Build

```bash
cd public-blog
npm run build
npm run preview
```

## Environment Configuration

The app reads its API base URL from an environment variable:

```env
VITE_API_URL=https://blogs-8po6.onrender.com
```

This value is defined in `public-blog/.env.production` for deployed environments. In local development, the Vite config also proxies API calls to the local backend server.

## API Expectations

This frontend expects a separate backend service exposing endpoints such as:

- `GET /posts`
- `GET /posts/:id`
- `GET /posts/:id/comments`
- `POST /posts/:id/comments`
- authentication routes for login/signup

## Deployment

The project includes `public-blog/vercel.json` for SPA routing support, which helps ensure route-based pages resolve correctly when deployed to Vercel.

## Notes

This repository contains the public blog frontend only. The backend API is expected to exist separately, and the frontend is designed to talk to it through the configured `VITE_API_URL` or local dev proxy.
