# Project Overview

This is a Romanian Citizenship Chat App, a web application built with React and Vite. It's designed to help users practice their Romanian language skills for various real-life scenarios related to obtaining Romanian citizenship.

The application features a chat-like interface where users are presented with sentences in Romanian, along with translations in multiple languages. Users can practice their pronunciation by recording themselves and receiving a score and feedback. The app includes different scenarios (e.g., "Identification", "Appointments") and difficulty levels, which adjust based on the user's performance.

## Technologies

*   **Frontend:** React, TypeScript
*   **Build Tool:** Vite
*   **UI Components:** Custom components built with Radix UI and styled with Tailwind CSS.
*   **Icons:** Lucide React

## Architecture

The application is a single-page application (SPA). The main component is `src/App.tsx`, which manages the application's state and logic. The UI is broken down into smaller, reusable components located in `src/components`. Mock data for scenarios and sentences is currently hardcoded in `src/App.tsx`.

# Building and Running

1.  **Install dependencies:**
    ```bash
    npm i
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    The production-ready files will be in the `build` directory.

# Development Conventions

*   The project uses functional components with React Hooks.
*   Styling is done using Tailwind CSS.
*   The codebase is written in TypeScript.
*   Components are organized in the `src/components` directory, with a subdirectory `ui` for generic UI components.
