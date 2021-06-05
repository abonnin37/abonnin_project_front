import React, {useState} from "react";

import style from "./list-projects.module.scss";
import Edit from "../../../../assets/edit.svg";
import Delete from "../../../../assets/trash.svg";
import axios from "../../../../axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";

const ListProjects = ({listProjects}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAwaiting, setIsAwaiting] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const onDeleteHandler = (id) => {
        // We send the request
        setIsAwaiting(true);
        axios({
            method: "delete",
            url: '/projects/'+id,
        })
            .then((response) => {
                setIsAwaiting(false);
                setOpenSnackbar(true);
                if (response.status === 204) {
                    setIsSuccess(true);
                } else {
                    setIsSuccess(false);
                }
            })
            .catch((error) => {
                console.log("error");
                setOpenSnackbar(true);
                setIsSuccess(false);
            });
    }

    return (
        <div className={style.listProjects}>
            <h1>Liste des projets</h1>
            <table>
                <tr>
                    <th>Nom du projet</th>
                    <th>Actions { isAwaiting && <CircularProgress size={15} className={style.circularProgress}/>}</th>
                </tr>
                { listProjects.length > 0 &&
                    listProjects.map((project) =>
                        <tr key={project.id}>
                            <td className={style.name}>{project.name}</td>
                            <td className={style.actions}>
                                <div>
                                    <Edit />
                                </div>
                                <div className={style.delete} onClick={() => onDeleteHandler(project.id)}>
                                    <Delete />
                                </div>
                            </td>
                        </tr>
                    )
                }
            </table>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleClose}>
                { isSuccess ?
                    <Alert onClose={handleClose} severity="success">
                        Le projet à bien été supprimé !
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">
                        Une erreur s'est produite, veuillez contacter un administrateur.
                    </Alert>
                }
            </Snackbar>
        </div>
    )
}

export default ListProjects;