import React, {useState} from "react";

import style from "./article-form.module.scss";
import {useForm, Controller} from "react-hook-form";
import {TextareaAutosize, TextField} from "@material-ui/core";
import clsx from "clsx";
import {toast} from "react-hot-toast";
import axios from "../../../axios";

const ArticleForm = ({addArticle, editArticle, article}) => {
    const defaultValues = {
        user: "/api/users/2",
        title: "",
        summary: "",
        content: "",
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
        mode: "onChange",
        defaultValues: article ?? defaultValues,
    });

    const onSubmit = (data) => {
        if (article) {
            axios.put("/api/posts/" + article.id, data)
                .then(response => {
                    editArticle(response.data);
                    toast.success("Vous avez édité le post !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                })
        } else {
            axios.post("/api/posts", data)
                .then(response => {
                    addArticle(response.data);
                    reset();
                    toast.success("Vous avez créé un post !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.articleForm}>
            <Controller
                name="user"
                rules={{ required: true }}
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        label={"Utilisateur"}
                        error={fieldState.invalid}
                        helperText={fieldState.invalid ? "L'utilisateur est requis" : null}
                        variant="outlined"
                        required={true}
                        {...field}
                    />
                )}
            />
            <Controller
                name="title"
                rules={{require: true}}
                control={control}
                render={({ field, fieldState }) => (
                        <TextField
                            label={"Titre"}
                            error={fieldState.invalid}
                            helperText={fieldState.invalid ? "Le titre est requis" : null}
                            variant="outlined"
                            required={true}
                            {...field}
                        />
                    )}
            />
            <Controller
                name="summary"
                rules={{ required: true }}
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        label={"Résumé"}
                        error={fieldState.invalid}
                        helperText={fieldState.invalid ? "Le résumé est requis" : null}
                        variant="outlined"
                        required={true}
                        rows={4}
                        {...field}
                    />
                )}
            />
            <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Contenu de l'article ..."
                        label={"Contenu"}
                        variant="outlined"
                        {...field}/>
                )}
            />
            <button type={"submit"} disabled={!isValid} className={clsx({[style.disabled]: !isValid})}>Envoyer</button>
        </form>
    )
}

export default ArticleForm;