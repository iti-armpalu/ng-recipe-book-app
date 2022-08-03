Section 9 - Authentication

- Generate a nw component - AuthComponent - and add HTML to the page - done
- Include the path in app-routing.module.ts and in header.component.html - done
- Switch betwee authentication modes (login and sign up) - done
- Handle form innput via template-driven form - done
- At Firebase database, set read and write ruls to "auth != null", so only authenticated users can see the recipes - done
- Set up Firebase authentication, click on setup sign-in mthod and choose email/password - done

- Prepare Signup request:
  - Set up auth.service.ts - done
  - Follow Firebase Auth REST API, and set up a post request inside auth.service.ts (add your project's API key) - done
  - Add request body payload according to Firebase - done
  - Add response payload according to Firebase - done

- Send Signup request:
  - Include AuthService into auth.component.ts, so that Signup request can be called upon onSubmit() - done
  - Call AuthService signup and pass email and password which were extracted from the input values - done
  - Subscribe to the response to get the response data if the authentication was successful - done
  - Add a loading spinner and Signup error handlinng logic to the Auth Component - done
  - Improve error handling, and move error handlig to the auth.service.ts via pipe catchError and throwError oprators  - done

- Send Login request:
  - Follow Firebase Auth REST API, and set up a post request inside auth.service.ts (add your project's API key) to setup login request - done
  - Add request body payload according to Firebase - done
  - Add response payload according to Firebase - done
  - Add Login error handling logic to the Auth Component - done

- Create user.model.ts file that will store all the core data of the user and that helps us validate user's token - done
- Navigate the user and update Header Component based on authentication status - done
- Add the token to outgoing requests (fetch data and store data) - done
- Add the token to outgoing requests with an Interceptor, add auth.interceptor.service.ts to the Auth folder - done
- Add Logout request, and navigate the user back to the /auth route when logged out - done
- Add Auto-Login (store the token in a persistent storage, so that the token is not generated with evry page reload)
- Add Auto-Logout, so that if a user doesn't log out, we set a timer that automatically sets the user to null - done
- Add an Auth Guard to authenticate routes only authenticated user ca access, and navigate them away if they are not authenticated - done
