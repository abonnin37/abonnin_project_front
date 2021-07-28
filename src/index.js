import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DayjsUtils from "@date-io/dayjs";

import './theme.scss';

ReactDOM.render(
    <BrowserRouter>
        <MuiPickersUtilsProvider utils={DayjsUtils} >
            <App />
        </MuiPickersUtilsProvider>
    </BrowserRouter>,
    document.getElementById("root")
);