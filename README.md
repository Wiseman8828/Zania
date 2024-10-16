# Zania
# Frontend Application

This is a frontend application built with Vite, TypeScript, and mock service worker (MSW) to display documents in a grid layout with drag-and-drop support. The app also includes features for saving data periodically using a local mock API, and stores data in browser storage for persistence across reloads.

## Features

- **Display documents**: Load documents from a static JSON file and display them as cards in a grid.
- **Drag-and-drop**: Allows reordering of cards via drag-and-drop functionality.
- **Image overlay**: Clicking on a card displays the document image in an overlay. Pressing `ESC` will close the overlay.
- **Auto-save**: The frontend periodically saves the document arrangement every 5 seconds if changes are made.
- **Mock API**: Uses a local mock API built with `msw` to handle data fetching and saving.
- **Data persistence**: Data is stored in `localStorage` to persist across browser reloads.
- **Loading spinners**: Displays a spinner while images are loading and when auto-saving is in progress.

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 20 or higher)
- **npm** (version 6 or higher)
- **Docker** (for Docker setup)

---

## Installation

1. Clone the repository to your local machine:
   git clone https://github.com/Wiseman8828/Zania.git
   cd Frontend
2. Install the dependencies: npm install


## Running the Application Locally
1. Running Locally : npm run dev

## Running the Application in Docker
1. docker build -t frontend-app .
2. docker run -p 5173:5173 frontend-app (Set to default vite port)

## Troubleshooting
1. if you encounter any issues with dependencies, try removing the node_modules directory and reinstalling:
    rm -rf node_modules package-lock.json
    npm install
