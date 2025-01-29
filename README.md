# Time Stories Web Scraper

A web application that scrapes the latest stories from Time.com and displays them in a clean, user-friendly interface. The project consists of a Node.js backend server for scraping the stories and a React frontend for displaying them.

## Features

- Scrapes latest stories from Time.com
- Displays story titles with links
- Clean and responsive user interface
- Error handling and loading states
- Cross-origin resource sharing (CORS) enabled

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v12.0.0 or higher)
- npm (Node Package Manager)

## Project Structure

```
time-stories/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── package.json
    └── package-lock.json
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install express cors
```

3. Start the server:
```bash
node server.js
```

The server will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The application will open in your default browser at http://localhost:3000

## API Endpoints

### GET /getTimeStories

Returns an array of the latest stories from Time.com.

Example response:
```json
[
    {
        "title": "Story Title",
        "link": "https://time.com/story-link/"
    }
]
```

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - CORS middleware
  
- Frontend:
  - React
  - CSS3
  - Fetch API

## Error Handling

The application includes error handling for:
- Failed API requests
- Network errors
- Data parsing errors
- Loading states



For additional help, please open an issue in the repository.
