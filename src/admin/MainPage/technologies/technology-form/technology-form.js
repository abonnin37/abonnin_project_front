import React, {useEffect, useState} from "react";

import style from "./technology-form.module.scss";
import {useForm, Controller} from "react-hook-form";
import {TextareaAutosize, TextField} from "@material-ui/core";
import clsx from "clsx";
import {toast} from "react-hot-toast";
import axios from "../../../../axios";

const TechnologyForm = ({addTechnology, editTechnology, technology}) => {

    const { control, handleSubmit, formState: {isValid}, reset, setValue } = useForm({
        mode: "onChange",
        defaultValues: {name: "", projects: []}
    });

    // When we select a different technology we update the input fields
    useEffect(() => {
        let input_projects = "";

        if (technology && technology.projects) {

            for (let i = 0; i < technology.projects.length ; i++) {
                input_projects += technology.projects[i];

                if (i < technology.projects.length-1) {
                    input_projects += ",\n";
                }
            }
        }

        if (technology) {
            setValue('name', technology.name);
            setValue('projects', input_projects);
        }
    }, [technology]);

    const onSubmit = (data) => {
        let projectsToSend = data.projects.replace(/\r?\n|\r|\s/g, "").split(",");

        if (!projectsToSend || projectsToSend[0] === "") {
            projectsToSend = [];
        }

        if(technology) {
            axios.put("/api/technologies/" + technology.id, {...data, projects: projectsToSend})
                .then(response => {
                    editTechnology(response.data);
                    toast.success("Vous avez édité la technologie !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                });
        } else {
            axios.post("/api/technologies", {...data, projects: projectsToSend})
                .then(response => {
                    addTechnology(response.data);
                    reset();
                    toast.success("Vous avez créé une technologie !");
                })
                .catch(err => {
                    toast.error(err.response.data["hydra:description"]);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.technologyForm}>
            <Controller
                name="name"
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
                name="projects"
                control={control}
                render={({ field, fieldState }) => (
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder={"Liste des projets ..."}
                        label={"Projets"}
                        variant="outlined"
                        {...field}/>
                )}
            />
            <button type={"submit"} disabled={!isValid} className={clsx({[style.disabled]: !isValid})}>Envoyer</button>
        </form>
    )
}

export default TechnologyForm;