import React, {Component} from "react";

import MainPage from "./components/MainPage/main-page";

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