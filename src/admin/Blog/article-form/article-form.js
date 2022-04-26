import React, {useEffect, useState, Component, useContext} from "react";
import WYSIWYGEditor from "/src/utils/WYSIWYGEditor/WYSIWYGEditor";

import style from "./article-form.module.scss";
import {useForm, Controller} from "react-hook-form";
import { TextField} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone';
import clsx from "clsx";
import {toast} from "react-hot-toast";
import axios from "../../../axios";
import {EditorState} from "draft-js";
import {stateFromHTML} from "draft-js-import-html";
import AuthContext from "../../../store/auth-context";

const ArticleForm = ({addArticle, editArticle, article}) => {
    const [updateImage, setUpdateImage] = useState(!(article && article.imageUrl));
    const [editorWYSIWYGState, setEditorWYSIWYGState] = useState( EditorState.createEmpty());
    const {token} = useContext(AuthContext);
    const AuthStr = "Bearer ".concat(token);

    const defaultValues = {
        user: "/api/users/1",
        title: "",
        summary: "",
        content: "",
        imageFile: null,
        published: false,
    };

    const { control, handleSubmit, formState: {isValid}, reset, setValue } = useForm({
        mode: "onChange",
        defaultValues: article ?? defaultValues,
    });

    // When we select a different article we update the input fields
    useEffect(() => {
        if (article) {
            setValue('user', article.user);
            setValue('title', article.title);
            setValue('summary', article.summary);
            setValue('content', article.content);
            setEditorWYSIWYGState(EditorState.createWithContent(stateFromHTML(article.content)));
        }
    }, [article]);

    const onSubmit = (data) => {
        let formData = new FormData();

        formData.append("imageFile", updateImage ? data.imageFile : null);
        formData.append("user", data.user);
        formData.append("title", data.title);
        formData.append("summary", data.summary);
        formData.append("content", data.content);
        formData.append("published", data.published);

        if (article) {
            axios.post("/api/posts/" + article.id + "?_method=PUT", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": AuthStr
                },
            })
                .then(response => {
                    editArticle(response.data);
                    toast.success("Vous avez édité le post !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                })
        } else {
            axios.post("/api/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": AuthStr
                }
            })
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
            { !updateImage ?
                <div className={style.editImageView}>
                    <div className={style.title}>
                        <h5>Image sélectioné : </h5>
                        <div className={style.actionText} onClick={() => setUpdateImage(true)}>Changer l'image</div>
                    </div>
                    <img src={axios.defaults.baseURL + article.imageUrl} alt=""/>
                </div>
                :
                <>
                    { article && article.imageUrl &&
                        <div className={style.actionText} onClick={() => setUpdateImage(false)}>Annuler</div>
                    }
                    <Controller
                        name="imageFile"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <DropzoneArea
                                filesLimit={1}
                                onChange={(files) => field.onChange(files[0])}
                            />
                        )}
                    />
                </>
            }
            <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                    <WYSIWYGEditor editorState={editorWYSIWYGState} setEditorState={setEditorWYSIWYGState} onChange={field.onChange} name={field.name}/>
                )}
            />
            <button type={"submit"} disabled={!isValid} className={clsx({[style.disabled]: !isValid})}>Envoyer</button>
        </form>
    )
}

export default ArticleForm;