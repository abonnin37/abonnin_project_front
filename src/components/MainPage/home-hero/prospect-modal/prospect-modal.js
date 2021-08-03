import React from "react";

import style from "./prospect-modal.module.scss";
import {Controller, useForm} from "react-hook-form";
import axios from "../../../../axios";
import {toast} from "react-hot-toast";
import {TextField} from "@material-ui/core";
import clsx from "clsx";

const ProspectModal = ({handleCloseModal}) => {
    const defaultValues = {
        email: "",
    };

    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
        mode: "onChange",
        defaultValues: defaultValues,
    });

    const onSubmit = (data) => {
        axios.post("/api/prospect_mails/send", data)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Le document vous a bien été envoyé !");
                    reset();
                    handleCloseModal();
                } else {
                    toast.error("Il y a eu un problème lors de l'envoie du document");
                }
            })
            .catch(err => {
                toast.error(err.response.data["hydra:description"]);
            })
    }

    return (
        <div className={style.prospectModal}>
            <div className={style.formContainer}>
                <h2>Le document sera envoyé à votre email</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={style.contactForm}>
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
                    <button type={"submit"} disabled={!isValid} className={clsx({[style.disabled]: !isValid})}>Envoyer</button>
                </form>
            </div>

            <div className={style.close} onClick={handleCloseModal}>
                <div className={style.circle}/>
                <div className={style.cross1} />
                <div className={style.cross2} />
            </div>
        </div>
    );
}

export default ProspectModal;