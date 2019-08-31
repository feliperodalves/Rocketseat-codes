# MeetApp - Rocketseat - Bootcamp - Challenge Project)

This small project consists in an App for manage Meetups using JavaScript (also some html+css for styling)
The goal is to apply the knowledge learned during training promoted by Rocketseat
MeetApp is a complete stack for manage meetups, also some other features:

## Features

- SignUp & SignIn
- Edit Profile (with avatar picture)
- Create / Edit / Delete Meetups
- Subscribe / Unsubscribe in a Meetup

## Technologies

- JavaScript for main language
- NodeJS to handle JS dependencies, debug, tests, build web / mobile application
- Express to create backend server
- MongoDB & Postgres to handle data storing
- Redis to help with tasks
- React & React-Native to create frontend/mobile applications
- Docker to handle the databases & redis instancies

Also, including some libraries & dependencies:

- JWT t handle tokens
- Sequelize / pg / mongoose to handle database connection
- Bee-queue to handle task execution
- Multer to help in file upload
- Nodemailer to send emails

- Axios to handle promises in the backend
- Redux / Sagas to handle dataflow between components / pages
- Styled components for styling (also react-icons, polished)
- Unform (Rocketseat) / Yup to handle forms
- React Router to handle the application route / navigation

Also, for development, Eslint / Prettier / EditorConfig was crucial for styling & factoring the code.

Please, check specific repositories links for:

[(Backend Repository)](./backend/)
[(Front Repository)](./frontend/)
[(Mobile Repository)](./mobile/)

## How-To

This docker-compose file might help with instancies [(here)](./docker-compose.yml)

To run the code you can choose npm or yarn(this was my choice)
You need to enter each folder, and run:

```
  yarn
```

For backend:

```
  yarn dev
```

For tasks

```
  yarn queue
```

For frontend:

```
  yarn start
```

For mobile:

```
  react-native run-android or react-native run-ios
```

To test the backend REST API, you can use Insomnia and use this [(configuration)](./Insomnia Configuration.json)
