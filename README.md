<h1 align="center">Customizable Authentication Solution with Prisma & Postgres</h1>

https://github.com/ManishZ007/easy-authentication-prisma-postgres/blob/main/demo/Screenshot%202024-09-06%20011459.png

## 🧾<a href="easy-access-contents">Easy Access Contents</a>

1. 🙋‍♂️[Introduction](#introduction)
2. 🤩[Quick Start](#quick-start)
3. ⚙️[Techologies Used](#techologies-used)
4. ⭐[Features](#features)
5. 🛠️[Customization](#customization)
6. 🎊[Moral of Story](#moral-of-story)

## 🙋‍♂️<a href="introduction">Introduction</a>

**Overview**

This project is a flexible authentication solution built with Next.js, NextAuth, Prisma, and Postgres. It allows for rapid integration of authentication into your applications with minimal configuration. Simply connect your database, run the migration, and you're ready to go!

**Objective**

The objective of this project is to provide a fully customizable authentication solution that allows developers to seamlessly integrate Next.js and NextAuth into their applications. With support for Prisma and Postgres, this project ensures scalable, SQL-based user management while maintaining flexibility in customization. The goal is to reduce the complexity of setting up authentication so that developers can focus on their core features.

## 🤩<a href="quick-start">Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

- [Node.js](https://nodejs.org/en)
- [Postgres Database](https://www.postgresql.org)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Setup**

1. Clone the repository and install dependencies
```bash
git clone https://github.com/ManishZ007/easy-authentication-prisma-postgres.git
cd easy-authentication-prisma-postgres
npm install
```
2. Update the .env file with your Postgres DATABASE_URL:

  if there is not .env file then create one .env file in root
```bash
DATABASE_URL="postgresql://<database>:<password>@localhost:5432/<collection>"
```
3. Update the .env.local file with your Google OAuth, and GitHub OAuth credentials:

  if there is not .env file then create one .env file in root
```bash
AUTH_SECRET='this automaticaly generate': https://cli.authjs.dev

# github oAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=


# google oAuth
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=
```

4. initialise prisma
```bash
npx prisma init
```

5. adding schema in schema.prisma file
```bash
model users {
  id         String   @id @default(uuid())
  username   String?  @unique @db.VarChar(100)
  email      String?  @unique @db.VarChar(100)
  firstname  String?  @db.VarChar(50)
  lastname   String?  @db.VarChar(50)
  password   String?  @default("null") @db.VarChar(150)
  provider   String?  @default("credentials")
  oauth_id   String?  @default("0")
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  @@map("users")
}
```

6. the last step is migrate the prisma into postgres
```bash
npx prisma migrate dev --name <migration-name>
```

7. Running The Project
```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the project.


## ⚙️<a href="techologies-used">Technologies Used</a>

- **Next.js**: A React framework for server-rendered applications.
- **TypeScript**: A statically typed superset of JavaScript that enhances code reliability and maintainability.
- **Prisma**: ORM for managing SQL-based data storage
- **Postgres**: Reliable and scalable relational database
- **Tailwind CSS**: A utility-first CSS framework for styling the user interface.
- **NextAuth**: A complete authentication solution for Next.js applications.
- **ShadCN**: A library for building user interfaces quickly and efficiently.

## ⭐<a href="features">Features</a>

- **Customizable Authentication**: Fully customizable authentication flow, allowing users to add their own content and modify the authentication process as needed.
- **User Management**
   - Sign Up: Allow users to register an account.
   - Sign In: Enable users to log into their accounts.
   - Delete User: Users can delete their accounts if needed.
   - Update User: Users can update their account details.
- **Focus on Core Application**: By using this project, developers can offload the authentication process and focus on the main objectives of their application.
- **Open Source**: This project is open-source, enabling contributions and adaptations by the developer community.
- **Easy UI Development**: With ShadCN, building and customizing UI components is straightforward, saving development time.
- **Theme Management**: Includes a theme toggle button that allows users to easily switch between light and dark themes, enhancing the user experience.

## 🛠️<a href="customization">Customization</a>

This project is designed to be fully customizable. You can modify the authentication pages, integrate additional providers, or change the data models according to your needs.

**Adding Custom Content**

To add your own content, navigate to the relevant components in the ```/components``` or ```/pages``` directories and modify them as needed. The project is built with modularity in mind, so adding or removing features should be straightforward.

**User Management Customization**

All user management features—sign-up, sign-in, delete user, and update user—are fully customizable. You can modify these features to fit your specific requirements by editing the relevant functions and components.

**Theme Management**

This project is open for contributions. If you have suggestions for improvements or new features, feel free to submit a pull request or open an issue on the GitHub repository.

## 🎊<a href="moral-of-story">Moral of Story</a>

This starter kit is perfect for anyone looking to quickly implement a robust authentication system with a polished UI, theme management, and additional features, while retaining the flexibility to tailor it to their needs.
