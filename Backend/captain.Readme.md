# Captain Authentication API Documentation

This document describes all authentication-related endpoints for **Captain (Driver)** in the Uber Clone backend.

---

## `/captain/register` Endpoint

### Description

Registers a new captain (driver) by creating a captain account with personal and vehicle information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstName` (string, required): Captain's first name (minimum 3 characters).
  - `lastName` (string, optional): Captain's last name (minimum 3 characters).

- `email` (string, required): Captain's email address (must be a valid email).

- `password` (string, required): Captain's password (minimum 12 characters).

- `vehicle` (object, required):
  - `color` (string, required): Vehicle color.
  - `plate` (string, required): Vehicle registration number.
  - `capacity` (number, required): Passenger capacity.
  - `vehicleType` (string, required): `car`, `bike`, or `auto`.

### Example JSON Format

```json
{
  "fullname": {
    "firstName": "Utsav",
    "lastName": "Kumar"
  },
  "email": "utsavdriver@example.com",
  "password": "Utsav@123456",
  "vehicle": {
    "color": "Black",
    "plate": "BR01AB1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response (201 Created)

```json
{
  "message": "Captain registered successfully",
  "token": "JWT_TOKEN",
  "captain": {
    "_id": "689f1b2a8d4b9a1d2f3e4567",
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsavdriver@example.com",
    "socketId": null,
    "isAvailable": false,
    "vehicle": {
      "color": "Black",
      "plate": "BR01AB1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2026-08-22T08:30:00.000Z",
    "updatedAt": "2026-08-22T08:30:00.000Z"
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

## `/captain/login` Endpoint

### Description

Logs in an existing captain using their email and password and returns a JWT authentication token.

### HTTP Method

`POST`

### Request Body

- `email` (string, required): Registered captain email.
- `password` (string, required): Captain password.

### Example Request

```json
{
  "email": "utsavdriver@example.com",
  "password": "Utsav@123456"
}
```

### Example Success Response (200 OK)

```json
{
  "message": "Captain login successful",
  "token": "JWT_TOKEN",
  "captain": {
    "_id": "689f1b2a8d4b9a1d2f3e4567",
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsavdriver@example.com",
    "isAvailable": false,
    "vehicle": {
      "color": "Black",
      "plate": "BR01AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response

```json
{
  "error": "Invalid email or password"
}
```

---

## `/captain/profile` Endpoint

### Description

Returns the authenticated captain's profile using a valid JWT token.

### HTTP Method

`GET`

### Headers

- `Authorization` (string, required): `Bearer <JWT_TOKEN>`

### Example Success Response

```json
{
  "message": "Captain profile retrieved successfully",
  "captain": {
    "_id": "689f1b2a8d4b9a1d2f3e4567",
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsavdriver@example.com",
    "socketId": null,
    "isAvailable": false,
    "vehicle": {
      "color": "Black",
      "plate": "BR01AB1234",
      "capacity": 4,
      "vehicleType": "car"
    }
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

# Captain Logout API

Logs out the authenticated captain by **blacklisting the JWT token for 24 hours** and clearing the authentication cookie.

## Endpoint

```http
POST /captain/logout
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
  "message": "Captain logout successful"
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

## What Happens on Captain Logout?

- Reads the JWT token from the cookie or `Authorization` header.
- Stores the token in the `blacklisttokens` collection.
- The token is automatically removed after **24 hours** using MongoDB's TTL index.
- Clears the `token` cookie from the client.
- Prevents the same token from accessing protected captain routes again.

---

## Protected Captain Routes

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/captain/register` | `POST` | ❌ Not Required |
| `/captain/login` | `POST` | ❌ Not Required |
| `/captain/profile` | `GET` | ✅ JWT Required |
| `/captain/logout` | `POST` | ✅ JWT Required |