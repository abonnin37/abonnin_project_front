import React from "react";

import style from "./change-password.module.scss";
import {Controller, useForm} from "react-hook-form";
import {TextField} from "@material-ui/core";
import {Button} from "../../UI/button/button";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import jwt_decode from "jwt-decode";

const ChangePassword = ({uri, AuthStr}) => {
    const { control, handleSubmit, formState: {isValid}, reset, watch } = useForm({
        mode: "onChange",
        defaultValues: {oldPassword: "", newPassword: "", confirmNewPassword: ""}
    });

    // We add security to ensure the user know his password
    const newPw = watch("newPassword");
    const isSamePassword = (actualConfirmNewPw) => {
        return newPw === actualConfirmNewPw;
    }

    const fetchData = async (data) => {
        return await axios.patch("/api/users/" + uri + "/changePassword", data, {
            headers: {
                Authorization: AuthStr,
                'Content-Type': 'application/merge-patch+json'
            }});
    };

    const onSubmit = (data) => {
        const callFunction= fetchData(data);

        toast.promise(callFunction,
            {
                loading: "En attente ...",
                error: err => {
                    if (err.response.status === 400) {
                        return err.response.data.message;
                    } else {
                        return "Une erreur est survenue, veuillez contacter un administrateur.";
                    }
                },
                success: res => {
                    reset();
                    return "Votre mot de passe a bien été modifié.";

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
    }

    return (
        <div className={style.changePassword}>
            <h2>Changer mon mot de passe</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={style.citationForm}>
                <Controller
                    name="oldPassword"
                    rules={{ required: true }}
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={"Ancien mot de passe"}
                            type={"password"}
                            fullWidth
                            error={fieldState.invalid}
                            helperText={fieldState.invalid ? "Le mot de passe est requis" : null}
                            variant="outlined"
                            required={true}
                            disabled={!uri}
                            {...field}
                        />
                    )}
                />
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
                            disabled={!uri}
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
                            disabled={!uri}
                            {...field}
                        />
                    )}
                />
                <Button disabled={!isValid} type={"submit"}>Sauvegarder</Button>
            </form>
        </div>
    )
}

export default ChangePassword;