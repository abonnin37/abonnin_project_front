import React, {useEffect} from "react";

import style from "./citation-form.module.scss";
import {useForm, Controller} from "react-hook-form";
import {TextareaAutosize, TextField} from "@material-ui/core";
import clsx from "clsx";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {toast} from "react-hot-toast";
import axios from "../../../../axios";
import * as dayjs from "dayjs";

const CitationForm = ({addCitation, editCitation, citation}) => {
    const defaultValues = {
        user: "/api/users/10",
        firstName: "",
        lastName: "",
        position: "",
        company: "",
        createdAt: dayjs(),
    };

    const { control, handleSubmit, formState: {isValid}, reset, setValue } = useForm({
        mode: "onChange",
        defaultValues: citation ?? defaultValues,
    });

    // When we select a different citation we update the input fields
    useEffect(() => {
        if (citation) {
            setValue('user', citation.user);
            setValue('firstName', citation.firstName);
            setValue('lastName', citation.lastName);
            setValue('position', citation.position);
            setValue('company', citation.company);
            setValue('createdAt', citation.createdAt);
            setValue('content', citation.content)
        }
    }, [citation]);

    const onSubmit = (data) => {
        if(citation) {
            axios.put("/api/citations/" + citation.id, data)
                .then(response => {
                    editCitation(response.data);
                    toast.success("Vous avez édité la citation !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                });
        } else {
            axios.post("/api/citations", data)
                .then(response => {
                    addCitation(response.data);
                    reset();
                    toast.success("Vous avez créé une citation !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.citationForm}>
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
                name={"createdAt"}
                rules={{ required: true }}
                control={control}
                render={({field}) => (
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        format="DD/MM/YYYY"
                        label={"Date de création"}
                        InputAdornmentProps={{ position: "end" }}
                        required
                        className={style.datePicker}
                        onChange={field.onChange}
                        name={field.name}
                        value={field.value}
                        onBlur={field.onBlur}
                    />
                )}
            />
            <Controller
                name="firstName"
                rules={{require: true}}
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
                rules={{require: true}}
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
                name="position"
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        label={"Poste"}
                        variant="outlined"
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
                name="content"
                rules={{require: true}}
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Contenu de la citation ..."
                        label={"Contenu"}
                        variant="outlined"
                        required={true}
                        {...field}/>
                )}
            />
            <button type={"submit"} disabled={!isValid} className={clsx({[style.disabled]: !isValid})}>Envoyer</button>
        </form>
    )
}

export default CitationForm;