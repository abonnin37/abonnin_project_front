import React, {useEffect, useState} from "react";

import style from "./technology-form.module.scss";
import {useForm, Controller} from "react-hook-form";
import {TextareaAutosize, TextField} from "@material-ui/core";
import clsx from "clsx";
import {toast} from "react-hot-toast";
import axios from "../../../../axios";

const TechnologyForm = ({addTechnology, editTechnology, technology}) => {
    const [inputProjects, setInputProjects] = useState("");
    const defaultValues = {
        name: "",
        projects: [],
    };

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
        setInputProjects(input_projects);
    }, [technology, setInputProjects]);

    const { control, handleSubmit, formState: {isValid}, reset } = useForm({
        mode: "onChange",
        defaultValues: technology ? {name: technology.name, projects: inputProjects} : defaultValues,
    });

    const onSubmit = (data) => {
        const projectsToSend = data.projects.split(",");

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
                        placeholder={inputProjects ?? "Liste des projets ..."}
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