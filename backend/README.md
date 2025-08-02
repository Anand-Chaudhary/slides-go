
# User Registration Endpoint

## POST `/users/register`

Registers a new user in the system.

### Request Body
Send a JSON object with the following fields:

```
{
  "username": string,   // Minimum 5 characters
  "email": string,      // Must be a valid email address
  "password": string    // Minimum 3 characters
}
```

#### Example
```
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword"
}
```

### Response
On success (`201 Created`):

```
{
  "success": true,
  "message": "User Created Successfully",
  "user": {
    "_id": string,
    "username": string,
    "email": string,
    // ...other user fields
  },
  "token": string // JWT authentication token
}
```

On validation error or missing fields, returns an error message with appropriate status code.
