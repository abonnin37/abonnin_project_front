import React from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import style from "./article-presentation.module.scss";
import {Link} from "react-router-dom";
import * as dayjs from 'dayjs';
import 'dayjs/locale/fr';
import axios from "../../../../axios";

const ArticlePresentation = ({firstArticle}) => {
    return (
        <div className={style.articlePresentation}>
            { firstArticle &&
                <div className={style.content}>
                    <img className={style.image} src={axios.defaults.baseURL + firstArticle.imageUrl} alt=""/>
                    <div className={style.rightCol}>
                        <h3>{firstArticle.title}</h3>
                        <h4>{dayjs(firstArticle.created_at).locale('fr').format("DD MMMM YYYY")}</h4>
                        <p>
                            {firstArticle.summary}
                        </p>
                        <Link to={""}><ArrowForwardIcon />Plus d'info</Link>
                    </div>
                </div>
            }
            <div className={style.backgroundPastel} />
        </div>
    );
}

export default ArticlePresentation;