import React, {Fragment} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/MainPage/main-page";
import Header from "./components/Layout/header/header";
import Blog from "./components/Blog/blog";
import Footer from "./components/Layout/footer/footer";
import NotFound from "./components/Layout/not-found/not-found";

function App() {
    return(
        <Fragment>
            <Header />
            <main>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to="/acceuil" />
                    </Route>
                    <Route path="/acceuil">
                        <MainPage />
                    </Route>
                    <Route path="/blog">
                        <Blog />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;