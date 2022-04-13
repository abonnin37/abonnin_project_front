import React from "react";

import style from "./article-presentation.module.scss";
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';
import axios from "../../../../axios";
import {useMedia} from "use-media";
import clsx from "clsx";
import {Link} from "react-router-dom";
import RightArrow from "/src/assets/images/right-arrow.svg";

const ArticlePresentation = ({article, isResponsiveMode = false}) => {
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);

    const articlePresentationClasses = clsx({
        [style.articlePresentation]: true,
        [style.responsive]: isResponsiveMode || isMobile,
    });

    return (
        <div className={articlePresentationClasses}>
            { article &&
                <Link className={style.content} to={"/blog/" + article.id}>
                    <img className={style.image} src={axios.defaults.baseURL + article.imageUrl} alt=""/>
                    <div className={style.rightCol}>
                        <h3>{article.title}</h3>
                        <h4>{dayjs(article.created_at).locale('fr').format("DD MMMM YYYY")}</h4>
                        <p>
                            {article.summary}
                        </p>
                        <div className={style.link}><RightArrow />Lire l'article</div>
                    </div>
                </Link>
            }
            { !isResponsiveMode && ! isMobile &&
                <div className={style.backgroundPastel} />
            }
        </div>
    );
}

export default ArticlePresentation;