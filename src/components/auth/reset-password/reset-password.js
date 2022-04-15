import React, {useEffect, useContext, useCallback, useState} from "react";

import style from "./reset-password.module.scss";
import {Controller, useForm} from "react-hook-form";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import {TextField} from "@material-ui/core";
import {Button} from "../../UI/button/button";
import {Link, useHistory} from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const ResetPassword = () => {
    const history = useHistory();
    const queryParams = new URLSearchParams(location.search);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (queryParams.get("id") && queryParams.get("token")) {
            setUserId(queryParams.get("id"));
            setToken(queryParams.get("token"));
        }

        document.getElementsByTagName('header')[0].style.display = "none";
        document.getElementsByTagName('footer')[0].style.display = "none";

        return () => {
            document.getElementsByTagName('header')[0].style.display = "block";
            document.getElementsByTagName('footer')[0].style.display = "grid";
        };
    }, []);

    const { control, handleSubmit, formState: {isValid}, reset, watch } = useForm({
        mode: "onChange",
        defaultValues: {newPassword: "", confirmNewPassword: ""}
    });

    // We add security to ensure the user know his password
    const newPw = watch("newPassword");
    const isSamePassword = (actualConfirmNewPw) => {
        return newPw === actualConfirmNewPw;
    }

    const fetchData = async (data) => {
        return await axios.patch("/api/users/"+ userId +"/resetPassword", data, {
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }});
    };

    const onSubmit = (data) => {
        data = {...data, token: token};

        const callFunction= fetchData(data);

        toast.promise(callFunction,
            {
                loading: "En attente ...",
                error: err => {
                    if (err.response.status === 400) {
                        return err.response.data.message;
                    }
                    if (err.response.status === 404) {
                        return "L'utilisateur n'existe pas.";
                    }
                    return "Une erreur est survenue, veuillez contacter un administrateur.";
                },
                success: res => {
                    history.replace("/login", );
                    return "Le mot de passe à été mis à jour.";
                }
            },
            {
                error: {
                    style: {
                        whiteSpace: "pre-line"
                    }
                }
            }
        );

        reset();
    }

    return (
        <div className={style.resetPassword}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.resetPasswordForm}>
                <Controller
                    name="newPassword"
                    rules={{ required: true }}
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={"Nouveau mot de passe"}
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
                <Controller
                    name="confirmNewPassword"
                    rules={{
                        required: true,
                        validate: (value) => isSamePassword(value)
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={"Répéter le nouveau mot de passe"}
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
                <Button disabled={!isValid} type={"submit"}>Envoyer</Button>
                <div className={style.loginLinkGroup}>
                    <h5>Vous avez déjà un compte ?</h5>
                    <Link to={"/login"}><ArrowForwardIcon /> Connectez-vous</Link>
                </div>
                <div className={style.signinLinkGroup}>
                    <h5>Vous n'avez pas de compte ?</h5>
                    <Link to={"/signin"}><ArrowForwardIcon /> Inscrivez-vous</Link>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;