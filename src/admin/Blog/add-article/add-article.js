import React from "react";
import ArticleForm from "../article-form/article-form";

import style from "./add-article.module.scss";
import ChevronLeft from "../../../assets/images/chevron-left.svg";

const AddArticle = ({addArticle}) => {
    return (
        <div className={style.addArticle}>
            <div className={style.header}>
                <h2>Créer un article</h2>
            </div>
            <ArticleForm addArticle={addArticle}/>
        </div>
    )
}

export default AddArticle;