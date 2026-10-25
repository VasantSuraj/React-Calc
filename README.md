# React Calculator

A simple calculator built with React and Vite. Used as a practice project for learning Git and GitHub.

## Run it locally

You need [Node.js](https://nodejs.org) (version 18 or newer).

```bash
npm install
npm run dev
```

Then open the link shown in the terminal (usually http://localhost:5173).

## Features

- Add, subtract, multiply, divide
- Clear (C), change sign (±), percent (%)
- Decimal numbers
- Shows "Error" when dividing by zero

## Project structure

```
react-calculator/
├── index.html        # The page that loads the app
├── package.json      # Project info and dependencies
├── vite.config.js    # Build tool settings
└── src/
    ├── main.jsx      # Starts the React app
    ├── App.jsx       # The calculator logic and buttons
    └── App.css       # Styling
```

## Practice ideas for the team

Each of these makes a good first branch and pull request:

1. Change the accent colour in `src/App.css`
2. Add your name to a "Contributors" section in this README
3. Add a backspace (⌫) button in `src/App.jsx`
