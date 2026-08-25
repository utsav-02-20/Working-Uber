# Frontend Authentication Documentation

Frontend authentication implementation and backend integration requirements.

## Authentication Routes

| Route                 | Method | Purpose              |
| --------------------- | ------ | -------------------- |
| `/`                   | GET    | Home page            |
| `/userlogin`          | GET    | User Login page      |
| `/usersignup`         | GET    | User Signup page     |
| `/userforgotpassword` | GET    | Forgot Password page |

---

## Pages Completed

### Home (`pages/home.jsx`)

* Background image with dark overlay.
* **Continue to Book** button.
* Redirects to `/userlogin`.

### User Login (`pages/users/login.jsx`)

**Fields**

* Email
* Password

**Features**

* Live email validation.
* Password show/hide toggle.
* Forgot Password navigation.
* Signup navigation.

### User Signup (`pages/users/signup.jsx`)

**Fields**

* First Name
* Last Name
* Email
* Password
* Confirm Password

**Features**

* Live email validation.
* Password strength validation.
* Confirm password matching validation.
* Password show/hide toggle.
* Login navigation.

### Forgot Password (`pages/users/forgotPassword.jsx`)

**Fields**

* Email

**Features**

* Live email validation.
* Submit email for password reset.

---

## Validators Implemented

### `src/validator/email.ts`

**Validation**

* Email is required.
* Must be a valid email format.

**Returns**

| Condition | Message                       |
| --------- | ----------------------------- |
| Empty     | `Email is required`           |
| Invalid   | `Enter a valid email address` |
| Valid     | `null`                        |

### `src/validator/password.ts`

#### Password Validation

**Requirements**

* Required.
* Minimum **12 characters**.
* At least **1 uppercase letter**.
* At least **1 lowercase letter**.
* At least **1 number**.
* At least **1 special character**.

**Returns**

| Condition | Message                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------- |
| Empty     | `Password is required`                                                                                    |
| Invalid   | `Password must be at least 12 characters and include uppercase, lowercase, number and special character.` |
| Valid     | `null`                                                                                                    |

#### Confirm Password Validation

**Requirements**

* Required.
* Must match password.

**Returns**

| Condition | Message                        |
| --------- | ------------------------------ |
| Empty     | `Confirm password is required` |
| Mismatch  | `Passwords do not match`       |
| Match     | `null`                         |

### `src/validator/index.ts`

```ts
export { validateEmail } from "./email";
export {
  validatePassword,
  validateConfirmPassword,
} from "./password";
```

---

## Frontend Validation Flow

### Login

* Validate email on input change.
* Show email error immediately.
* Password input accepted after validation.

### Signup

* Validate email on input change.
* Validate password on input change.
* Validate confirm password on input change.
* Revalidate confirm password whenever password changes.

---

## Request Payloads

### Register — `POST /users/register`

```json
{
  "fullname": {
    "firstName": "Utsav",
    "lastName": "Kumar"
  },
  "email": "utsav@email.com",
  "password": "RollingDreams@2026"
}
```

### Login — `POST /users/login`

```json
{
  "email": "utsav@email.com",
  "password": "RollingDreams@2026"
}
```

### Forgot Password

```json
{
  "email": "utsav@email.com"
}
```

---

## Backend Integration Requirements

### Signup

**Request Body**

* `fullname.firstName`
* `fullname.lastName`
* `email`
* `password`

**API Call Blocked If**

* Email is invalid.
* Password is invalid.
* Confirm password does not match.

### Login

**Request Body**

* `email`
* `password`

**API Call Blocked If**

* Email is invalid.
* Password is empty.

### Authentication Response

```json
{
  "token": "<JWT_TOKEN>",
  "user": {}
}
```

---

## Navigation

| From            | To                    |
| --------------- | --------------------- |
| Home            | `/userlogin`          |
| Login           | `/usersignup`         |
| Login           | `/userforgotpassword` |
| Signup          | `/userlogin`          |
| Forgot Password | `/userlogin`          |

---

## Forgot Password Frontend

**Route:** `GET /userforgotpassword`

**Purpose**

Allows users to request a password reset using their registered email.

### Validation

**Field**

* `email` (required)

**Rules**

* Email is required.
* Email must be valid.
* Uses `validateEmail()` from `src/validator/email.ts`.

### Request Payload

```json
{
  "email": "rahul@email.com"
}
```

### Frontend Behaviour

* Validate email on every input change.
* Show validation error below the email field.
* Prevent submission until email is valid.
* Display a success message after successful validation/submission.
* Show **Resend Link** button after a successful request.

### Backend Endpoint

`POST /users/forgot-password`

---

## Project Structure

```text
src/
├── pages/
│   ├── home.jsx
│   └── users/
│       ├── login.jsx
│       ├── signup.jsx
│       └── forgotPassword.jsx
│
├── validator/
│   ├── email.ts
│   ├── password.ts
│   └── index.ts
```

---

## Frontend Status

* [x] Home page completed.
* [x] User Login UI completed.
* [x] User Signup UI completed.
* [x] Forgot Password UI completed.
* [x] Email validator implemented.
* [x] Password validator implemented.
* [x] Confirm Password validator implemented.
* [x] React Router navigation completed.
* [x] Ready for backend API integration.
