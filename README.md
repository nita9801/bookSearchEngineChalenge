# 📚 Book Search Engine

![License](https://img.shields.io/badge/license-MIT-green)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo_Server-blueviolet)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Node.js](https://img.shields.io/badge/Node.js-Express.js-brightgreen)

## 🚀 Description

The **Book Search Engine** is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to search for books using the Google Books API, save their favorite books to their account, and manage their saved books. This application has been refactored to use **GraphQL** with **Apollo Server**, replacing the previous RESTful API. It provides a seamless and dynamic user experience for avid readers who want to keep track of books they are interested in.

---

## 🛠️ Features

- **Search for Books**: Users can search for books by entering a keyword, and the app fetches results from the Google Books API.
- **User Authentication**: Secure user login and signup functionality using JSON Web Tokens (JWT).
- **Save Books**: Logged-in users can save books to their account for future reference.
- **View Saved Books**: Users can view all the books they have saved.
- **Remove Books**: Users can remove books from their saved list.
- **GraphQL API**: The backend is powered by GraphQL, providing efficient and flexible data fetching and mutations.
- **Responsive Design**: The application is fully responsive and works seamlessly across devices.

---
## 🖥️ Technologies Used

 ***Frontend***
- **React**: For building the user interface.
- **Apollo**: Client: For interacting with the GraphQL API.
- **React Router**: For navigation between pages.

***Backend***
- **Node.js**: For the server-side runtime environment.
- **Express.js**: For building the server.
- **Apollo Server**: For implementing the GraphQL API.
- **MongoDB**: For the database, hosted on MongoDB Atlas.
- **Mongoose**: For object data modeling (ODM).
## 📂 File Structure

***Backend***
- **server.ts**: Configures the Apollo Server and Express middleware.
- **auth.ts**: Handles authentication middleware for GraphQL.
- **schema/**: Contains typeDefs.ts and resolvers.ts for GraphQL schema and resolvers.

***Frontend***
- **queries.ts**: Contains GraphQL queries.
- **mutations.ts**: Contains GraphQL mutations.
- **App.tsx**: Sets up the Apollo Provider and routes.
- **SearchBooks.tsx**: Implements the book search functionality.
- **SavedBooks.tsx**: Displays the user's saved books.
## 🚀 Deployment
The application is deployed on Render with a MongoDB database hosted on MongoDB Atlas.

- **Live URL**: Book Search Engine
- **GitHub Repository**: GitHub Repo
## 🛡️ License
This project is licensed under the MIT License. See the LICENSE file for details.

## 📸 Screenshots/Demo
**Homepage**:
Assets\Screenshot 2025-05-05 223746.png

**Search Results**:

Assets\Screenshot 2025-05-05 223812.png
**Saved Books**:
unavailable
**Demo**:
https://app.screencastify.com/v3/watch/dkJsIPSfTOEVYeZ4Jijg
## 🛠️ Installation
**Clone the repository**:   https://github.com/nita9801/bookSearchEngineChalenge.git
**Navigate to the project directory**:
**Install dependencies for both the client and server**:
**Build the client and server**:
**Start the development server**:
## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📧 Questions
For any questions, please contact me at your-email@example.com. ```