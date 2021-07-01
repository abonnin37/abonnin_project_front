import React from "react";

import style from "./edit-article.module.scss";
import ArticleForm from "../article-form/article-form";
import ChevronLeft from "../../../assets/images/chevron-left.svg";

const EditArticle = ({editArticle, article, setIsEditing}) => {
    return (
        <div className={style.editArticle}>
            <div className={style.header}>
                <h2>Editer un article</h2>
                <div className={style.return} onClick={() => setIsEditing(null)}>
                    <ChevronLeft /> <p>Retour</p>
                </div>
            </div>
            <ArticleForm editArticle={editArticle} article={article}/>
        </div>
    );
}

export default EditArticle;