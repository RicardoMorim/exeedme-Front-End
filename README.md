# Exeedme Frontend Challenge

> This project is a simple and efficient Pomodoro Timer and Todo List application built with React, TypeScript, Vite, and TailwindCSS. It was developed as part of the Exeedme Frontend Challenge.
>
> Callenge description [here](./challenge-frontend-v4.pdf)

## Features

### Pomodoro Timer

> - **Two Modes:** Work (25 minutes) and Break (5 minutes)
> - **Timer Controls:** Start, pause, and restart the timer
> - **Automatic Mode Switching:** The timer switches between work and break sessions automatically when the time runs out
> - **Visual Notifications:** End-of-cycle notifications (e.g., color changes) to alert the user
> - **Multiple Watch Skins:** Choose from various watch themes such as Digital, Analogic, Classic, Simple Analogic, Fit, Fit Slim, Simple, and StopWatch

### Todo List

> - **Task Management:** Add new tasks, mark tasks as completed, and remove tasks
> - **Real-time Updates:** The list updates immediately as tasks are added or modified
> - **Visual Differentiation:** Completed tasks are visually distinguished from active ones

## Project Structure

```
.
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── public/
│   └── audio/
├── README.md
├── src/
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   │   ├── Home/
│   │   ├── Layout/
│   │   ├── Timer/
│   │   ├── Todo/
│   │   └── Watch/
│   ├── main.tsx
|   ├── App.tsx
│   ├── styles/
│   ├── types/
│   └── Hooks/
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

> - Node.js
> - npm or yarn

### Installation

1. **Clone the repository:**

```sh
git clone git@github.com:RicardoMorim/exeedme-Front-End.git
```

2. **Navigate to the project directory**

```sh
cd pomodoro-timer
```

3. **install dependencies:**

```sh
npm install
```

## Running the App

### Start the development server with:

```sh
 npm run dev
```

> Visit http://localhost:3000 (or the port indicated by your terminal) to view the app.

## Technologies Used

> - React with TypeScript for building the UI
> - Vite for fast development and bundling
> - TailwindCSS for styling and responsiveness
> - Ant Design (antd) for UI components
> - Styled Components for custom styled elements
> - ESLint for code quality and consistency

### Deployment

> The application has been deployed on Vercel. You can check out the live version [here](https://exeedme-frontend.vercel.app/).

## License

> This project is open source and available under the MIT License.
