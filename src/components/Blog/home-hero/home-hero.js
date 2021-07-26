import React from "react";
import ArticlePresentation from "../shared/article-presentation/article-presentation";

import style from './home-hero.module.scss';
import {useMedia} from "use-media";

const HomeHero = ({articleList}) => {
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);

    return (
        <div className={style.homeHero}>
            <h5>Bienvenu sur mon</h5>
            <h1>Blog</h1>
            <h4>Vous trouverez ici des publications sur les sujets que j'affectionne.</h4>
            { !isMobile &&
                <ArticlePresentation article={articleList.length > 0 ? articleList[0] : null}/>
            }
        </div>
    )
}

export default HomeHero;