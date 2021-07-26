import React from "react";
import ArticlePresentation from "./article-presentation/article-presentation";

import style from './home-hero.module.scss';

const HomeHero = ({articleList}) => {

    return (
        <div className={style.homeHero}>
            <h5>Bienvenu sur mon</h5>
            <h1>Blog</h1>
            <h4>Vous trouverez ici des publications sur les sujets que j'affectionne.</h4>
            <ArticlePresentation firstArticle={articleList.length > 0 ? articleList[0] : null}/>
        </div>
    )
}

export default HomeHero;