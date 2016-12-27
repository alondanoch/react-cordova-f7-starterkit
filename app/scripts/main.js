import React from 'react';
import Router from 'react-router';
import ReactDOM from 'react-dom';
import routes from './routes';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
//var injectTapEventPlugin = require("react-tap-event-plugin");
//injectTapEventPlugin();

Router.run(routes, Router.HashLocation, (Handler, state) => {
    ReactDOM.render(<Handler location={state.path}/>, document.getElementById("appContainer"))
});