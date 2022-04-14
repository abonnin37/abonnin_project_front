import React, {useEffect, useRef, useState} from "react"
import useForm from "../../../../hooks/form/useForm";
import {addProjectForm} from "../../../../utils/form/formConfig";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';

import style from "./project-form.module.scss";
import axios from "../../../../axios";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProjectForm = ({refreshList, isEditing, project}) => {
    const { renderFormInputs, isFormValid, setInputValue } = useForm(addProjectForm);
    const FORM_ID = "addProjectForm";
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAwaiting, setIsAwaiting] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setInputValue("name", project.name);
            setInputValue("excerpt", project.excerpt);
            setInputValue("description", project.description);
            setInputValue("url", project.url);
            setInputValue("user", project.user);
            setInputValue("beginat", dayjs(project.beginAt).locale('fr').format("YYYY-MM-DD"));
            setInputValue("endat", dayjs(project.endAt).locale('fr').format("YYYY-MM-DD"));
        } else {
            setInputValue("name", "");
            setInputValue("excerpt", "");
            setInputValue("description", "");
            setInputValue("url", "");
            setInputValue("user", "");
            setInputValue("beginat", "");
            setInputValue("endat", "");
        }
    }, [project]);

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        // We prepare the information to send
        const requestObj = {
            name: event.target[0].value,
            excerpt: event.target[1].value,
            description: event.target[2].value,
            url: event.target[3].value,
            images: project ? project.images : [],
            technologies: project ? project.technologies : [],
            user: event.target[4].value,
            beginAt: new Date(event.target[5].value),
            endAt: new Date(event.target[6].value),
        }

        // We send the request
        setIsAwaiting(true);
        axios({
            method: isEditing ? "put" : "post",
            url: isEditing ? "/api/projects/"+project.id : "/api/projects",
            data: requestObj,
        })
            .then((response) => {
                setIsAwaiting(false);
                setOpenSnackbar(true);
                if (response.status === 201 || response.status === 200) {
                    setIsSuccess(true);
                    refreshList();
                } else {
                    setIsSuccess(false);
                }
            })
            .catch((error) => {
                setOpenSnackbar(true);
                setIsSuccess(false);
            });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const disabledClasses = clsx({
        [style.disabled]: !isFormValid()
    });

    return (
        <div className={style.projectForm}>
            <form id={FORM_ID} onSubmit={formSubmissionHandler} className={style.form}>
                <div className={style.formControl}>
                    {renderFormInputs(FORM_ID)}
                </div>
                <div className={style.formActions}>
                    <button className={disabledClasses} disabled={!isFormValid()}>
                        { !isEditing ?
                            "Créer un projet"
                            :
                            "Éditer le projet"
                        }
                        {isAwaiting && <CircularProgress size={15} className={style.circularProgress}/>}
                    </button>
                </div>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
                { isSuccess ?
                    <Alert onClose={handleClose} severity="success">
                        { !isEditing ?
                            "Le projet à bien été créé !"
                            :
                            "Le projet à bien été édité !"
                        }
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">
                        Une erreur s'est produite, veuillez contacter un administrateur.
                    </Alert>
                }
            </Snackbar>
        </div>
    );
}

export default ProjectForm;