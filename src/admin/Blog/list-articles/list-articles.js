import React, {useContext, useState} from "react";

import style from "./list-articles.module.scss";
import Edit from "../../../assets/edit.svg";
import Delete from "../../../assets/trash.svg";
import {CircularProgress} from "@material-ui/core";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import AuthContext from "../../../store/auth-context";

const ListArticles = ({articleList, setIsEditing, removeArticle, addArticle, isAwaitingRefresh}) => {
    const {token} = useContext(AuthContext);
    const AuthStr = "Bearer ".concat(token);

    const onDeleteHandler = (article) => {
        removeArticle(article);
        // We send the request
        axios({
            method: "delete",
            url: '/api/posts/'+article.id,
            headers: {
                "Authorization": AuthStr
            }
        })
            .then((response) => {
                if (response.status === 204) {
                    toast.success("L'article à bien été supprimé !")
                } else {
                    toast.error("Une erreur est survenue, veuillez contacter un administrateur.");
                }
            })
            .catch((error) => {
                toast.error(error.response.data["hydra:description"]);
                addArticle(article, true);
            });
    }

    return (
        <div className={style.listArticles}>
            <h1>Liste des articles</h1>
            <table>
                <tbody>
                <tr>
                    <th>Titre du post</th>
                    <th>Actions</th>
                </tr>
                { articleList &&
                articleList.map((article) =>
                    <tr key={"article-"+article.id}>
                        <td className={style.title}>{article.title}</td>
                        <td className={style.actions}>
                            <div>
                                <Edit onClick={() => setIsEditing(article.id)}/>
                            </div>
                            <div className={style.delete} onClick={() => onDeleteHandler(article)}>
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

export default ListArticles;