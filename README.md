# Cyber-Morph Frontend

Cyber-Morph is an AI-based cybersecurity simulation game designed to teach digital defense through interactive scenarios. This repository contains the Vue frontend for the public landing page, authentication flow, and role-based dashboard shell.

## Technology Stack

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Pinia
- **Routing**: Vue Router
- **Display Font**: Pixelify Sans via Google Fonts

## Features

- **Public Landing Page**: Warm, light pixel-modern showcase page at `/welcome`.
- **Player Dashboard**: View game progress and security credits.
- **Simulation Interface**: Access digital defense scenarios.
- **Educator Portal**: Tools for managing classrooms and student progress.
- **Admin System**: Oversight and system logs.

## Design Direction

The public landing page uses a summer-lilac pixel aesthetic inspired by modern game showcase sites without copying external layouts, images, logos, or text. The current palette uses a fixed soft lilac background, lavender/periwinkle accents, peach/gold highlights, soft mint status colors, and plum body text. Headings, nav, and primary CTAs use `Pixelify Sans`; body copy remains on the clean sans-serif stack for readability.

## Getting Started

### Prerequisites

- Node.js (Version 20 or higher)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

To create a production-ready bundle:
```bash
npm.cmd run build
```

On Windows PowerShell, `npm run build` may be blocked by script execution policy. Use `npm.cmd run build` if that happens.

## Project Structure

- `src/api/`: API client and mock data layer.
- `src/views/`: Main page components.
- `src/stores/`: Pinia state management.
- `src/assets/`: Global styles and static assets.
- `src/router/`: Navigation configuration.

## Key Files

- `src/views/LandingView.vue`: Public marketing/showcase page.
- `src/assets/main.css`: Tailwind v4 theme tokens and shared design utilities.
- `index.html`: App shell, page title, favicon, and Pixelify Sans font preload.

## License

Private Project - All rights reserved.
