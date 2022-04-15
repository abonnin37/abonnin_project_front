import React, {useEffect, useContext, useCallback, useState} from "react";

import style from "./reset-password-ask.module.scss";
import {Controller, useForm} from "react-hook-form";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import {TextField} from "@material-ui/core";
import {Button} from "../../UI/button/button";
import {Link} from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const ResetPasswordAsk = () => {
    useEffect(() => {
        document.getElementsByTagName('header')[0].style.display = "none";
        document.getElementsByTagName('footer')[0].style.display = "none";

        return () => {
            document.getElementsByTagName('header')[0].style.display = "block";
            document.getElementsByTagName('footer')[0].style.display = "grid";
        };
    }, []);

    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
        mode: "onChange",
        defaultValues: {email: ""}
    });

    const fetchData = async (data) => {
        return await axios.post("/api/resetPassword", data);
    };

    const onSubmit = (data) => {
        const callFunction= fetchData(data);

        toast.promise(callFunction,
            {
                loading: "En attente ...",
                error: err => {
                    console.log(err.response);
                    if (err.response.status === 500) {
                        return "Une erreur est survenue, veuillez contacter un administrateur.";
                    }
                    return err.response.data.message;
                },
                success: res => {
                    return "Un email vous a été envoyé pour réinitialiser votre mot de passe.";

                }
            }
        );
        reset();
    }

    return (
        <div className={style.resetPasswordAsk}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.resetPasswordAskForm}>
                <Controller
                    name="email"
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

export default ResetPasswordAsk;