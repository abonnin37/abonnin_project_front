import React, {Fragment, useContext} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/MainPage/main-page";
import Header from "./components/Layout/header/header";
import Blog from "./components/Blog/blog";
import AdminBlog from "./admin/Blog/admin-blog";
import Footer from "./components/Layout/footer/footer";
import NotFound from "./components/Layout/not-found/not-found";
import {Toaster} from "react-hot-toast";
import ArticleDetail from "./components/Blog/article-detail/article-detail";
import AdminProjects from "./admin/MainPage/projects/admin-projects";
import AdminCitations from "./admin/MainPage/citations/admin-citations";
import Login from "./components/auth/login/login";
import {AuthWrapper} from "./components/auth/shared/auth-wrapper/auth-wrapper";
import Signin from "./components/auth/signin/signin";
import AuthContext from "./store/auth-context";
import Profile from "./components/auth/profile/profile";
import ResetPasswordAsk from "./components/auth/reset-password-ask/reset-password-ask";
import ResetPassword from "./components/auth/reset-password/reset-password";

function App() {
    const {isLoggedIn, isAdmin} = useContext(AuthContext);
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
                    { isLoggedIn && isAdmin &&
                        <Route path="/adminMainPage">
                            <AdminProjects />
                            <AdminCitations />
                        </Route>
                    }
                    <Route path="/blog/:id">
                        <ArticleDetail />
                    </Route>
                    <Route path="/blog">
                        <Blog />
                    </Route>
                    { isLoggedIn && isAdmin &&
                        <Route path="/adminBlog">
                            <AdminBlog />
                        </Route>
                    }
                    { !isLoggedIn &&
                        <Route path="/login">
                            <AuthWrapper title={"Connexion"}>
                                <Login />
                            </AuthWrapper>
                        </Route>
                    }
                    { !isLoggedIn &&
                        <Route path="/signin">
                            <AuthWrapper title={"Inscription"}>
                                <Signin />
                            </AuthWrapper>
                        </Route>
                    }
                    { !isLoggedIn && <>
                            <Route path="/reset-password-ask">
                                <AuthWrapper title={"Réinitialiser le mot de passe"}>
                                    <ResetPasswordAsk />
                                </AuthWrapper>
                            </Route>
                            <Route path="/reset-password">
                                <AuthWrapper title={"Réinitialiser le mot de passe"}>
                                    <ResetPassword />
                                </AuthWrapper>
                            </Route>
                        </>
                    }
                    { isLoggedIn &&
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    }
                    <Route path='*'>
                        <Redirect to="/acceuil" />
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