# Placement Cell Management System

## Overview

This project is a Placement Cell Management System built with Node.js, Express, MongoDB, and Passport.js for authentication. It allows management of students, interviews, jobs, and CSV operations related to placement activities.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

* Node.js (version >= 12.0.0)
* MongoDB

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

Clone the project repository from GitHub:

git clone https://github.com/Mrjha2014/PlacementCell.git
cd placementcell

### 2. Install Dependencies

Install the required npm dependencies:

npm install

### 3. Set Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

SESSION_SECRET=your_session_secret
DB_URI=your_mongodb_connection_string

Replace `your_session_secret` with a secret key for session management and `your_mongodb_connection_string` with your MongoDB connection string.

### 4. Start the Application

Start the application using npm:

npm start

The application will run on `http://localhost:3000/login` by default. You can access it in your browser.

## Usage

* **Register/Login** : Navigate to `/register` to create a new user account or `/login` to log in with an existing account.
* **Students** : Manage student records, including adding new students and updating their information.
* **Interviews** : Schedule and manage interviews with companies, update interview statuses, and view applicants.
* **Jobs** : View  job postings fetched from an external API.
* **CSV Operations** : Import and export data in CSV format for various operations.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any improvements or new features.

---
