# BadBank — Full-Stack Banking Application (Refactored 3-Tier Architecture)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-v18-blue.svg)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.19-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.5-brightgreen.svg)](https://www.mongodb.com/)
[![Build Status](https://img.shields.io/badge/Build-Passing-success.svg)]()

> **Full Stack Development — Coding Assignment 7: Review Your README**  
> *Author:* **Sivaprakhash** ([@sivaprakhash12](https://github.com/sivaprakhash12))  
> *Repository:* [https://github.com/sivaprakhash12/badbank-refactored](https://github.com/sivaprakhash12/badbank-refactored)

---

## Table of Contents
1. [Project Title & Overview](#project-title--overview)
2. [Description & Motivation](#description--motivation)
   - [Why Did I Build It?](#why-did-i-build-it)
   - [Whom Does It Help?](#whom-does-it-help)
   - [What Business & Personal Problems Does It Solve?](#what-business--personal-problems-does-it-solve)
3. [Architecture Refactoring (From Tier 1 to Tier 3)](#architecture-refactoring-from-tier-1-to-tier-3)
4. [Technology Stack](#technology-stack)
5. [Key Features](#key-features)
   - [Current Core Features](#current-core-features)
   - [Security & Refactoring Improvements](#security--refactoring-improvements)
   - [Future Roadmap & Upcoming Features](#future-roadmap--upcoming-features)
6. [Screenshots & Visual Demos](#screenshots--visual-demos)
7. [Installation & Setup Guidelines](#installation--setup-guidelines)
   - [Prerequisites](#prerequisites)
   - [Step 1: Clone Repository](#step-1-clone-repository)
   - [Step 2: Backend Configuration & Startup](#step-2-backend-configuration--startup)
   - [Step 3: Frontend Configuration & Startup](#step-3-frontend-configuration--startup)
   - [Step 4: Running with Docker (Optional)](#step-4-running-with-docker-optional)
8. [API Endpoints Reference](#api-endpoints-reference)
9. [License](#license)
10. [Submission Link & Instructions](#submission-link--instructions)

---

## Project Title & Overview

**Project Title:** **BadBank: Refactored Full-Stack Banking Application**

**BadBank** is a full-stack, three-tier web application built on the MERN stack (MongoDB, Express, React, Node.js). Originally conceived as an introductory single-tier client application where all state resided unsafely in browser memory, this revised edition represents a complete **architectural refactoring**. It separates concerns into a responsive React frontend, a resilient Node.js/Express RESTful API service, and a secure, persistent MongoDB database with token-based authentication and strict input validation.

---

## Description & Motivation

### Why Did I Build It?
I developed this application as part of the Full Stack Development curriculum to bridge the gap between frontend prototyping and enterprise-grade software engineering. The initial version of the "Bad Bank" simulated core banking transactions (such as account creation, deposit, and withdrawal) solely inside client-side React Context. While helpful for basic UI logic, it suffered from fatal security vulnerabilities: sensitive passwords and user balances were exposed in plain text within client memory, and data vanished on page refresh.

I built this refactored version to implement a secure, industry-standard **three-tier architecture** with persistent database storage, server-side data sanitization, cryptographic password hashing, and authenticated RESTful communication.

### Whom Does It Help?
- **End Users / Account Holders:** Provides a seamless, trustworthy digital banking interface where customers can safely register, authenticate, deposit funds, withdraw money with real-time balance calculations, and audit their complete transaction ledger.
- **Full-Stack Developers & Students:** Serves as a reference implementation demonstrating how to transition an insecure legacy React application into a hardened, decoupled full-stack architecture.
- **Code Reviewers & Evaluators:** Provides a clean, well-documented codebase featuring modular folder architecture, clear separation of concerns, containerization, and RESTful API standards.

### What Business & Personal Problems Does It Solve?
1. **Data Volatility & Persistence:** Eliminates loss of financial state by replacing volatile browser memory with a scalable MongoDB document store.
2. **Security Vulnerabilities & Trust Deficits:** Mitigates client-side tampering, credential exposure, and unauthorized balance manipulation by shifting business logic and authorization to backend Express middleware.
3. **Transaction Integrity:** Enforces rigorous server-side checks that reject non-numeric inputs, negative deposits, and overdraft attempts that exceed available balances.
4. **Auditability & Traceability:** Maintains a structured ledger of every deposit and withdrawal event linked to unique user IDs for financial accountability.

---

## Architecture Refactoring (From Tier 1 to Tier 3)

The application was redesigned from an unauthenticated, single-tier prototype to an enterprise 3-tier architecture:

```
+-------------------------------------------------------------------------+
|                              PRESENTATION TIER                          |
|  React 18 + React Router + Bootstrap Cards + Context API / State Hooks |
+------------------------------------+------------------------------------+
                                     |  HTTPS / JSON (REST API Requests)
                                     v
+-------------------------------------------------------------------------+
|                              APPLICATION TIER                           |
|  Node.js + Express.js REST API + JWT / Auth Middleware + Data Validation|
+------------------------------------+------------------------------------+
                                     |  Mongoose / Mongo Native Driver
                                     v
+-------------------------------------------------------------------------+
|                                DATA TIER                                |
|  MongoDB Database (Persistent Users, Account Balances & Audit Ledger)  |
+-------------------------------------------------------------------------+
```

### Architecture Comparison

| Aspect | Tier 1 (Legacy Bad Bank) | Tier 3 (Refactored Bad Bank) |
|---|---|---|
| **User Data Storage** | Volatile in-memory React Context | Persistent MongoDB database |
| **Password Security** | Plain text exposed in browser | Bcrypt salted hash on the server |
| **Business Logic** | Executed in the user's browser | Enforced on Node.js/Express server |
| **Balance Integrity** | Easily altered via DevTools | Protected via atomic database operations |
| **API Layer** | None (client-side only) | Fully documented RESTful API endpoints |

---

## Technology Stack

### Frontend (Client Tier)
- **React.js (v18):** Declarative component-based UI library.
- **React Router DOM (v6):** Client-side routing for multi-page SPA navigation.
- **Bootstrap 5 & React-Bootstrap:** Responsive layouts, navigation bars, and card components.
- **Context API & Hooks (`useState`, `useContext`, `useEffect`):** Global user session and UI state management.
- **Fetch API / Axios:** Asynchronous HTTP communication with backend endpoints.

### Backend (Application Tier)
- **Node.js (v18+):** High-performance JavaScript runtime environment.
- **Express.js (v4):** Fast, unopinionated REST API routing framework.
- **Bcrypt.js:** Cryptographic password hashing algorithm with salt generation.
- **JSON Web Tokens (JWT) / Firebase:** Secure, stateless token-based authorization.
- **CORS & Body-Parser:** Cross-Origin Resource Sharing handling and request body parsing.
- **Dotenv:** Secure environment variable management.

### Database (Data Tier)
- **MongoDB (v6.5+) / MongoDB Atlas:** Distributed NoSQL document database.
- **Mongoose / MongoClient:** Document modeling, schema validation, and database connection pooling.

### DevOps & Development Tools
- **Git & GitHub:** Version control, collaboration, and repository hosting.
- **Docker & Docker Compose:** Containerization for multi-service local deployment.
- **Postman:** Comprehensive REST API endpoint testing and validation.
- **Nodemon & Concurrently:** Hot-reloading developer workflow.

---

## Key Features

### Current Core Features
- **Responsive Single-Page Application (SPA):** Seamless navigation between Home, Create Account, Login, Deposit, Withdraw, and All Data tabs without full page reloads.
- **User Registration & Account Creation:**
  - Mandatory fields validation (Name, Email, Password).
  - Client-side and server-side email format validation.
  - Password strength validation (minimum length check).
  - Clear success notifications and immediate option to log in or create another account.
- **User Authentication & Session Management:**
  - Secure login against hashed credentials in MongoDB.
  - Active session indicator in the navigation bar displaying the current user's identity.
  - Logout functionality that safely destroys session state.
- **Deposit Funds:**
  - Real-time balance display.
  - Numeric input verification rejecting non-number characters (`NaN`).
  - Negative number guard preventing subtraction via the deposit form.
  - Dynamic button disabling when inputs are empty or invalid.
  - Immediate balance update reflecting in the database and UI.
- **Withdraw Funds:**
  - Overdraft protection: Prevents withdrawals greater than the available balance.
  - Rejects zero, negative, and invalid numeric input.
  - Transaction alert confirmation upon successful withdrawal.
- **All Data / Transaction Ledger:**
  - Admin/Customer data card showcasing all registered account profiles and balances.
  - Formatted JSON / tabular views demonstrating persistent MongoDB records.

### Security & Refactoring Improvements
- **Decoupled Architecture:** Separation of front-end view logic from database interactions.
- **Server-Side Validation:** All deposit and withdrawal values are re-verified on the server to prevent client-side script tampering.
- **Protected Environment Credentials:** Sensitive database connection strings and JWT secrets are stored exclusively in `.env` files and omitted from version control via `.gitignore`.

### Future Roadmap & Upcoming Features
- [ ] **Peer-to-Peer (P2P) Fund Transfers:** Send money directly to other registered users by email address or account ID.
- [ ] **Two-Factor Authentication (2FA):** Integrate SMS/Email OTP verification for high-value transactions.
- [ ] **Role-Based Access Control (RBAC):** Restrict "All Data" views to authorized bank administrator roles.
- [ ] **Statement Export:** Download monthly account activity statements as formatted PDF and CSV files.
- [ ] **Automated Test Suite:** Add end-to-end integration tests using Cypress and unit tests using Jest.

---

## Screenshots & Visual Demos

Below are previews of the BadBank application interface in action:

| Screen | Description | Preview |
|---|---|---|
| **Landing Page** | Welcome portal introducing the banking features with navigation header and feature highlights. | `![Home Dashboard](screenshots/home.png)` |
| **Create Account** | Registration form with real-time field validation and success state cards. | `![Create Account](screenshots/create_account.png)` |
| **User Login** | Authentication modal validating email and password with error feedback. | `![Login](screenshots/login.png)` |
| **Deposit Money** | Deposit view displaying current balance, input validation, and transaction alerts. | `![Deposit](screenshots/deposit.png)` |
| **Withdraw Money** | Withdrawal view with overdraft protection alerts and real-time deductions. | `![Withdraw](screenshots/withdraw.png)` |
| **All Data Ledger** | Comprehensive ledger displaying user accounts, balances, and transaction logs. | `![All Data](screenshots/alldata.png)` |

> *Note for Evaluators:* To capture or replace live screenshots, run the project locally and save images inside the `/screenshots` directory under matching filenames.

---

## Installation & Setup Guidelines

Follow these step-by-step instructions to get your local development environment up and running.

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher) — [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn**
- **Git** — [Download Git](https://git-scm.com/)
- **MongoDB** (Local Community Server running on `localhost:27017` or a cloud [MongoDB Atlas](https://www.mongodb.com/atlas) connection string)

---

### Step 1: Clone Repository

```bash
# Clone the repository to your local machine
git clone https://github.com/sivaprakhash12/badbank-refactored.git

# Navigate into the project root directory
cd badbank-refactored
```

---

### Step 2: Backend Configuration & Startup

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**  
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/badbank
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

3. **Start the backend server:**
   ```bash
   # Production / standard mode
   npm start

   # Or development mode with auto-reload
   npm run server
   ```
   *The backend REST API will now be listening at:* `http://localhost:5000`

---

### Step 3: Frontend Configuration & Startup

1. **Navigate to the client folder and install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Start the React development server:**
   ```bash
   npm start
   ```
   *The React application will launch automatically at:* `http://localhost:3000`

---

### Step 4: Running with Docker (Optional)

If you have **Docker** and **Docker Compose** installed, you can spin up the complete multi-tier application (Express, React, MongoDB) with a single command:

```bash
docker-compose up --build
```

---

## API Endpoints Reference

The refactored backend exposes the following RESTful API endpoints:

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/account/create/:name/:email/:password` | Register a new bank user account | Public |
| `POST` | `/account/login/:email/:password` | Authenticate an existing user | Public |
| `GET` | `/account/balance/:email` | Retrieve current account balance | Authenticated |
| `POST` | `/account/deposit/:email/:amount` | Deposit funds and update balance | Authenticated |
| `POST` | `/account/withdraw/:email/:amount` | Withdraw funds with overdraft check | Authenticated |
| `GET` | `/account/all` | Fetch all registered accounts and balances | Admin / Audit |

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for complete details.

```
MIT License
Copyright (c) 2026 Sivaprakhash (sivaprakhash12)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

The license is also defined in [`package.json`](package.json):
```json
{
  "license": "MIT"
}
```

---

## Submission Link & Instructions

### GitHub README Submission Link
To submit this assignment, copy and provide the official GitHub link below:

```
https://github.com/sivaprakhash12/badbank-refactored#readme
```

### Git Push Quick-Start (To publish your repository)
If you are publishing or updating your GitHub repository from your local machine, run:

```bash
# Initialize git if not already initialized
git init

# Stage all files (README.md, package.json, LICENSE, source code)
git add .

# Commit your revisions
git commit -m "feat: complete Coding Assignment 7 - reviewed and refactored README"

# Set default branch to main
git branch -M main

# Link your remote GitHub repository
git remote add origin https://github.com/sivaprakhash12/badbank-refactored.git

# Push changes to GitHub
git push -u origin main
```

---

*Crafted with precision for **Coding Assignment 7: Review Your README**.*
