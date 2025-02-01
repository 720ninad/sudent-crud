# server

# student-crud

# Student and Marks API

## Prerequisites

- Install [Node.js](https://nodejs.org/)
- Install [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the database:
   - Update PostgreSQL connection settings in `postgres/postgres.js`

## Running the Application

Start the server:

```sh
npm start
```

Server runs on `http://localhost:8000`

## API Endpoints

### Students API

#### Create a Student

**POST** `/student`

- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "dob": "2000-01-01",
    "email": "john@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Student added successfully",
    "user": { ... }
  }
  ```

#### Get All Students

**GET** `/student`

- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Response:**
  ```json
  {
    "totalCount": 5,
    "totalPages": 1,
    "currentPage": 1,
    "data": [ ... ]
  }
  ```

#### Get a Student by ID

**GET** `/student/:id`

- **Response:**
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "dob": "2000-01-01",
    "email": "john@example.com",
    "marks": [ ... ]
  }
  ```

#### Update a Student

**PUT** `/student/:id`

- **Body (JSON):**
  ```json
  {
    "name": "John Updated"
  }
  ```
- **Response:**
  ```json
  { "message": "Student Updated successfully" }
  ```

#### Delete a Student

**DELETE** `/student/:id`

- **Response:**
  ```json
  { "message": "Student Deleted successfully" }
  ```

### Marks API

#### Add Marks for a Student

**POST** `/marks`

- **Body (JSON):**
  ```json
  {
    "student_id": 1,
    "subject": "Math",
    "marks": 90
  }
  ```
- **Response:**
  ```json
  { "message": "Marks added successfully", "marks": { ... } }
  ```

#### Get All Marks

**GET** `/marks`

- **Response:**
  ```json
  [{ "id": 1, "subject": "Math", "marks": 90, "student_id": 1 }]
  ```

#### Get Marks by Student ID

**GET** `/marks/student/:id`

- **Response:**
  ```json
  [{ "id": 1, "subject": "Math", "marks": 90 }]
  ```

#### Update Marks

**PUT** `/marks/:id`

- **Body (JSON):**
  ```json
  {
    "marks": 95
  }
  ```
- **Response:**
  ```json
  { "message": "Marks Updated successfully" }
  ```

#### Delete Marks

**DELETE** `/marks/:id`

- **Response:**
  ```json
  { "message": "Marks Deleted successfully" }
  ```
