import React, {Fragment} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/MainPage/main-page";
import Header from "./components/Layout/header/header";
import Blog from "./components/Blog/blog";
import Footer from "./components/Layout/footer/footer";

function App() {
    return(
        <Fragment>
            <Header />
            <main>
                <Switch>
                    <Route path="/blog">
                        <Blog />
                    </Route>
                    <Route path="/acceuil" exact={true}>
                        <MainPage />
                    </Route>
                    <Redirect from="/" to="/acceuil" />
                </Switch>
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;