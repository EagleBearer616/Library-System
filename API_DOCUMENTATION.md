# Library Management System - REST API Documentation

## Base URL
```
https://api.library-system.com/v1
```

## Authentication
All endpoints require an API key in the header:
```
Authorization: Bearer {api_key}
```

## Books Endpoints

### GET /books
Get all books with optional filtering

**Query Parameters:**
- `status` (optional): Filter by status (`available`, `borrowed`, `reserved`)
- `category` (optional): Filter by category
- `search` (optional): Search in title, author, or ISBN
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0-7432-7356-5",
      "category": "Fiction",
      "status": "available",
      "publishedYear": 1925,
      "description": "A classic American novel set in the Jazz Age",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

### GET /books/{id}
Get a specific book by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "category": "Fiction",
    "status": "available",
    "publishedYear": 1925,
    "description": "A classic American novel set in the Jazz Age",
    "borrowedBy": null,
    "borrowedDate": null,
    "dueDate": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### POST /books
Create a new book

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0-13-235088-4",
  "category": "Technology",
  "publishedYear": 2008,
  "description": "A handbook of agile software craftsmanship"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": "3",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0-13-235088-4",
    "category": "Technology",
    "status": "available",
    "publishedYear": 2008,
    "description": "A handbook of agile software craftsmanship",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### PUT /books/{id}
Update an existing book

**Request Body:**
```json
{
  "title": "Clean Code: Updated Edition",
  "description": "An updated handbook of agile software craftsmanship"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": "3",
    "title": "Clean Code: Updated Edition",
    "author": "Robert C. Martin",
    "isbn": "978-0-13-235088-4",
    "category": "Technology",
    "status": "available",
    "publishedYear": 2008,
    "description": "An updated handbook of agile software craftsmanship",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

### DELETE /books/{id}
Delete a book

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

## Borrowing Endpoints

### POST /books/{id}/borrow
Borrow a book

**Request Body:**
```json
{
  "borrowerName": "John Doe",
  "borrowerEmail": "john.doe@email.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "id": "1",
    "status": "borrowed",
    "borrowedBy": "John Doe",
    "borrowedDate": "2024-01-15",
    "dueDate": "2024-02-15",
    "borrowerEmail": "john.doe@email.com"
  }
}
```

### POST /books/{id}/return
Return a borrowed book

**Response:**
```json
{
  "success": true,
  "message": "Book returned successfully",
  "data": {
    "id": "1",
    "status": "available",
    "borrowedBy": null,
    "borrowedDate": null,
    "dueDate": null,
    "returnedDate": "2024-02-10"
  }
}
```

### POST /books/{id}/reserve
Reserve a book

**Request Body:**
```json
{
  "reservedBy": "Jane Smith",
  "reservedEmail": "jane.smith@email.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book reserved successfully",
  "data": {
    "id": "1",
    "status": "reserved",
    "reservedBy": "Jane Smith",
    "reservedDate": "2024-01-15",
    "reservedEmail": "jane.smith@email.com"
  }
}
```

## Statistics Endpoints

### GET /stats
Get library statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBooks": 150,
    "availableBooks": 120,
    "borrowedBooks": 25,
    "reservedBooks": 5,
    "categories": [
      {
        "name": "Fiction",
        "count": 45
      },
      {
        "name": "Technology",
        "count": 30
      },
      {
        "name": "Science",
        "count": 25
      }
    ],
    "overdueBooks": 3
  }
}
```

### GET /stats/overdue
Get overdue books

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "2",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "borrowedBy": "John Doe",
      "dueDate": "2024-01-10",
      "daysOverdue": 5
    }
  ]
}
```

## Categories Endpoints

### GET /categories
Get all book categories

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Fiction",
      "count": 45
    },
    {
      "name": "Technology",
      "count": 30
    },
    {
      "name": "Science",
      "count": 25
    }
  ]
}
```

## Search Endpoints

### GET /search
Search across books

**Query Parameters:**
- `q` (required): Search query
- `fields` (optional): Fields to search in (title, author, isbn, description)
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "relevanceScore": 0.95
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "isbn",
        "message": "ISBN format is invalid"
      }
    ]
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Book with ID '123' not found"
  }
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": {
    "code": "BOOK_NOT_AVAILABLE",
    "message": "Book is already borrowed and cannot be borrowed again"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Rate Limiting
- 100 requests per minute per API key
- 1000 requests per hour per API key

**Rate limit headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642675200
```

## HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error