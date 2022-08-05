# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# Questionbox

This application is a question and answer platform, similar to Stack Overflow. It does _not_ have to be themed to code-related questions, though. Theming and design is up to you.

You will likely not be able to do ALL of the listed requirements. That is OK. Decide what the core functionality is and what you can wait to implement once you have the basics done.

### Back-end: The API

Backend devs will build an API using Django and Django REST Framework that allows users to create questions and answers to questions. Question-askers can mark an answer as accepted. Logged-in users can "star" or favorite a question or answer. Your application only needs to serve JSON, not HTML.

You will need to make a list of your endpoints available to the front-end devs on your team.

#### Requirements

- Allow an authenticated user to create a question (allowing for long-form text).
- Allow an authenticated user to create an answer to a question (one question can have many answers).
- Allow unauthenticated users to view all questions and answers.
- Have registration and token-based authentication.
- Allow a user to get a list of all the questions they have posted.
- Allow a user to get a list of all the answers they have posted.
- Allow the original author of the question to mark an answer as accepted.
- Questions cannot be edited once they have been asked (_note_: allowing editing of unanswered questions is listed as an extra challenge).
- A question can be deleted by its author, whether answered or unanswered. If it is deleted, all associated answers should also be deleted.
- Users can search the database by supplying a search term. This should use [Django's PostgreSQL full-text search](https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/search/).
  - At minimum allow a search in the text of a question.
  - A more comprehensive search would allow searching both questions and answers.
- Authenticated users can "star" or favorite questions or answers they like. They should also be able to un-star anything that they have starred.
- Deploy to Heroku.

### 🌶️ Spicy features

- Add tags to questions and allow search by tags
- Allow a user to upload a profile photo.
  - for Heroku, you'll need to configure a storage backend like Amazon S3 in order to upload files.
- Allow an unanswered question to be edited.
- Allow the author of an answer to delete or edit an answer.

### Back-end development notes

You should use [djoser](https://djoser.readthedocs.io/en/latest/) and [token-based authentication](https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication) to handle registration and login.

### CORS

CORS (Cross-Origin Resource Sharing) headers must be added to your responses for the front-end app to interact with your API. [Read this blog post to find out how to set up CORS](https://www.techiediaries.com/django-cors/). You will want to use django-cors-headers (the second option mentioned in the blog post) and set `CORS_ALLOW_ALL_ORIGINS = True`.

## Front-End: The React application

The front-end team will build a React application that will send AJAX requests to the QuestionBox API.

This application is a question and answer platform, similar to Stack Overflow in format, but you can theme it and design it however you like. This application should allow logged-in users to ask questions, give and receive answers, and mark an answer as accepted. Users that are not logged in should still be able to view questions and answers, but cannot ask questions, give answers, or mark answers as accepted.

### Requirements

- Users can create an account.
- Users can log in.
- Authenticated users can ask a question.
  - A question cannot be edited.
  - A user can delete their own question.
- Authenticated users can answer a question.
- Authenticated users can choose an accepted answer among the answers to one of their questions.
- Authenticated users have a profile page that lists all their questions and answers.
- Authenticated users can "star" a question or answer they like.
  - Allow a user to "unstar" something they have previously starred.
- You will have to route some URLs.
  - Login and registration should each have a URL, or one for both if they are in the same view.
  - Questions should have their own route.
  - User profiles should have their own route.
  - If implementing pagination, you will likely use routes to implement this.
- Deploy to Netlify

### 🌶️ Spicy features

Most of these are dependent on whether the API supports these capabilities.

- Allow users to search the API using a search term.
  - If your API supports tags, allow search by tags.
- The list of questions that comes back from the API may be paginated. If so, you should implement pagination in your application.
- Allow questions to be edited if they have not been answered.
- Allow users to show only the questions and/or answers they have starred.
- Allow users to follow/unfollow each other.
- Allow users to upload a profile photo.

### Front-end Development notes

During development, you will want to be able to make requests before the API is complete. You can handle this in a few ways.

One way is to make functions or methods for all your API calls, but instead of having them actually make the calls at first, have them set the data you are expecting without actually making an API call. Another way is to use the provided exported mock API specification for Mockoon, a tool that will run a mock server for you. In this case, you will want to be able to switch which server you use based on the environment your code is running in.

You can [read more about approaches to building your front-end before the API is done in this dev.to article](https://dev.to/momentum/how-to-build-a-front-end-app-before-you-have-an-api-3ai3).

If you need to switch how you access your data based on environment, read [this article on create-react-app-environments](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d).

You can work with a back-end dev to get the back-end API running on your local machine, but you do not have to.
