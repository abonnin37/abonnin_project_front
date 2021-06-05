import React, {useState} from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from "./add-project.module.scss";
import useForm from "../../../../hooks/form/useForm";
import {addProjectForm} from "../../../../utils/form/formConfig";
import axios from "../../../../axios";
import clsx from "clsx";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddProject = () => {
    const { renderFormInputs, isFormValid } = useForm(addProjectForm);
    const FORM_ID = "addProjectForm";
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAwaiting, setIsAwaiting] = useState(false);

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        // We prepare the information to send
        const requestObj = {
            name: event.target[0].value,
            excerpt: event.target[1].value,
            description: event.target[2].value,
            url: event.target[3].value,
            images: [],
            technologies: [],
            user: "/api/users/" + event.target[4].value,
            beginAt: new Date(event.target[5].value),
            endAt: new Date(event.target[6].value),
        }

        // We send the request
        setIsAwaiting(true);
        axios({
            method: "post",
            url: '/projects',
            data: requestObj
        })
            .then((response) => {
                setIsAwaiting(false);
                setOpenSnackbar(true);
                if (response.status === 201) {
                    setIsSuccess(true);
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
      <div className={style.addProject}>
          <h1>Créer un projet</h1>
          <form id={FORM_ID} onSubmit={formSubmissionHandler} className={style.addForm}>
              <div className={style.formControl}>
                  {renderFormInputs(FORM_ID)}
              </div>
              <div className={style.formActions}>
                  <button className={disabledClasses} disabled={!isFormValid()}>Créer un projet {isAwaiting && <CircularProgress size={15} className={style.circularProgress}/>}</button>
              </div>
          </form>
          <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
              { isSuccess ?
                  <Alert onClose={handleClose} severity="success">
                      Le projet à bien été créé !
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

export default AddProject;