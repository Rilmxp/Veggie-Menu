# Veggie Menu

Link to website: https://rilmxp-veggie-menu.netlify.app/

Veggie Menu is a ReactJs single page web application which fetches vegeterian recipes and their contents on demand.
Users can register and save their favorite recipes on their own account.

Authetication is implemented with firebase authentication services and favorite recipes with firestore database.
HTTP requests for recipes are made to Spoonacular API at https://spoonacular.com/food-api

## Description

The website consists of five different routes to components that represent "pages":

1. Home: On page load, five random recipes will be fetched and displayed. Users can search for vegeterian recipes by using the searchbox.
2. Login: Login form where users can access their personal account by providing their credentials.
3. Sign Up: Registration form where users can register by providing a username, email and password.
4. SingleRecipe: it displays full recipe information such as description, ingredients, and cooking instructions. Can be accessed by clicking on any recipe card.
5. Account: can be accessed only upon registration. It displays user information, their favorite recipes and a button to cancel their account,
6. Error: displayed whenever the user inserts invalid route information directly on the uri.

## Behavior

### Navbar

- Brand/Logo links to Home.
- Login link to Login Form (if no user is logged-in).
- Username link to users Account page (if user is logged-in)

### Home

On first-time app load, it fetches and displays five different random recipes from Spoonacular's API.

- Carousel with three different links:

  - Local uri to the on-page recipes searchbox
  - Local uri to Login Form
  - Absolute uri to USDA external website

- Searchbox:

  Sends request to the API and returns:

  - Maximum of five available recipes as per user's input

- Filters:

  Recipe results can be filtered by certain criteria. If filters return no recipes, "No recipes match the selected filters".

  - Maximun number of calories:

    - Input type number in steps of 100 and up to 1000. The following feedback will be provided:
      - if number greater than 1000: "Maximun value 1000".
      - if number lower than 100: "Minimum value 100".
      - if number outside of steps of 100 (150 for example): "Please insert a number in steps of 100"

  - Special diets:

    - Input type checkbox for "Vegan", "Gluten Free" and "Dairy Free"

- Recipes section:

  All recipes will be displayed in this section:

  - If there are no recipes, the following feedback messages will be shown:

    - In case of an error: "Recipes data currently unavailable. Please try again later."
    - If no recipes found as per user's searchbox input: "No recipes available with those parameters"

  - Recipe Cards:

    - A default image has been provided with "Recipe not available" message in case no image will be given back from the api

    - Heart icon to add/remove recipe to/from favorites:

      - "Login required" feedback if user not logged in. Filled/empty heart otherwise.

    - Arrow icon to flip the card:

      - Front: recipe title and description
      - Back: recipe ingredients.

    - Clicking outside those icons will redirect the user to the full recipe page

### Single Recipe:

- Description: button "show less"/"show more" text has been implemented.

- Recipe stats: like vegan, very-cheap, very healthy, sustainable, amog others. This section will be shown only if any recipe stats are available.

- Ingredients: Full ingredient information that consists of "amount", "metric-unit" and "ingredient" (eg. {100} {grms} {flour}), will be provided. In case of error in one of those pieces of data, that specific one will be replaced by "amount/unit/ingredient not availabe".

- Cooking instructions: consists of a step number and the step itself (the instruction), (eg {1} {boil water}). If step number not available. Only the instruction will be displayed. If instruction (step), not available, "Step instructions not available

### Sign Up and LogIn

- Feedback will be given below each field whose input is proved to be invalid

- upon registration, the user will be automatically logged in and redirected to the account page.

- registration errors:

  - if email already exists: "Email already registered. Try another one".

- login errors:

  - if invalid email (user does not exist): "Invalid user. Try again."
  - if wrong password: "Wrong password. Try again."

- Feedback will be given if registration or login is rejected by firebase. Eg. "Email already registered. Try another one." when signing up or "Wrong password. Try again" when loging in, among others.

- For the username field, on the the Sign Up page, a regex pattern has been set to avoid sending an empty string to the database and therefore guarantee the user will indeed have a name.

### Account

Only registered users can access the account page. A protected router has been implemented to guarantee so. They will be otherwise redirected to the login page.

The page consist of a dynamic welcome message, a table with the user's account information with a delete account button, and a container with filters and favorite recipes.

- Delete account button:

  - A pop-up modal will open requesting information
  - Upon confirmation, user's favorite recipes will be removed from firestore database and ONLY after success, the user account will be deleted from firebase authentication. This prevents that the database will keep data from a user that does not exist anymore.
  - If any of those deletions fail, the following feedback message will be shown "User not deleted. Try again later"
  - Firebase might request a recent login to be made to proceed to deletion of the account. In this case "Recent login is required" error message will be displayed.
  - Otherwise, data will be deleted from both services and user will be redirected to the login page.

  - Recipes container:
    - Displays only user's favorite recipes.
    - if user has no favorites, "No favorite recipes yet" message will be displayed instead.

### Error page

- Whenever the user manually inserts invalid data on the uri, he/her will be redirected to the error page which consists of a background picture (the same used as default for the recipe cards), and a button to go back to home.

### Notes:

- any other unexpected error will displayed "Internal Error. Try again later"

## Technologies / libraries / external resources

- ReactJs:

  - Application created with create-react-app command

  - Both recipes and users state management has been implemented globally with Redux. Other minor states like the one for the forms has been managed locally.

  - All components can be found inside the "features" folder with the exception of page components which are located in their dedicated folder named "pages".

  - Features folders have been divided in different categories to reduce "cluttering". Each folder has an index.js which import and exports in only one place all the components inside that specific feature.

  - context folder contains all redux files.

  - database folder contains both firebase authentication files and firestore files.

  - styles folder contains minimum common configuration sass files as most styles have been managed with css modules

  - helpes.js file contains useful configuration and functions used throughtout the app like axios base parameters for async calls, data handler to format the response from the api and other necessary string formatting functions.

  - environment variables have been managed with an .env file at root level.

- Redux

- Axios:

  - Used for HTTP requests

- Bootstra and React Bootstrap

- Responsiveness:
  html responsive images for carousel
  /////////////////////////////////////////////////////////////

## IMPORTANT NOTE FOR NETLIFY: To make the router work on Netlify you must create a redirects file inside the public folder of the app with the following contnet /\* /index.html 200 See React Projects hotel-resort

## For README:

    - resets at 01:00 am.
    - Makes one call with all the necessary information since it is needed to display and filter recipes on homepage.
    - ingredients for example wheat flour measures in mll or even water in "servings" but that is the information passed from the API. Same regarding chicken or other meat broths which are vegetarian but treated as such by the api.
