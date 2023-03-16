# PROJECT NOTES

resets at 01:00 am.

- first 570px

- folder structure: https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1

- redux firebase: https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit

- firebase: https://firebase.google.com/docs/auth/web/start#web-version-9_1

## Homepage

carousel with welcome message, maybe link to https://www.webmd.com/about-webmd-policies/default.htm website (what's a healthy diet without a healthy lifestyle? Boost up your health with knowledge at webmd.com. another one.Or instead invite to login to save your recipes.

## Recipe page

## Login page

account layout
make sure you cannot access account page if not logged in see private account page and firebase observer
responsiveness of login, signup, account.
need to fix default image, set it to undefined for testing (try on img height:100%, width:100% for the cards and on the recipe page, adding position:relative to the message "recipe image not available")

## Favorites page:

    List of selected recipes

## IMPORTANT NOTE FOR NETLIFY: To make the router work on Netlify you must crate a redirects file inside the public folder of the app with the following contnet /\* /index.html 200 See React Projects hotel-resort

## For README:

    - Makes one call with all the necessary information since it is needed to display and filter recipes on homepage.
    - ingredients for example wheat flour measures in mll or even water in "servings" but that is the information passed from the API
