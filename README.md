# 📦 Simple REST API with Express.js

This is a basic RESTful API built using [Express.js](https://expressjs.com/), supporting CRUD operations for managing a list of items.

---

## 🚀 Features

- Get all items
- Get item by ID
- Add a new item
- Update an existing item
- Delete an item
- 404 handler for invalid routes
- Global error handler

---

## 🛠️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- npm (comes with Node.js)

GET /
Description: Welcome route

Request:
curl http://localhost:4000/

Response:
"Hello, World"

GET /items
Description: Retrieve all items

Request:
curl http://localhost:4000/items

Response:
[
  {
    "id": 1,
    "name": "item One",
    "description": "desc for item one"
  },
  {
    "id": 2,
    "name": "item Two",
    "description": "desc for item two"
  }
]

GET /items/:id
Description: Retrieve an item by ID

Request:
curl http://localhost:4000/items/1

Successful Response:
{
  "id": 1,
  "name": "item One",
  "description": "desc for item one"
}

If Not Found
item not found

POST /items
Description: Create a new item

Request:
curl -X POST http://localhost:4000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "item Three", "description": "desc for item three"}'

Response:
{
  "id": 3,
  "name": "item Three",
  "description": "desc for item three"
}

PUT /items/:id
Description: Update an existing item

Request:

curl -X PUT http://localhost:4000/items/2 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "Updated description"}'
Response:
{
  "id": 2,
  "name": "Updated Item",
  "description": "Updated description"
}
If Not Found:
item not found

DELETE /items/:id
Description: Delete an item by ID

Request:
curl -X DELETE http://localhost:4000/items/1
Response:
Status: 204 No Content

If Not Found:
item not found

Invalid Route (404 Handler)
Request:

curl http://localhost:4000/invalidroute
Response:

{
  "error": "Route not found"
}

Internal Server Error (Example)
If any server error occurs, you'll receive:

{
  "error": "Something went wrong!"
}