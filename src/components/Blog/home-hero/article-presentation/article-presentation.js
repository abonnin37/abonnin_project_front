import React from "react";

import style from "./article-presentation.module.scss";
import {Link} from "react-router-dom";

const ArticlePresentation = () => {
    return (
        <div className={style.articlePresentation}>
            <img className={style.image} src="" alt=""/>
            <div className={style.rightCol}>
                <h3>Title</h3>
                <h4>Date</h4>
                <p>
                    Lorem ipsum description
                </p>
                <Link to={""}>Redirection vers le détail de l'article</Link>
            </div>
            <div className={style.backgroundPastel} />
        </div>
    );
}

export default ArticlePresentation;