import React, {useContext, useEffect, useState} from "react";

import style from "./profile.module.scss";
import {Controller, useForm} from "react-hook-form";
import * as dayjs from "dayjs";
import {TextField} from "@material-ui/core";
import {Button} from "../../UI/button/button";
import axios from "../../../axios";
import AuthContext from "../../../store/auth-context";
import {toast} from "react-hot-toast";
import ChangePassword from "../change-password/change-password";
import jwt_decode from "jwt-decode";

const Profile = () => {
    const [uri, setUri] = useState("");
    const {token} = useContext(AuthContext);
    const AuthStr = "Bearer ".concat(token);

    const defaultValues = {
        email: "",
        firstName: "",
        lastName: "",
    };

    const { control, handleSubmit, formState: {isValid}, setValue } = useForm({
        mode: "onChange",
        defaultValues: defaultValues,
    });

    const fetchData = async (data) => {
        return await axios.patch("/api/users/" + uri, data, {
            headers: {
                Authorization: AuthStr,
                'Content-Type': 'application/merge-patch+json'
            }});
    };

    const save = (data) => {
        const callFunction= fetchData(data);

        toast.promise(callFunction, {
            loading: "En attente ...",
            error: err => {
                return err.response.data["hydra:description"];
            },
            success: res => {
                return "Vos informations ont bien été modifiées";
            }
        });
    }

    useEffect(() => {
        axios.get("/api/me", {
            headers: {
                Authorization: AuthStr,
            }
        }).then(response => {
            setValue('email', response.data.email);
            if (response.data.first_name) {
                setValue('firstName', response.data.first_name);
            }
            if (response.data.last_name) {
                setValue('lastName', response.data.last_name);
            }
            setUri(response.data.id);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className={style.profile}>
            <h1>Mon profil</h1>
            <div className={style.profileContainer}>
                <div className={style.userInfo}>
                    <h2>Modifier mes informations</h2>
                    <form onSubmit={handleSubmit(save)} className={style.citationForm}>
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
                                    disabled
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label={"Prénom"}
                                    variant="outlined"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label={"Nom"}
                                    variant="outlined"
                                    {...field}
                                />
                            )}
                        />
                        <Button disabled={!isValid} type={"submit"}>Sauvegarder</Button>
                    </form>
                </div>
                <div className={style.changePasswordContainer}>
                    <ChangePassword AuthStr={AuthStr} uri={uri}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;