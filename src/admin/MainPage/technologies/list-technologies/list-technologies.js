import React, {useState} from "react";
import axios from "../../../../axios";

import style from "./list-technologies.module.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import Edit from "../../../../assets/edit.svg";
import Delete from "../../../../assets/trash.svg";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import {toast} from "react-hot-toast";

const ListTechnologies = ({listTechnologies, setIsEditing, removeTechnology, addTechnology, isAwaitingRefresh}) => {
    const onDeleteHandler = (technology) => {
        removeTechnology(technology);
        // We send the request
        axios({
            method: "delete",
            url: '/api/technologies/'+technology.id,
        })
            .then((response) => {
                if (response.status === 204) {
                    toast.success("La technologie à bien été supprimé !")
                } else {
                    toast.error("Une erreur est survenue, veuillez contacter un administrateur.");
                }
            })
            .catch((error) => {
                toast.error(error.response.data["hydra:description"]);
                addTechnology(technology, true);
            });
    }

    return (
        <div className={style.listTechnologies}>
            <h1>Liste des technologies</h1>
            <table>
                <tbody>
                <tr>
                    <th>Nom de la technologie</th>
                    <th>Actions</th>
                </tr>
                { listTechnologies &&
                    listTechnologies.map((technology, index) =>
                        <tr key={`technology-${index}`}>
                            <td className={style.name}>{technology.name}</td>
                            <td className={style.actions}>
                                <div>
                                    <Edit onClick={() => setIsEditing(technology.id)}/>
                                </div>
                                <div className={style.delete} onClick={() => onDeleteHandler(technology)}>
                                    <Delete />
                                </div>
                            </td>
                        </tr>
                    )
                }
                { isAwaitingRefresh &&
                    <tr>
                        <td className={style.circularProgressTd}>
                            <CircularProgress size={15} className={style.circularProgress}/>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListTechnologies;