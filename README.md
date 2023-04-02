# Veggie Menu

**Link to website:** https://rilmxp-veggie-menu.netlify.app/

Veggie Menu is a ReactJs single page web application which fetches vegeterian recipes and their contents on demand.
Users can register and save their favorite recipes on their own account.

Users authetication is implemented with firebase authentication services and favorite recipes with firestore database.
HTTP requests for recipes are made to Spoonacular API at https://spoonacular.com/food-api

## Important notes:

- **Spoonacular free version**. The websiste uses a free version of Spoonacular API which allows limited requests. Whenever this limit has been reached, the following message will be displayed: "Recipes data currently unavailable. Please try again later.".
  The limit resets everyday at 01.00 am Central European Time (UTC+1)

- **API imprecise information**. The webiste uses metric units for ingredients. However, the API might sometimes return some solid ingredients in ml and, in other occasions, correctly in grms. On the other hand, chicken and other meat broths which are clearly NOT vegetarian are surprisingly treated as such by the API.

---

</br>

## index of contents

1. [Description](#description)  
2. [Behavior](#behavior)  
    - [Home](#home)
    - [Single Recipe](#single-recipe)
    - [Sign up - Login](#signup-login)
    - [Account](#account)
    - [Error Page](#error-page)
3. [Technologies / libraries / external resources](#technologies)
    - [ReactJs](#react)
    - [Redux](#redux)
    - [Firebase](#firebase)
    - [Axios](#axios)
    - [Css](#css)
    - [Other libraries](#other-libraries)
4. [Responsiveness](#responsiveness)

---

<a name="description"></a>
## Description

The website consists of six different routes to components that represent "pages".

1. **Home**: on app load, five random recipes will be fetched and displayed. Users can search for vegeterian recipes by using the searchbox.

2. **Sign Up**: registration form where users can register by providing a username, email and password.

3. **Login**: login form where registered users can access their personal account by providing their credentials.

4. **Single Recipe**: it displays full recipe information such as description, ingredients and cooking instructions. Can be accessed by clicking on any recipe card.

5. **Account**: can be accessed only upon registration. It displays user information, their favorite recipes and a button to cancel their account.
6. **Error Page**: displayed whenever the user inserts invalid route information directly on the url.

---

</br>


<a name="behavior"></a>
## Behavior

<a name="navbar"></a>
### Navbar

- Brand/Logo link to Home.
- Login link to Login Form if no user is logged-in. Otherwise, logout button
- Username link to users Account page (if user is logged-in)

</br>

<a name="home"></a>
### Home

When app loads for the first time, it fetches and displays five different random recipes from Spoonacular's API.

- **Carousel with three different links.**

  - Local anchor link to the recipes searchbox.
  - Local url to Login Form.
  - Absolute url to USDA external website.

- **Searchbox.**

  Sends request to the API and returns a maximum of five available recipes as per user's input.

- **Filters.**

  Recipe results can be filtered by certain criteria. If filters return no recipes, "No recipes match the selected filters" will be displayed.

  - Maximun number of calories.  
    Input type number in steps of 100 and up to 1000. The following feedback will be provided:

    - if number is greater than 1000: "Maximun value 1000".
    - if number lower than 100: "Minimum value 100".
    - if number outside of steps of 100 (150 for example): "Please insert a number in steps of 100".
      </br> </br>

  - Special diets. Input type checkbox for "Vegan", "Gluten Free" and "Dairy Free"

- **Recipes section.**

  All recipes will be displayed in this section.

  - If there are no recipes, the following feedback messages will be shown:

    - In case of an error: "Recipes data currently unavailable. Please try again later."
    - If no recipes found as per user's searchbox input: "No recipes available with those parameters"
      </br> </br>

  - Recipe Cards:

    - A default image has been provided with "Recipe not available" message in case no image is given back from the API

    - Heart icon to add/remove recipe to/from favorites. "Login required" feedback if user is not logged in. Filled/empty heart otherwise.

    - Arrow icon to flip the card. Its front displays recipe title and description. Its back recipe ingredients.

    - Clicking outside those icons will redirect the user to the full recipe page

</br>

<a name="single-recipe"></a>
### Single Recipe:

- **Description.** Button "show less"/"show more" text has been implemented.

- **Recipe stats.** Like vegan, very-cheap, very healthy, sustainable, amog others. This section will be shown only if any recipe stats are available.

- **Ingredients.** Full ingredient information that consists of "amount", "metric unit" and "ingredient" (eg. {100} {grms} {flour}), will be provided. In case of error in one of those pieces of data, that specific one will be replaced by "amount/unit/ingredient not availabe".

- **Cooking instructions.** They consist of a step number and the step itself, the instruction (eg {1} {boil water}). If step number is not available, only the instruction will be displayed. If instruction (step), is not available, "Step instructions not available" will be shown instead.

</br>

<a name="signup-login"></a>
### Sign Up and Login

- Upon registration, the user will be automatically logged in and redirected to the account page.
- For the username field, on the the Sign Up page, a regex pattern has been set to avoid sending an empty string to the database and therefore guarantee the user will indeed have a name.

- **Feedback**.

  - Below each field whose user's input proves to be invalid.

  - Firebase rejection at registration:

    - if email already exists: "Email already registered. Try another one".

  - Firebase rejection at login:

    - if invalid email(user does not exist): "Invalid user. Try again."
    - if wrong password: "Wrong password. Try again."

</br>

<a name="account"></a>
### Account

Only registered users can access the account page. A protected route has been implemented to guarantee so. They will be otherwise redirected to the login page.

The page consist of a dynamic welcome message, a table with the user's account information and delete account button, and a container with filters and favorite recipes.

- **Delete account button:**

  - A pop-up modal will open requesting confirmation.
  - Upon confirmation, user's favorite recipes will be removed from firestore database and ONLY after its success, the user account will be deleted from firebase authentication records. This prevents that the database will keep data from a user that does not exist anymore.
  - If any of those deletions fail, the following feedback message will be shown: "User not deleted. Try again later"
  - Firebase might request a recent login to be made to proceed to deletion of the account. In this case "Recent login is required" error message will be displayed.
  - Otherwise, data will be deleted from both services and user will be redirected to the login page.

- **Recipes container:**
  - Displays only user's favorite recipes.
  - if user has no favorites, "No favorite recipes yet" message will be displayed instead.

</br>

<a name="error-page"></a>
### Error page

Whenever the user manually inserts invalid data on the url, he/her will be redirected to the error page which consists of a background picture (the same used as default for the recipe cards), and a button to go back to home.

</br>

### Note on error handling

Any other unexpected errors will be displayed as "Internal Error. Try again later"

---

<br>

<a name="technologies"></a>
## Technologies / libraries / external resources

<a name="react"></a>
### ReactJs

- Application created with `create-react-app` command.

- **State management.** Both recipes and user state management has been implemented globally with Redux. Other minor states, like the one for the forms, are managed locally.

- **Components.** They can be found inside the `features` folder with the exception of page components which are located in their dedicated folder named `pages`.

- **Folders and file structure**.

  - `Features` folder has been divided in different categories to reduce clutter. Each folder has an `index.js` which import and exports in only one place all the components from that specific feature. As an example, all input fields and forms components will be found in the the `forms` folder and navbar and footer in the `layout` folder.

  - `context` folder contains all Redux files.

  - `database` folder contains both Firebase authentication and Firestore files.

  - `styles` folder contains minimum common configuration sass files as most styles have been set using css modules.

  - `helpers.js` contains useful configuration and functions used throughtout the app like axios base parameters for async calls, `recipeDataHandler()` to format API's responses and other helpful string formatting functions.

  - Environment variables have been written on an `.env` file at root level.

</br>

<a name="redux"></a>
### Redux

Two slices: recipes, and user.

- `recipesSlice.js:`

  Its core states are:

  - `recipes`: which will be updated as soon as the app loads for the first time and then every time a successful search is carried out. These are the recipes displayed on the screen.
  - `previousRecipes`: will remember recipes so they can be shown back again whenever a search result returns nothing.
  - `filteredRecipes`: will show only recipes that respect filter parameters selected by the user
    </br> </br>

- `userSlice.js`:

  Its core states are:

  - `user`: composed of user id (uid), username, and email.
  - `favoriteRecipes`: which will store user's personal picks.
  - `filteredFavoriteRecipes`: will show only favorite recipes as per selected filter parameters.
  - Unlike `recipesSlice.js`, `userSlice.js` relies heavily on `extraReducers`. This is given to fact that its state depends mostly on the result of asynchronous requests made to Firebase services for both creating/deleting/authenticating the user and retriving/modifying/deleting their favorite recipes.
  - Redux's `createAsyncThunk` functions have been used for the above purpose. For shorter and easier readability, their callback function parameter has been written directly on the firebase files.

</br>

<a name="firebase"></a>
### Firebase services (database)

- `firebaseAuthentication.js`: contains all login/Sign up/delete user logic.

- `firebaseDb`: firestore NoSql database. Contains all firestore logic to manage users favorites. It basically creates/deletes/modifies a `collection/document/collection/document` pattern for `users/userid/favorites/recipeid`.

Notes on all functions can be found directly on the source code.

</br>

<a name="axios"></a>
### Axios

- Used for HTTP requests. Its base configuration can be found in `helpers.js`.

</br>

<a name="css"></a>
### Css/Sass/Css Modules

- Only two sass partials have been created. `_config.scss` for basic global styles, and `_custom-bootstrap` to modify some bootstrap defaults.
- Apart from that, most of the styles have been defined in Css modules next to each related component

</br>

<a name="other-libraries"></a>
### Other libraries

- **React-Icons.** Github, briefcase, filled/empty heart.

- **Lodash.** `._isEmpty` used for data handling of HTTP request responses.

- **Html-react-parser.** To convert an HTML string to react elements (used to format recipe description from API).

- **Nanoid.** To create ids for react lists internal indexing.

- **React-router-dom.** To route to different page-like components.

- **React Bootstrap.** Used for Forms, Carousel and navigation bar.

---

</br>

<a name="responsiveness"></a>
## Responsiveness

- Carousel responsive images using html's <img> srcset attribute.

- the responsive nature of each component has been set directly on their own css module.

- **Responsive elements:** Recipe cards, both its own layout and their position inside their recipe container. Forms from column to rows. Table (users account info) from wide to narrow.
