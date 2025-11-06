# Contacts Manager API

A simple, production-ready REST API for managing contacts built with Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ MongoDB database integration
- ✅ CORS enabled for frontend integration
- ✅ Comprehensive error handling
- ✅ Production-ready configuration
- ✅ No authentication required (perfect for simple dashboards)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/Prat05devs/ContactsManagerAPI.git
cd ContactsManagerAPI
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Update `.env` file with your configuration**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:8080
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5001`

## 📡 API Endpoints

**Base URL:** `http://localhost:5001/api/contacts`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Get all contacts | - |
| POST | `/` | Create new contact | `{name, email, phone}` |
| GET | `/:id` | Get contact by ID | - |
| PUT | `/:id` | Update contact | `{name, email, phone}` |
| DELETE | `/:id` | Delete contact | - |

## 📝 API Examples

### Get All Contacts
```bash
GET http://localhost:5001/api/contacts
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "createdAt": "2025-11-05T10:00:00.000Z",
    "updatedAt": "2025-11-05T10:00:00.000Z"
  }
]
```

### Create Contact
```bash
POST http://localhost:5001/api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "createdAt": "2025-11-05T10:00:00.000Z",
  "updatedAt": "2025-11-05T10:00:00.000Z"
}
```

### Update Contact
```bash
PUT http://localhost:5001/api/contacts/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "0987654321"
}
```

### Delete Contact
```bash
DELETE http://localhost:5001/api/contacts/:id
```

## 📂 Project Structure

```
ContactsManagerAPI/
├── config/
│   └── dbConnection.js      # MongoDB connection configuration
├── controllers/
│   └── contactController.js # Contact business logic
├── middleware/
│   └── errorhandler.js      # Global error handling
├── models/
│   └── contactModel.js      # Contact schema definition
├── routes/
│   └── contactRoutes.js     # API route definitions
├── frontend-integration/    # Frontend integration files
│   ├── contactService.js    # API service for frontend
│   ├── ContactList.jsx      # Example React component
│   ├── README.md            # Integration guide
├── .env                     # Environment variables template
├── .gitignore               # Git ignore rules
├── constants.js             # HTTP status codes
├── package.json             # Project dependencies
├── server.js                # Application entry point
└── README.md                # Project documentation
```

## 🔧 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 5001 | No |
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `NODE_ENV` | Environment (development/production) | development | No |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:8080 | No |

## 🛠️ Built With

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Express](https://expressjs.com/)** - Web framework
- **[MongoDB](https://www.mongodb.com/)** - Database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM
- **[CORS](https://github.com/expressjs/cors)** - Cross-origin resource sharing
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment configuration

## ⚠️ Error Handling

The API uses standard HTTP status codes:

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

## 🔗 Frontend Integration

This API is designed to work seamlessly with frontend applications. Check the `frontend-integration/` folder for:

- Ready-to-use API service (`contactService.js`)
- Example React components
- Integration guides and documentation

### Quick Frontend Setup

1. Copy `contactService.js` to your frontend project
2. Import and use in your components:

```javascript
import { contactService } from './services/contactService';

// Get all contacts
const contacts = await contactService.getAllContacts();

// Create a contact
await contactService.createContact({
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890"
});
```

## 🧪 Testing

Test the API using:

- **Browser:** Navigate to `http://localhost:5001/api/contacts`
- **cURL:** See examples in `frontend-integration/TESTING.md`
- **Postman:** Import the endpoints and test
- **Frontend:** Use the provided `contactService.js`

## 👤 Author

**Prateek Thapliyal**

- GitHub: [@Prat05devs](https://github.com/Prat05devs)
- Repository: [ContactsManagerAPI](https://github.com/Prat05devs/ContactsManagerAPI)

---

**Note:** This is a simple contact management API without authentication, for dashboard applications and learning purposes. 
