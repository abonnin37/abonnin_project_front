import React, {useEffect, useContext, useCallback, useState} from "react";

import style from "./login.module.scss";
import {Controller, useForm} from "react-hook-form";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import {TextField} from "@material-ui/core";
import {Button} from "../../UI/button/button";
import {Link, useHistory, useLocation} from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AuthContext from "../../../store/auth-context";
import jwt_decode from "jwt-decode";

const Login = () => {
    const {login} = useContext(AuthContext);
    const history = useHistory();
    let location = useLocation();
    const [isVerifyUserEmail, setIsVerifyUserEmail] = useState(false);
    const queryParams = new URLSearchParams(location.search);

    // we do that because we can't call toast in useEffect
    if (isVerifyUserEmail) {
        if (queryParams.get("status") === "201") {
            toast.success(queryParams.get("message"));
        } else if (queryParams.get("status") === "400") {
            toast.error(queryParams.get("message"));
        }
        setIsVerifyUserEmail(false);
    }


    useEffect(() => {
        if (queryParams.get("status")) {
            setIsVerifyUserEmail(true);
        }

        document.getElementsByTagName('header')[0].style.display = "none";
        document.getElementsByTagName('footer')[0].style.display = "none";

        return () => {
            document.getElementsByTagName('header')[0].style.display = "block";
            document.getElementsByTagName('footer')[0].style.display = "grid";
        };
    }, []);

    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
        mode: "onChange",
        defaultValues: {username: "", password: ""}
    });

    const fetchData = async (data) => {
        return await axios.post("/api/login", data);
    };

    const onSubmit = (data) => {
        const callFunction= fetchData(data);

        toast.promise(callFunction, {
            loading: "En attente ...",
            error: err => {
                if (err.response.data.message === "deactivated_account") {
                    return "Consultez votre email, vous devez activer votre compte."
                } else {
                    return "Identifiant non valide."
                }
            },
            success: res => {
                // We get the jwt token data to pass the expiration time to the login fct in milisecond (it come in seconde)
                const decoded_token = jwt_decode(res.data.token);
                login(res.data.token, decoded_token.exp * 1000, decoded_token.roles);
                reset();
                // replace erase the history so that the user can't come back form "acceuil" to "login"
                history.replace("/acceuil", );
                return "Vous êtes connecté !";
            }
        });
    }

    return (
        <div className={style.login}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.loginForm}>
                <Controller
                    name="username"
                    rules={{ required: true }}
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={"Email"}
                            type={"email"}
                            fullWidth
                            error={fieldState.invalid}
                            helperText={fieldState.invalid ? "L'email est requis" : null}
                            variant="outlined"
                            required={true}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="password"
                    rules={{ required: true }}
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={"Mot de passe"}
                            type={"password"}
                            fullWidth
                            error={fieldState.invalid}
                            helperText={fieldState.invalid ? "Le mot de passe est requis" : null}
                            variant="outlined"
                            required={true}
                            {...field}
                        />
                    )}
                />
                <Button disabled={!isValid} type={"submit"}>Connexion</Button>
                <div className={style.resetPasswordLinkGroup}>
                    <h5>Mot de passe oublié ?</h5>
                    <Link to={"/reset-password-ask"}><ArrowForwardIcon /> Réinitialiser le mot de passe</Link>
                </div>
                <div className={style.signinLinkGroup}>
                    <h5>Vous n'avez pas de compte ?</h5>
                    <Link to={"/signin"}><ArrowForwardIcon /> Inscrivez-vous</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;