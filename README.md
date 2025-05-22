# Todo App with Context API & Workspace Notes

A feature-rich Todo application built with React that combines traditional todo list functionality with an interactive note-taking workspace. The app uses React's Context API for state management and local storage for data persistence.

## Features

### Todo Management
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Persistent storage using browser's localStorage

### Interactive Workspace
- Expand todos into a full workspace canvas
- Create draggable text notes anywhere on the canvas
- Resize text areas automatically based on content
- Right-click to customize note background colors with color picker
- Drag and drop notes to organize your thoughts
- Auto-save workspace layout and content

## Tech Stack

- **React** (v19.1.0) - Frontend library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** (v7.6.0) - Navigation and routing
- **React Color** - Color picker component
- **React Draggable** - Drag and drop functionality
- **Context API** - State management
- **LocalStorage API** - Data persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd todo-storagecontext
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to http://localhost:5173

## Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── assets/
│   │   ├── components/   # React components
│   │   │   ├── Expand.jsx       # Workspace canvas component
│   │   │   ├── TodoForm.jsx     # Form for creating todos
│   │   │   └── TodoItem.jsx     # Individual todo component
│   │   ├── context/      # Context API files
│   │   │   ├── index.js         # Context exports
│   │   │   └── TodoContext.js   # Todo state management
│   ├── App.css           # Main application styles
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Application entry point
├── .gitignore            # Git ignore file
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## Usage

### Managing Todos
- Add new todos using the input form
- Click on a todo to mark it as complete
- Use action buttons on each todo for deletion or expansion

### Using the Workspace
- Click on the expand button of any todo to open the workspace
- Click anywhere on the canvas to add a new text note
- Drag notes to reposition them
- Right-click on notes to open a color picker for background customization
- Press "Escape" to exit text editing mode
- Click "Go Back" to save your workspace and return to the todo list

## Build for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be available in the `dist` directory.

## License

This project is open source and available under the MIT License.                                                    