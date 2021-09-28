import React from "react";
import {Controller, useForm} from "react-hook-form";
import {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import {TextField} from "@material-ui/core";
import {Button} from "../../UI/button/button";
import CheckIcon from '@material-ui/icons/Check';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import style from "./signin.module.scss";

const Signin = () => {
    const history = useHistory();

    useEffect(() => {
        document.getElementsByTagName('header')[0].style.display = "none";
        document.getElementsByTagName('footer')[0].style.display = "none";

        return () => {
            document.getElementsByTagName('header')[0].style.display = "block";
            document.getElementsByTagName('footer')[0].style.display = "block";
        };
    }, []);

    const { control, handleSubmit, formState: {isValid}, reset, setValue, watch } = useForm({
        mode: "onChange",
        defaultValues: {email: "", password: "", confirmPassword: ""}
    });

    // We add security to ensure the user know his password
    const actualPw = watch("password");
    const isSamePassword = (actualConfirmPw) => {
        return actualPw === actualConfirmPw;
    }

    const onSubmit = (data) => {
        axios.post("/api/users", data)
            .then(response => {
                if (response.status === 201) {
                    reset();
                    toast.success(response.data.message);
                    history.push("/login");
                }
            })
            .catch(err => {
                toast.error(err.response.data.message, {
                    style: {
                        whiteSpace: "pre-line"
                    }
                });
            });
    }

    const handleRgpdClick = (value) => {
        setValue("rgpd", value);
    }

    return (
        <div className={style.signin}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.signinForm}>
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
                <Controller
                    name="confirmPassword"
                    rules={{
                        required: true,
                        validate: (value) => isSamePassword(value)
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            label={"Confirmer le mot de passe"}
                            type={"password"}
                            fullWidth
                            error={fieldState.invalid}
                            helperText={fieldState.invalid ? "Le mot de passe doit être le même" : null}
                            variant="outlined"
                            required={true}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="rgpd"
                    control={control}
                    defaultValue={false}
                    render={({field}) => (
                            <div className={style.inputCheckbox} onClick={() => handleRgpdClick(!field.value)}>
                                <div className={style.checkbox} {...field}>
                                    { field.value &&
                                        <CheckIcon />
                                    }
                                </div>
                                <label >J’accepte les conditions d'utilisation</label>
                            </div>
                    )}
                />
                <Button disabled={!isValid} type={"submit"}>Inscription</Button>
                <div className={style.loginLinkGroup}>
                    <h5>Vous avez déjà un compte ?</h5>
                    <Link to={"/login"}><ArrowForwardIcon /> Connectez-vous</Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;