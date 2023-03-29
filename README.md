# PROJECT NOTES

resets at 01:00 am.

- first 570px

- folder structure: https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1
  https://www.taniarascia.com/react-architecture-directory-structure/

- redux firebase: https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit

- firebase: https://firebase.google.com/docs/auth/web/start#web-version-9_1

## Homepage

## Recipe page

## Login/sigup/account page

responsiveness of login, signup, account.

## Favorites page:

- fix screen size when open forms on mobile
  https://stackoverflow.com/questions/39585950/mobile-keyboard-changes-html-viewport-size

## IMPORTANT NOTE FOR NETLIFY: To make the router work on Netlify you must crate a redirects file inside the public folder of the app with the following contnet /\* /index.html 200 See React Projects hotel-resort

## For README:

    - Makes one call with all the necessary information since it is needed to display and filter recipes on homepage.
    - ingredients for example wheat flour measures in mll or even water in "servings" but that is the information passed from the API. Same regarding chicken or other meat broth which are vegetarian but treated as such by the api.
    - Event the pagenotfound content has been placed inside the layout folder since it doesn't change in any way.
