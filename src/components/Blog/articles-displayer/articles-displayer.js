import React from "react";

import style from "./articles-displayer.module.scss";
import ArticlePresentation from "../shared/article-presentation/article-presentation";

const ArticlesDisplayer = ({articles}) => {
    return (
        <div className={style.articlesDisplayer}>
            <div className={style.articlesContent}>
                { articles && articles.map((article, index) => (
                    <ArticlePresentation article={article} isResponsiveMode={true} key={index}/>
                ))}
            </div>
        </div>
    );
};

export default ArticlesDisplayer;