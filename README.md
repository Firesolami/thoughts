# [Thoughts](https://the-thoughts-app.azurewebsites.net)

Thoughts is a unique platform where people can share their deepest thoughts and darkest secrets. This community is built on trust and privacy, allowing users to express themselves freely without fear of judgment.

## Overview

The Thoughts app allows users to post thoughts anonymously. It has different user roles: normal users, premium members, and admins. Normal users can post thoughts, premium members can see who posted which thoughts, and admins have the power to delete any thoughts. The platform is built with Node.js and uses MongoDB for data storage.

## Technologies Used

- **Node.js**: The core of the application is built on Node.js, a highly scalable, JavaScript-based runtime.
- **Express.js**: A web application framework for Node.js, providing a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database used for storing user data and thoughts.
- **Luxon**: A library for working with dates and times in JavaScript.

## Getting Started

Follow these steps to get started with the Thoughts app:

### Installation

Clone the repository and install the necessary dependencies using npm.

```bash
git clone https://github.com/Firesolami/thoughts.git
cd thoughts
npm install
```

### Configuration

Configure your MongoDB connection string and other environment variables in a `.env` file. Replace the placeholders with your appropriate values.

```env
MONGODB_URI=your-mongodb-uri
MEMBER_CODE=your-member-code
ADMIN_CODE=your-admin-code
SESSION_SECRET=your-session-secret
```

### Database Setup

No additional database setup is required as MongoDB will automatically create the necessary collections upon data insertion.

### Start the Server

Launch the application server.

```bash
npm start
```

Visit [Thoughts](https://the-thoughts-app.azurewebsites.net) to access the live site.

## Contribution

Contributions are welcome from the community! If you'd like to improve this project, please send a PR. Before you start, ensure you replace the environment variables (`MONGODB_URI`, `MEMBER_CODE`, `ADMIN_CODE`, and `SESSION_SECRET`) with your appropriate values.
