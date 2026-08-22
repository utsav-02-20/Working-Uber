# User Authentication API Documentation

This document describes all authentication-related endpoints for **User** in the Uber Clone backend.

---

## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object)
  - `firstName` (string, required): User's first name (minimum 3 characters).
  - `lastName` (string, optional): User's last name (minimum 3 characters).

- `email` (string, required): User's email address (must be a valid email).

- `password` (string, required): User's password (minimum 12 characters).

### Example JSON Format

```json
{
  "fullname": {
    "firstName": "Utsav",
    "lastName": "Kumar"
  },
  "email": "utsav@example.com",
  "password": "Newpas%5s@13"
}
```

### Example Response (201 Created)

```json
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN",
  "user": {
    "_id": "6a87e910e203f5bc9f03d88d",
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsav@example.com",
    "socketId": null,
    "createdAt": "2026-08-21T05:58:40.148Z",
    "updatedAt": "2026-08-21T05:58:40.148Z"
  }
}
```

### Error Response

```json
{
  "error": "Email already in use"
}
```

---

## `/users/login` Endpoint

### Description

Logs in an existing user using their email and password and returns a JWT authentication token.

### HTTP Method

`POST`

### Request Body

- `email` (string, required): Registered email address.
- `password` (string, required): User password.

### Example Request

```json
{
  "email": "utsav@example.com",
  "password": "Newpas%5s@13"
}
```

### Example Success Response (200 OK)

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "_id": "689f1b2a8d4b9a1d2f3e4567",
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsav@example.com"
  }
}
```

### Error Response (401 Unauthorized)

```json
{
  "error": "Invalid email or password"
}
```

---

## `/users/profile` Endpoint

### Description

Returns the authenticated user's profile using a valid JWT token.

### HTTP Method

`GET`

### Authentication

A valid JWT token is required.

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Example Success Response (200 OK)

```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "_id": "689f1b2a8d4b9a1d2f3e4567",
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsav@example.com",
    "socketId": null
  }
}
```

### Error Response

```json
{
  "error": "Invalid or expired token."
}
```

---

# Logout User API

Logs out the authenticated user by **blacklisting the JWT token for 24 hours** and clearing the authentication cookie.

## Endpoint

```http
POST /users/logout
```

## Authentication

A valid JWT token is required.

### Option 1: Cookie (Recommended)

The `token` cookie is automatically sent after a successful login.

### Option 2: Authorization Header

```http
Authorization: Bearer <your_jwt_token>
```

## Request Body

No request body is required.

## Success Response

**Status:** `200 OK`

```json
{
  "message": "Logout successful"
}
```

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Access denied. No token provided."
}
```

```json
{
  "error": "Token expired. Please login again."
}
```

```json
{
  "error": "Invalid or expired token."
}
```

---

## What Happens on Logout?

- Reads the JWT token from the cookie or `Authorization` header.
- Stores the token in the `blacklisttokens` collection.
- The token is automatically removed after **24 hours** using MongoDB's TTL index.
- Clears the `token` cookie from the client.
- Prevents the same token from accessing protected routes again.

---

## Protected User Routes

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/users/register` | `POST` | ❌ Not Required |
| `/users/login` | `POST` | ❌ Not Required |
| `/users/profile` | `GET` | ✅ JWT Required |
| `/users/logout` | `POST` | ✅ JWT Required |