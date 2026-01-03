# 📝 Real-Time ToDo App

A React-based ToDo application with authentication and real-time capabilities, built to practice frontend architecture, state management, and socket-based communication.

## ✨ Features
- User authentication using **Auth0**
- Add tasks using keyboard input (Enter key)
- Mark tasks as completed
- Delete tasks
- Unique task IDs generated using UUID
- Real-time socket connection with backend
- Loading state handling
- Client-side routing with protected routes
- Error handling with a custom 404 page

## 🛠 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- React Router
- Socket.io-client
- Auth0 (authentication)
- UUID

### Backend
- Node.js
- Socket.io
- Auth0 Management API

### Styling
- CSS (custom styling)

## 📂 Project Structure
- `components/` – UI components such as task cards, navbar, loader, and error pages
- `server/` – Authentication logic and socket-based backend
- `assets/` – Images and icons
- `App.js` – Routing and app-level layout

## ⚙️ How It Works
- Users authenticate using Auth0 before accessing the app
- Tasks are managed using React state
- Each task is assigned a unique ID
- Socket.io establishes a persistent connection with the backend
- The backend handles authentication token generation and socket events
- UI updates dynamically without page reloads

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm

### Installation
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
npm install
npm start
