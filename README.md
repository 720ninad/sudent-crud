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



# Student API Documentation

This document outlines the API endpoints for managing student data, including operations like registration, updating, deleting, and retrieving student details along with their marks.

## Base URL

/api/students

## Endpoints



```json

.1.Register a New Student
**URL**: `/api/students/register`  
**Method**: `POST`  
**Description**: Registers a new student along with their marks.

 Request Body:
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 20,
  "dob": "2004-05-12",
  "marks": [
    {
      "subject": "Math",
      "marks": 85
    },
    {
      "subject": "Science",
      "marks": 90
    }
  ]
}


Response:
201 Created: Student successfully created.
{
  "message": "Student added successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 20,
    "dob": "2004-05-12",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
400 Bad Request: Marks data is missing or invalid.
{
  "error": "Marks data is required."
}

500 Internal Server Error: Server error while processing the request.
{
  "error": "Internal Server Error",
  "error": "<error-message>"
}



 2. Get All Students
URL: /api/students
Method: GET
Description: Retrieves a paginated list of all students with their marks.

Query Parameters:
page: Page number (default: 1).
limit: Number of records per page (default: 10).

{
  "totalCount": 100,
  "totalPages": 10,
  "currentPage": 1,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "age": 20,
      "dob": "2004-05-12",
      "marks": [
        {
          "subject": "Math",
          "marks": 85
        },
        {
          "subject": "Science",
          "marks": 90
        }
      ]
    }
  ]
}


500 Internal Server Error: Server error while fetching the students.

{
  "error": "Internal Server Error",
  "error": "<error-message>"
}

3. Get Student by ID
URL: /api/students/:id
Method: GET
Description: Retrieves a student by their ID along with their marks.

URL Parameters:
id: The ID of the student.

{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 20,
  "dob": "2004-05-12",
  "marks": [
    {
      "subject": "Math",
      "marks": 85
    },
    {
      "subject": "Science",
      "marks": 90
    }
  ]
}


404 Not Found: Student not found.
{
  "message": "Student not found"
}



4. Update Student
URL: /api/students/:id
Method: PUT
Description: Updates the student details and their marks.

URL Parameters:
id: The ID of the student to update.

Request Body:
{
  "name": "John Updated",
  "email": "johnupdated@example.com",
  "age": 21,
  "dob": "2003-04-15",
  "marks": [
    {
      "subject": "Math",
      "marks": 90
    },
    {
      "subject": "Science",
      "marks": 95
    }
  ]
}

Response:
200 OK: Student updated successfully.
{
  "message": "Student updated successfully"
}

404 Not Found: Student not found.
{
  "message": "Student not found"
}



5. Delete Student
URL: /api/students/:id
Method: DELETE
Description: Deletes a student by their ID.

URL Parameters:
id: The ID of the student to delete.
Response:
200 OK: Student deleted successfully.

{
  "message": "Student Deleted successfully"
}

404 Not Found: Student not found.
{
  "message": "Student Does Not Exists"
}



6. Get All Students (Paginated)
GET /api/students/:page/:limit

URL Parameters:
page: The page number (default is 1).
limit: The number of students per page (default is 10).
Example Request:

GET /api/students/2/10

Response:
Success: 200 OK
{
  "totalCount": 50,
  "totalPages": 5,
  "currentPage": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 20,
      "dob": "2005-04-15",
      "marks": [
        { "subject": "Math", "marks": 85 },
        { "subject": "Science", "marks": 90 }
      ]
    }
  ]
}

Error: 500 Internal Server Error
{
  "error": "Internal Server Error",
  "error": "Database error message"
}

```

