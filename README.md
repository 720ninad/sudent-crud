### Project Demo
[Machine_coding_Test.webm](https://github.com/user-attachments/assets/2b298f16-b814-4bbf-a3b6-a74affe9254e)

```markdown
# Student Management System

This is a full-stack Student Management System that allows users to manage student records efficiently. The system is divided into two main parts: the **Client** (frontend) and the **Server** (backend). 

## Prerequisites

Before running the system, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (for the database)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/720ninad/sudent-crud.git
```

### 2. Install Dependencies

#### Client Side (Frontend)

Navigate to the **client** directory and install the necessary dependencies:

```bash
cd client
npm install
```

#### Server Side (Backend)

Next, navigate to the **server** directory and install the required dependencies:

```bash
cd server
npm install
```

### 3. Configure Database Credentials

In the **server/postgres.js** file, update the database credentials with your own database username and password.

```javascript
export const sequelize = new Sequelize("student", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});
```

- Replace `"postgres"` with your PostgreSQL username and password.
- Make sure that the database **student** exists in your PostgreSQL instance, or create it manually.

### 4. Start the Application

#### Client Side (Frontend)

Once the dependencies are installed and the database is configured, start the frontend by running the following command in the **client** directory:

```bash
cd client
npm run start
```

#### Server Side (Backend)

Start the backend by running the following command in the **server** directory:

```bash
cd server
npm run start
```

### 5. Access the Application

After both the client and server are running, you can access the application in your browser. Typically, the frontend will be available at `http://localhost:3000`, and the backend at `http://localhost:8000` (or the respective ports specified in your configuration).

---

## Features

- Add, update, and delete student records.
- View and manage a list of students.

---

