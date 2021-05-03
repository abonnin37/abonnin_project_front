import React, {Component} from "react";
import "./App.css";
import {hot} from "react-hot-loader/root";

class App extends  Component {
    render() {
        return(
            <div className="App">
                <h1> Hello, World! Coucou toi </h1>
            </div>
        );
    }
}

export default hot(App);