Multi-Spa Management System

This project is a full-stack web application designed to manage multiple spa locations and their customers. It consists of a Node.js backend and a React frontend, providing both admin and customer functionalities, including user authentication, customer management, and spa service bookings.

Tech Stack
Backend: Node.js, Express, MongoDB
Frontend: React, JavaScript, CSS
Authentication: JSON Web Tokens (JWT)
API: RESTful API for client-server communication

BACKEND DETAILS
The backend is built with Node.js and Express and serves as the API layer to handle all data operations, including user authentication, customer management, and spa management. The backend communicates with a MongoDB database to store customer, spa, and user data.

Key Components
Models: Defined using Mongoose to structure the data.
Customer Model: Contains fields for customer details (fullName, ID, email, phone, spa, and fare), where spa is a reference to the Spa model's ObjectId.
Spa Model: Represents spa locations with fields like name, city, address, phoneNumber, email, and service.
User Model: Contains fields for user details including email, userName, password, and rol.

Controllers:
Customer Controller: Includes functions to create, read, update, and delete customers (postCustomer, getCustomers, getCustomerById, getCustomerByEmail, updateCustomer, deleteCustomer).
Spa Controller: Manages spa operations with similar CRUD functions.
Authentication Middleware:

Validates JWT tokens for secure routes and checks user roles to provide admin-specific access.

ENDPOINTS
Customers:
POST /api/v1/customers: Add a new customer.
GET /api/v1/customers: Retrieve all customers (Admin only).
GET /api/v1/customers/:id: Retrieve a customer by ID.
GET /api/v1/customers/email/:email: Retrieve a customer by email.
PUT /api/v1/customers/:id: Update customer details.
DELETE /api/v1/customers/:id: Delete a customer.
Spas:
POST /api/v1/spas: Add a new spa (Admin only).
GET /api/v1/spas: Retrieve all spas.
GET /api/v1/spas/: Retrieve a spa by ID.
PUT /api/v1/spas/: Update spa details (Admin only).
DELETE /api/v1/spas/: Delete a spa (Admin only).
Users:
GET /api/v1/users: Retrieve all users (Admin only).
POST /api/v1/users/register: Register a new user.
POST /api/v1/users/login: Log in a user.
DELETE /api/v1/users/: Delete a user (Admin only).

FRONTEND DETAILS
The frontend of this project is developed using React and provides a comprehensive user interface for managing spa locations and customer data. It includes several pages and components to facilitate user interactions and data management.

Pages
Home: The landing page of the application, providing an overview and navigation to other sections.
Client: Manages customer data and allows users to view, add, edit, and delete customer records.
Fares: Displays and manages information about service pricing and fare details.
Contact: Provides a contact form for users to get in touch with the service provider.
Login: Handles user authentication by allowing users to log in to their accounts.
Register: Allows new users to register and create an account.
Spa: Displays and manages individual spa locations and their details.
Spas: Lists all spa locations and provides CRUD functionality for managing them.

Components
Loading: A reusable component that displays a loading indicator while data is being fetched or processed.
Form: A generic form component used for adding and editing data across various pages.
Custom Hooks
AuthContext: Manages authentication state and user role, providing functions to log in, log out, and check authentication status.
useCustomers: Handles fetching, adding, editing, and deleting customer data from the API.
useSpas: Facilitates operations related to spa data, such as fetching and managing spa locations.
useForm: Manages form state and validation, making it easier to handle user input across different forms.
