# API Endpoints
If you are using VSCode, you can install the REST Client extension and use the `requests.rest` file to make api calls for testing
## SHIFT ENDPOINTS
---
## POST /api/shift
### Restrictions
Must be an administrator role and authenticated
### Request Body
```
    {
        "name": string,
        "startTime": number (epoch),
        "endTime": number (epoch)
    }
```
### Response Body
```
    {
        "_id": string,
        "name": string,
        "startTime": number (epoch),
        "endTime": number (epoch)
    }
```
## GET /api/shifts
### Query Params
 All optional
 - userId: Id of user you want to return shifts for
 - start: Epoch value. Shifts will be returned that start on or after 
 - end: Epoch value. Shifts will be returned that start on or before
### Restrictions
Must be an authenticated user. If administrator role, all shifts will be returned based on the businessName of the authenticated user. If employee role, only shifts belonging to that user will be rturned
### Response Body
```
[
    {
        "_id": string,
        "name": string,
        "startTime": number (epoch),
        "endTime": number (epoch)
    }
]
```
## GET /api/shift/:USER_ID
### Restrictions
Must be authenticated 
### Response Body
```
    {
        "_id": string,
        "name": string,
        "startTime": number (epoch),
        "endTime": number (epoch)
        "businessName": string
    } 
```
## PUT /api/shift/:SHIFT_ID
### Restrictions
Must be an administrator role and authenticated
### Request Body
Only start time and end time are editable
```
    {
        "startTime": number (epoch),
        "endTime": number (epoch)
    }
```
### Response Body
```
    {
        "_id": string
    }
```
## DELETE /api/shift/:SHIFT_ID

---
## AUTHENTICATION/USER/EMPLOYEE ENDPOINTS
---

## POST /api/register
### Request Body
```
    {
        "email": string,
        "firstName": string,
        "lastName": string,
        "password": string,
        "role": "administrator" or "employee",
        "businessName": string,
    }
```
### Response Body 
```
    {
        "email": string,
        "firstName": string,
        "lastName": string,
        "role": "administrator" or "employee",
        "businessName": string,
    }
```
## POST /api/login
### Request Body
```
    {
        "email": string,
        "password": string
    }
```
### Response Body
```
    {
        "_id": string,
        "email": string,
        "firstName": string,
        "lastName": string,
        "role": "administrator" or "employee",
        "businessName": string,
    }
```
## GET /api/authorized
### Response Body
```
    {
        "_id": string,
        "email": string,
        "firstName": string,
        "lastName": string,
        "role": "administrator" or "employee",
        "businessName": string,
    }
```
## DELETE /api/logout

## POST /api/user
### Restrictions
Must be an administrator role and authenticated. This is used for creating Employees in the UI
### Response Body
```
    {
        "_id": string,
        "email": string,
        "firstName": string,
        "lastName": string,
        "role": "administrator" or "employee",
        "businessName": string,
    }
```
## GET /api/users
### Restrictions
Must be an administrator role and authenticated
### Response Body
```
    [
        {
            "_id": string,
            "email": string,
            "firstName": string,
            "lastName": string,
            "role": "administrator" or "employee",
            "businessName": string,
        }
    ]
```

## GET /api/user/:USER_ID
### Restrictions
Must be an administrator role and authenticated
### Response Body
```
    {
        "_id": string,
        "email": string,
        "firstName": string,
        "lastName": string,
        "role": "administrator" or "employee",
        "businessName": string,
    }
```

## PUT /api/user/:USER_ID
### Restrictions
Must be an administrator role and authenticated.
### Request Body - Any of the listed values
```
    {
        "email": string,
        "firstName": string,
        "lastName": string,
        "role": "administrator" or "employee",
    }
```
### Response Body
```
    {
        "_id": string
    }
```