import React, {Fragment, useContext} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MainPage from "./components/MainPage/main-page";
import Header from "./components/Layout/header/header";
import Blog from "./components/Blog/blog";
import AdminBlog from "./admin/Blog/admin-blog";
import Footer from "./components/Layout/footer/footer";
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

/*
    Only Route or Redirect are valid children of the Switch component.
    The React fragments are being returned and messing with the route matching.
    Source : https://stackoverflow.com/questions/66922799/conditional-routes-not-working-in-react-router
 */

function App() {
    const {isLoggedIn, isAdmin} = useContext(AuthContext);
    return(
        <Fragment>
            <Header />
            <main>
                <Switch>
                    <Route path="/acceuil">
                        <MainPage />
                    </Route>
                    <Route path='/' exact>
                        <Redirect to="/acceuil" />
                    </Route>

                    {/* If the user is logged in */}
                    {isLoggedIn &&
                        <Route path="/profile">
                            <Profile />
                        </Route>
                    }
                    {isLoggedIn &&
                        <Route path="/blog/:id">
                            <ArticleDetail />
                        </Route>
                    }
                    {isLoggedIn &&
                        <Route path="/blog">
                            <Blog />
                        </Route>
                    }

                    {/* If the user is logged in and is an administrator */}
                    { isLoggedIn && isAdmin &&
                        <Route path="/adminMainPage">
                            <AdminProjects />
                            <AdminCitations />
                        </Route>
                    }
                    { isLoggedIn && isAdmin &&
                        <Route path="/adminBlog">
                            <AdminBlog />
                        </Route>
                    }

                    {/* Only if the user is not logged in */}
                    {!isLoggedIn &&
                        <Route path="/login">
                            <AuthWrapper title={"Connexion"}>
                                <Login />
                            </AuthWrapper>
                        </Route>
                    }
                    {!isLoggedIn &&
                        <Route path="/signin">
                            <AuthWrapper title={"Inscription"}>
                                <Signin />
                            </AuthWrapper>
                        </Route>
                    }
                    {!isLoggedIn &&
                        <Route path="/reset-password-ask">
                            <AuthWrapper title={"Réinitialiser le mot de passe"}>
                                <ResetPasswordAsk />
                            </AuthWrapper>
                        </Route>
                    }
                    {!isLoggedIn &&
                        <Route path="/reset-password">
                            <AuthWrapper title={"Réinitialiser le mot de passe"}>
                                <ResetPassword />
                            </AuthWrapper>
                        </Route>
                    }

                    {/* If a route is unknown */}
                    <Redirect to="/acceuil" />
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