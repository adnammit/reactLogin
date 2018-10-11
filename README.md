# WEB APPLICATION WITH REACT AND REDUX

Based on the web [tutorial series](https://www.youtube.com/playlist?list=PLuNEz8XtB51K-x3bwCC9uNM_cxXaiCcRY) by Rem Zolotykh.


## START WITH:
Lesson 15


#### To Run:
```
$ npm run server
```

#### To Stop (on Windows):
```
Ctrl-c
$ taskkill /F /IM node.exe
```

### HELPFUL RESOURCES:
* [webpack configuration guide](https://webpack.js.org/configuration/)
* don't forget that you can use the react and redux extensions in dev tools to examine the composition and state of your react components
    - the redux extension will help debug what's going on with reducers and track state changes
* need a [refresher on psql](https://www.tutorialspoint.com/postgresql/)?

### VOCAB AND CONCEPTS
* **bcrypt**: never store passwords on a server, so use bcrypt to encrypt the password
* **deconstruction**



# PROJECT NOTES:

## APPLICATION OVERVIEW:
* our login application consists of the main app layout component, nav bar, greeting and signup form, the display of which is controlled by routing.
* **validation**:
    - both client- and server-side
    - in `SignupForm::onSubmit()` we use the check to `isValid()` which calls our validation func right there on the client side. if we didn't validate there, it would happen when we call `userSignupRequest()` which makes a server call (where validation takes place again)
    - we also added onBlur validation which can conflict with the client/server validation, so if the onBlur validation fails, disable the Submit button so the client/server validation is inaccessible
* **reducers** are simple functions which take state and an action and return a state
    - keep reducers small and simple
    - we use the `combineReducers` helper from redux to combine and manage all of our reducers as one state object


## TOOLS AND SETUP:

### PACKAGE.JSON
* `scripts: nodemon` watches the server directory for changes and refreshes its execution of `babel-node`
    - `nodemon` is handling the filename `index.js`, not `babel-node`, hence the '--'
    - webpack will take care of the client directory

### WEBPACK CONFIG
* webpack can take any file (`path: '/'`) because middleware serves from memory (rather than saving a file like 'bundle.js')
* `devtool: 'eval-source-map'` provides more information while debugging making it easier to track down errors
* webpack doesn't know anything about js (or other languages) so the `rules` array tells webpack how to handle certain kinds of files
    - `test` certain file extensions
    - `include` only from a certain directory
    - `loader` using the appropriate loader
* `entry` must be an array as it is used both to serve up the client directory but also it is used by the express middleware
* plugins:
    - `HotModuleReplacementPlugin`: most important
    - `NoEmitOnErrorsPlugin`: cleaner errors


### REDUX
* we will use redux for store management and actions
* actions
    - Redux takes care of dispatching actions based on events
    - our components just call functions with data passed in w/out needing to know what's going on
* we don't need to store anything in global Redux store for now -- we just need actions
* `connect` is a high-order component needed to connect redux actions with React components (?)
    - connect takes two params:
        * map state to props: provides some piece of data from Store (takes state and returns object)
        * map page to props: specify your action here (userSignupRequest)
    - shorcut definition is to create it as an object `{ userSignupRequest }`
    - `FlashMessagesList` is connected because it will need information from the Store

### POSTGRES, KNEX AND BOOKSHELF
* `knex` is a SQL query builder with a promise interface. you'll need postgres or MySQL to use it
* init a db for this project and `npm install --save pg` for the postgres driver
* install `knex` both locally (`--save`) and globally
* from your repo's dir, do `knex init` which just creates a config file at root level. modify it by copy/pasting the 'staging' block contents into 'development' since we're using postgres. Change info to your db's settings and leave password as a blank string
* now you're ready to get going:
    - `$ knex migrate:make users` - create a migration: generates a 'migrations' folder with a users.js file inside
    - inside the `migrations/*users.js` file, define your promise functions to create the table schema and drop it
    - now that your promises are defined, run `$ knex migrate:latest`
    - run just `$ knex` to view commands
* we'll use `bookshelf` to save the user into the database. bookshelf works on top of knex
    - `npm install --save bookshelf`
    - make `/server/bookshelf.js` and initialize bookshelf
    - import knex and the knexConfig file
    - use those imports to initialize bookshelf with knex and the development section from config
* in `/routes/users.js` where we do our validation, if `isValid` we create our user
    - we get our User shape from `/server/models/user.js`
    - deconstruct the request body and generate the encrypted password_digest using `bcrypt`
    - `User.forge()` creates our user
        * `hasTimestamps` populates timestamps with current date
        * `save()` returns a promise, so handle it here
    save returns a promise, so
* create `models` by importing not the bookshelf package itself but the initialization of bookshelf (`/server/bookshelf.js`)
* check that everything worked by going back to psql on the Command Line and running
    `# select * from users` - you should see your users. success!

#### BABELRC
* babel does the transpiling of ES6 code
* babel doesn't understand react by default, so add that in there too

#### INDEX.HTML
* the script src is 'bundle.js' but there's no such file in our project. that's because the file is dynamically generated by webpack and served up to the browser

#### INDEX.JS (SERVER)
* define the interface between our express server and our entry point ('index.html')
* configuring webpack
    - we use the webpack config file from our root dir by importing the file and creating `const compiler`
    - then we add configuration specifically for webpackMiddleware with our `app.use()` statements
    - 'noInfo' reduces noise from webpack
* hot middleware is needed for using express

#### INDEX.JS (CLIENT)
* here is where we render the components that will go into 'bundle.js'
* introducing routes:
    - rather than loading the `App` component, we will use `Router` to show different content based on different conditions (are we logged in or out?)
    - your router needs `browserHistory`
    - the routes themselves are saved in a separate file ('routes.js')
* the `Router` component will be wrapped in `Provider` -- our basic Redux store
* Redux `store` and `Provider`:
    - `Provider`
    - `store` is a more broad Redux construct
        * initialized with the `createStore` function from Redux which takes several params:
            - root reducer: a function which takes state and action and returns a new state
            - second param is optional initial state
            - third param is applyMiddleware (provided by Redux)
* `thunk` middleware from Redux allows us to dispatch asynchronous actions

#### APP.JS
* _your top component must be a class component rather than a functional component_
    ```javascript
    // CLASS COMPONENT:
    class App extends React.Component {
        render() {
            return (
                <h1>Hello Mars!</h1>
            );    
        }
    }
    export default App;
    // VERSUS THE FUNCTIONAL:
    export default () => {
        return (
            <h1>Greetings, Venus!</h1>
        );
    }
    ```
* because our app uses several different components as 'top' components depending on routing, all of our router components need to be classes (App, Greetings, SignupPage)


#### ROUTES.JS
* your route requires two props:
    - the path
    - the component being rendered
* `IndexRoute` is like a default root route -- "when nothing else is specified, display this"



#### SIGNUPFORM
* this handles all the higher-level stuff that is separate from the form itself
* our form will need state and needs to be a class component
* onSubmit:
    - will be defined separately in `actions/`
    - will be imported by `SignupPage` and passed to `SignupForm` via props


#### SIGNUPPAGE
* the actual form
* use `lodash/map` function to create a key/value mapping of timezones
* `onChange` function is intentionally generic so it can be used with any of the fields
* `SignupPage` is passed in `userSignupRequest` which comes from Redux thunk, but we need to use `connect` to get it


#### SIGNUPACTIONS
* `return dispatch` - our promise


#### SERVER/USERS
* here is where we will validate our user data and handle errors using `Validator`
* note that `Validator.isNull()` is deprectated -- use `Validator.isEmpty()` or `lodash.isEmpty()`
* if Valid, we create a user -- how?
    - we import our `bookshelf` definition of a User here
    - we pass all the props of our user to `User.forge().save()` which returns a promise.

Quick updates : - with React now you can use the tag ref="username" then you can access the element with this.refs.username so you can just setState onSubmit this.refs.username.value. - with ES6/2015 you are not always forced to bind the context, you can instead use the arrow function so the context of the function is automatically the one where the function is called!
Ex: onChange={ this.onChange.bind(this) }
becomes
onChange={ (ev) => this.onChange(ev) }﻿


## TO DO:
* routes don't actually live in the routes file -- make it so
* reverted axios to an older version (0.12.0) - update for newer axios version
* why do some of our import variables go inside brackets and others don't?
* perhaps deprecated use of contextTypes in SignupForm -- rework
