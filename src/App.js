import React, {Fragment} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/MainPage/main-page";
import Header from "./components/Layout/header/header";
import Blog from "./components/Blog/blog";
import AdminBlog from "./admin/Blog/admin-blog";
import Footer from "./components/Layout/footer/footer";
import NotFound from "./components/Layout/not-found/not-found";
import {Toaster} from "react-hot-toast";
import ArticleDetail from "./components/Blog/article-detail/article-detail";

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
                    <Route path="/blog/:id">
                        <ArticleDetail />
                    </Route>
                    <Route path="/blog">
                        <Blog />
                    </Route>
                    <Route path="/adminBlog">
                        <AdminBlog />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </main>
            <Footer />
            <Toaster
                position={"bottom-center"}
                gutter={15}
                toastOptions={{
                    duration: 5000,
                    success: {
                        style: {
                            border: '1px solid green'
                        }
                    },
                    error: {
                        style: {
                            border: '1px solid red',
                        }
                    }
                }}
            />

        </Fragment>
    );
}

export default App;