# Playwright Todo App Automation

This project automates the testing of a simple Todo web application using Playwright with TypeScript. It follows best practices including Page Object Model (POM), test data separation, and reusable actions.

---

### 📁 Project Structure 
```bash 
├── output
  └── reports
  └── trace
├── tests/ 
│ └── e2e/
│     └── todo.spec.ts # End-to-end test scenarios (create, delete, complete, etc.) ├── pages/ 
│ └── homepage.ts # POM for the homepage 
├── seeds/ 
│ └── testdata.ts # Testdata 
├── selectors/ 
│ └── homeSelectors.ts # Centralized selectors
├── playwright.config.ts
├── package.json 
├── package-lock.json
└── README.md
```
## Environment Requirements

- [Node.Js](https://nodejs.org/en)
- Choice of IDE
- [git](https://git-scm.com/)

## Getting Started


### 1. Clone the Repository

    git clone https://github.com/Trubzz/todo-system.git

    cd todo-system

### 2. Install Dependencies

    npm install

### 3. Running the Tests

Execute the Playwright tests using the following command:

    npx playwright test

# Learning Resources
- [Playwright](https://playwright.dev/)