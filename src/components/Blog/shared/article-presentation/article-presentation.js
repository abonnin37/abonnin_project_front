import React from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import style from "./article-presentation.module.scss";
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';
import axios from "../../../../axios";
import {useMedia} from "use-media";
import clsx from "clsx";
import {Link} from "react-router-dom";

const ArticlePresentation = ({article, isResponsiveMode = false}) => {
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);

    const articlePresentationClasses = clsx({
        [style.articlePresentation]: true,
        [style.responsive]: isResponsiveMode || isMobile,
    });

    return (
        <div className={articlePresentationClasses}>
            { article &&
                <div className={style.content}>
                    <img className={style.image} src={axios.defaults.baseURL + article.imageUrl} alt=""/>
                    <div className={style.rightCol}>
                        <h3>{article.title}</h3>
                        <h4>{dayjs(article.created_at).locale('fr').format("DD MMMM YYYY")}</h4>
                        <p>
                            {article.summary}
                        </p>
                        <Link to={"/blog/" + article.id} className={style.link}><ArrowForwardIcon />Plus d'info</Link>
                    </div>
                </div>
            }
            { !isResponsiveMode && ! isMobile &&
                <div className={style.backgroundPastel} />
            }
        </div>
    );
}

export default ArticlePresentation;