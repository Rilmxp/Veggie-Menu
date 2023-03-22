# PROJECT NOTES

resets at 01:00 am.

- first 570px

- folder structure: https://alexmngn.medium.com/how-to-better-organize-your-react-applications-2fd3ea1920f1
  https://www.taniarascia.com/react-architecture-directory-structure/

- redux firebase: https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit

- firebase: https://firebase.google.com/docs/auth/web/start#web-version-9_1

## Homepage

carousel with welcome message, maybe link to https://www.webmd.com/about-webmd-policies/default.htm website (what's a healthy diet without a healthy lifestyle? Boost up your health with knowledge at webmd.com. another one.Or instead invite to login to save your recipes.

## Recipe page

## Login page

responsiveness of login, signup, account.
fix rerouting when user reloads page and not at home (it goes blank).

## Favorites page:

- when login. ask database for favorite recipes for use and populate

fireStore:

- collection users => document user.uid
- collection favoriteRecipes => document recipe.id

- click on heart:

  - look for recipe.id

  // add recipe to favorites

  - const recipeReference = doc(firestore, "users/user.uid/favoriteRecipes/recipe.id");
  - async function addUserFavoriteRecipe() {
    const docData = {
    // all properties of recipe.id
    recipe.id
    };
    try {
    await setDoc(userFavoriteRecipes, docData);
    console.log("write to database");
    update user slice user.favoriteRecipes
    } catch (error) {
    console.log("error", error);
    }
    }

  List of selected recipes

## IMPORTANT NOTE FOR NETLIFY: To make the router work on Netlify you must crate a redirects file inside the public folder of the app with the following contnet /\* /index.html 200 See React Projects hotel-resort

## For README:

    - Makes one call with all the necessary information since it is needed to display and filter recipes on homepage.
    - ingredients for example wheat flour measures in mll or even water in "servings" but that is the information passed from the API. Same regarding chicken or other meat broth which are vegetarian but treated as such by the api.
