## `/users/register` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## Example .json formate

``` json
  {
    "fullname": {
      "firstName": "Utsav",
      "lastName": "Kumar"
    },
    "email": "utsav@example.com",
    "password": "Newpas%5s@13"
  }
```

## Example responce (201 OK)

``` json
  {
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODdlOTEwZTIwM2Y1YmM5ZjAzZDg4ZCIsImlhdCI6MTc4NzI5MTkyMCwiZXhwIjoxNzg3ODk2NzIwfQ.MhLklHl_Fkbf0pBSqK7TyZ6oJc8X9mjWjM0eDgxDVM0",
    "user": {
        "fullname": {
            "firstName": "Utsav",
            "lastName": "Kumar"
        },
        "email": "utsav@example.com",
        "socketId": null,
        "_id": "6a87e910e203f5bc9f03d88d",
        "createdAt": "2026-08-21T05:58:40.148Z",
        "updatedAt": "2026-08-21T05:58:40.148Z"
    }
}
```


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
  "password": "StrongPassword@123"
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

### Error Response

```json
{
  "error": "Invalid email or password"
}
```

## `/user/profile` Endpoint

### Description

Returns the authenticated user's profile using a valid JWT token.

### HTTP Method

`GET`

### Headers

- `Authorization` (string, required): `Bearer <JWT_TOKEN>`

### Example Success Response

```json
{
  "message": "User profile retrieved successfully",
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

### Error Response

```json
{
  "error": "Invalid token."
}
```