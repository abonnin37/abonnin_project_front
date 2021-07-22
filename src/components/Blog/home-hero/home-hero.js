import React from "react";
import ArticlePresentation from "./article-presentation/article-presentation";

import style from './home-hero.module.scss';

const HomeHero = () => {

    return (
        <div className={style.homeHero}>
            <h5>Welcome to</h5>
            <h1>My personal Blog</h1>
            <h4>A description of this area</h4>
            <ArticlePresentation />
        </div>
    )
}

export default HomeHero;