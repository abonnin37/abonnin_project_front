import React from 'react';
import {TextareaAutosize, TextField} from "@material-ui/core";
import {useForm, Controller} from "react-hook-form";
import clsx from "clsx";

import style from "./contact.module.scss";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import {Button} from "../../UI/button/button";

const Contact = () => {
    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        subject: "",
        message:"",
    };

    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
        mode: "onChange",
        defaultValues: defaultValues,
    });

    const onSubmit = (data) => {
        axios.post("/api/contact_mails/send", data)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Votre mail à bien été envoyé !");
                    reset();
                } else {
                    toast.error("Il y a eu un problème lors de l'envoie de votre mail");
                }
            })
            .catch(err => {
                let errorMessage = "";
                if (err.response.data["hydra:description"]) {
                    errorMessage = err.response.data["hydra:description"];
                } else {
                    errorMessage = err.response.data.message;
                }

                toast.error(errorMessage, {
                    style: {
                        whiteSpace: "pre-line"
                    }
                });
            })
    }

    return (
        <div className={style.contact}>
            <div className={style.contactContainer}>
                <h5>Salut, je m'appelle Alexandre.</h5>
                <h1>Contacte moi !</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={style.contactForm}>
                    <Controller
                        name="firstName"
                        rules={{ required: true }}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label={"Prénom"}
                                error={fieldState.invalid}
                                helperText={fieldState.invalid ? "Le prénom est requis" : null}
                                variant="outlined"
                                required={true}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        rules={{ required: true }}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label={"Nom"}
                                error={fieldState.invalid}
                                helperText={fieldState.invalid ? "Le nom est requis" : null}
                                variant="outlined"
                                required={true}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        rules={{ required: true }}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label={"Email"}
                                type={"email"}
                                error={fieldState.invalid}
                                helperText={fieldState.invalid ? "L'email est requis" : null}
                                variant="outlined"
                                required={true}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="company"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label={"Entreprise"}
                                variant="outlined"
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="subject"
                        rules={{ required: true }}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label={"Sujet"}
                                error={fieldState.invalid}
                                helperText={fieldState.invalid ? "Le sujet est requis" : null}
                                variant="outlined"
                                required={true}
                                className={style.subject}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="message"
                        rules={{require: true}}
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Message *"
                                label={"Message"}
                                variant="outlined"
                                required={true}
                                {...field}/>
                        )}
                    />
                    <Button disabled={!isValid} type={"submit"}>Envoyer</Button>
                </form>
                <p className={style.requiredText}>* champs requis.</p>
            </div>
        </div>
    );
}

export default Contact;