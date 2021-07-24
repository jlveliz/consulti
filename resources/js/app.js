/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 import React from "react";
 import ReactDOM from "react-dom";
 import { BrowserRouter, Route, Switch } from "react-router-dom";

 import Home from "./components/Home";
 import Login from "./components/Login";
 import MakeComment from "./components/MakeComment";


 // any CSS you import will output into a single css file (app.css in this case)
 import 'bootstrap/dist/css/bootstrap.min.css';
//  import "./styles/app.css";

 // start the Stimulus application
 import "./bootstrap";

 ReactDOM.render(

   <BrowserRouter>
     <Switch>
       <Route exact path="/">
         <Login />
       </Route>
       <Route path="/home" otherwise="/">
         <Home />
       </Route>
       <Route path="/crear-comentario" otherwise="/">
         <MakeComment />
       </Route>
     </Switch>
   </BrowserRouter>,
   document.getElementById("example")
 );
