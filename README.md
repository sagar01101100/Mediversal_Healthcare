# Mediversal_Healthcare

# API Documentation for Appointment API, Order API, and Patient API

## Table of Contents
1. [Overview](#overview)
2. [Appointment API](#appointment-api)
   - [Features](#appointment-api-features)
   - [Endpoints](#appointment-api-endpoints)
3. [Order API](#order-api)
   - [Features](#order-api-features)
   - [Endpoints](#order-api-endpoints)
4. [Patient API](#patient-api)
   - [Features](#patient-api-features)
   - [Endpoints](#patient-api-endpoints)
5. [Setup and Running](#setup-and-running)
6. [Common Requirements](#common-requirements)

---

## Overview
This project comprises three separate APIs designed for specific functionalities:
1. **Appointment API**: Handles scheduling and retrieving appointments.
2. **Order API**: Manages orders and their statuses.
3. **Patient API**: Tracks patient data including registration and details retrieval.

Each API is built using modern Node.js practices with features such as validation, database integrations, and extensible designs.

---

## Appointment API

### Appointment API Features:
- Create new appointments.
- Retrieve appointments by date range.
- Prevent overlapping appointments.
- Validates input fields for date and time formats.

### Appointment API Endpoints:
#### `POST /api/appointments`
- **Description**: Create a new appointment.
- **Request Body**:
  ```json
  {
    "customerId": "string",
    "customerName": "string",
    "startDate": "YYYY-MM-DD",
    "startTime": "HH:mm",
    "endDate": "YYYY-MM-DD",
    "endTime": "HH:mm",
    "description": "string"
  }
  ```
- **Response**:
  - `201 Created`: Appointment successfully created.
  - `400 Bad Request`: Validation error or time slot conflict.

#### `GET /api/appointments`
- **Description**: Retrieve appointments optionally filtered by date range.
- **Query Parameters**:
  - `from` (optional): Start date (e.g., `2025-01-01`).
  - `to` (optional): End date (e.g., `2025-01-31`).
- **Response**:
  - `200 OK`: Returns an array of appointments.

---

## Order API

### Order API Features:
- Create and retrieve orders.
- Update order statuses.
- Support for dynamic customer and product data.

### Order API Endpoints:
#### `POST /api/orders`
- **Description**: Create a new order.
- **Request Body**:
  ```json
  {
    "orderId": "string",
    "customerId": "string",
    "productIds": ["string"],
    "totalAmount": "number",
    "status": "string"
  }
  ```
- **Response**:
  - `201 Created`: Order successfully created.
  - `400 Bad Request`: Validation error.

#### `GET /api/orders/:id`
- **Description**: Retrieve details of a specific order by ID.
- **Response**:
  - `200 OK`: Order details.
  - `404 Not Found`: Order not found.

#### `PATCH /api/orders/:id`
- **Description**: Update the status of an existing order.
- **Request Body**:
  ```json
  {
    "status": "string"
  }
  ```
- **Response**:
  - `200 OK`: Order status successfully updated.
  - `400 Bad Request`: Validation error.
  - `404 Not Found`: Order not found.

---

## Patient API

### Patient API Features:
- Register new patients.
- Retrieve patient data by ID.
- Validate patient information input.

### Patient API Endpoints:
#### `POST /api/patients`
- **Description**: Register a new patient.
- **Request Body**:
  ```json
  {
    "patientId": "string",
    "name": "string",
    "age": "number",
    "gender": "string",
    "address": "string",
    "phone": "string"
  }
  ```
- **Response**:
  - `201 Created`: Patient successfully registered.
  - `400 Bad Request`: Validation error.

#### `GET /api/patients/:id`
- **Description**: Retrieve patient details by ID.
- **Response**:
  - `200 OK`: Patient details.
  - `404 Not Found`: Patient not found.

---

## Setup and Running

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file with the following:
     ```env
     DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>
     PORT=3000
     ```

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Test APIs**:
   - Use [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test API endpoints.

---

## Common Requirements
- Node.js 16+
- MongoDB for database storage.
- Validation library for ensuring input correctness (e.g., `Joi` or custom logic).
- Express.js framework for routing and middleware management.
- Moment.js or equivalent for date and time handling.

---

## Notes
- Ensure database connectivity before making API calls.
- Handle error responses effectively to provide informative feedback to the client.
- Test endpoints thoroughly using tools like Postman or Jest for automated testing.

Feel free to reach out if you encounter issues or require additional functionality!

