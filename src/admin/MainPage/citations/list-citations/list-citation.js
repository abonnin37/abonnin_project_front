import React, {useState} from "react";

import style from "./list-citations.module.scss";
import Edit from "../../../../assets/edit.svg";
import Delete from "../../../../assets/trash.svg";
import {CircularProgress} from "@material-ui/core";
import axios from "../../../../axios";
import {toast} from "react-hot-toast";
import * as dayjs from "dayjs";

const ListCitations = ({citationList, setIsEditing, removeCitation, addCitation, isAwaitingRefresh}) => {

    const onDeleteHandler = (citation) => {
        removeCitation(citation);
        // We send the request
        axios({
            method: "delete",
            url: '/api/citations/'+citation.id,
        })
            .then((response) => {
                if (response.status === 204) {
                    toast.success("La citation à bien été supprimé !")
                } else {
                    toast.error("Une erreur est survenue, veuillez contacter un administrateur.");
                }
            })
            .catch((error) => {
                toast.error(error.response.data["hydra:description"]);
                addCitation(citation, true);
            });
    }

    return (
        <div className={style.listCitations}>
            <h1>Liste des citations</h1>
            <table>
                <tbody>
                <tr>
                    <th>Auteur</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                </tr>
                { citationList &&
                citationList.map((citation) =>
                    <tr key={citation.id}>
                        <td className={style.auteur}>{citation.firstName} {citation.lastName}</td>
                        <td className={style.createdAt}>{dayjs(citation.createdAt).locale('fr').format("DD MMMM YYYY")}</td>
                        <td className={style.actions}>
                            <div>
                                <Edit onClick={() => setIsEditing(citation.id)}/>
                            </div>
                            <div className={style.delete} onClick={() => onDeleteHandler(citation)}>
                                <Delete />
                            </div>
                        </td>
                    </tr>
                )
                }
                { isAwaitingRefresh &&
                <tr>
                    <td>
                        <CircularProgress size={15} className={style.circularProgress}/>
                    </td>
                </tr>
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListCitations;