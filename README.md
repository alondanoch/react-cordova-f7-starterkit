# React-Cordova-F7 Starterkit

React-Cordova Starterkit provides a prepared fest development environment for creating mobile hybrid application using react and framework7.

React-Cordova Starterkit does all-at-once compilation both for web and cordova, runs a liveload  web server, and creats an apk.

the Starterkit is based on [react-f7-starterkit](https://github.com/dburdick/react-f7-starterkit.git) using [gulp](https://github.com/gulpjs/gulp), [stylus](https://github.com/LearnBoost/stylus) and [webpack](https://github.com/webpack/webpack). 
The internal data flow is handled with  [Reflux](https://github.com/spoike/refluxjs) and the routing is managed with the [React-Router](https://github.com/rackt/react-router). 
The UI is handled by [Framework7](http://www.idangero.us/framework7). This is just a slight addition to [react-starterkit](https://github.com/wbkd/react-starterkit). 

## Installation

Install all dependencies. 

```
$ npm install
```

Install gulp. 

```
$ npm install -g gulp
```

Install Cordova 

```
$ npm install -g cordova
```
make sure to install Java & Android sdk (assuming you are developing for android), otherwise cordova build won't work.
best way to install Android sdk is with the [android studio](https://developer.android.com/studio/install.html). once the sdk is installed, remember to set the `ANDROID_HOME` environment variable.


## Development

Builds the application and starts a webserver with livereload. By default the webserver starts at port 3000.
You can define a port with `$ gulp --port 8080`.

```
$ gulp
```

then go to `http://localhost:3000/` add see the application running.

## Build

Builds a minified version of the application in the dist folder for WEB, and copying the files to the cordova folder for building an apk.

```
$ gulp build --type production
```

Build and Create the cordova apk:

```
$ gulp buildCordova
```

## Testing

We use [jest](http://facebook.github.io/jest/) to test our application.<br />
You can run the tests that are defined under [app/scripts/\_\_tests__](./app/scripts/__tests__) with

```
$ npm test
```

In order to test files that are using the react-router we had to add [stubRouterContext.jsx](./test-utils/stubRouterContext.jsx) which we found [here](https://github.com/rackt/react-router/blob/master/docs/guides/testing.md). 

## Javascript

Javascript entry file: `app/scripts/main.js` <br />

**Reflux**

We are using Reflux, which is an implemantion of the [Flux Architecture](http://facebook.github.io/flux/docs/overview.html). If you want to read more about Reflux, check out the readme of the [reflux git repo](https://github.com/spoike/refluxjs). 

**React-Router**

The routing is done with the [react-router](https://github.com/rackt/react-router). It's especially great for SPA's. We would recommend to read the [guide](https://github.com/rackt/react-router/blob/master/docs/guides/overview.md) to get an overview of the router features.

**ES6 with babel**

We are working with the webpack [babel loader](https://github.com/babel/babel-loader) in order to load our .js/.jsx files. Babel allows you to use ES6 features like class, arrow functions and [much more](https://babeljs.io/docs/compare/).



## CSS

CSS entry file: `app/stylus/main.styl`<br />

**Stylus**

As you can see we are using stylus to preprocess our .styl files. If you didn't work with a css preprocessor before the [stylus page](http://learnboost.github.io/stylus/) is a good starting point to get to know what stylus can do for you.<br /><br />
If you want to use third-party CSS you just include it via `@import 'path/to/your/third-party-styles.css'` at the top of the main.styl file.


## Webpack Hints

You can find the webpack configuration in the [webpack.config.js file](./webpack.config.js).
We use the babel-loader in order to load .jsx and .js files via webpack. If it's possible install all your dependencies with NPM. Packages installed with NPM can be used like this:

```language-javascript

var moduleXYZ = require('moduleXYZ');

```
You can find all loaders in this [list](http://webpack.github.io/docs/list-of-loaders.html).


###Requirements
* node
* npm
* cordova
* gulp
