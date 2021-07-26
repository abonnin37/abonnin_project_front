import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

import style from "./article-detail.module.scss";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "../../../axios";
import dayjs from "dayjs";
import {toast} from "react-hot-toast";

const ArticleDetail = ({articleId}) => {
    const [article, setArticle] = useState();

    // Get article detail
    useEffect(() => {
        axios.get("/api/posts/" + articleId)
            .then(response => {
                console.log(response);
                setArticle(response.data);
            })
            .catch(err => {
                toast.error(err.response.data["hydra:description"]);
            })
    }, [setArticle]);

    console.log(article);

    return (
        <div className={style.articleDetail}>
            <Link to={"/blog"} className={style.goBack}><ArrowBackIcon /> Retour</Link>
            { article &&
                <>
                    <div className={style.articleDetailContent}>
                        <h1 className={style.title}>{article.title}</h1>
                        <img className={style.image} src={axios.defaults.baseURL + article.imageUrl} alt=""/>
                        <h5 className={style.date}>{dayjs(article.created_at).locale('fr').format("DD MMMM YYYY")}</h5>
                        <h4 className={style.summary}>{article.summary}</h4>
                        <p className={style.content}>{article.content}</p>
                    </div>

                    <div className={style.backgroundLightGreen} />
                </>
            }
        </div>
    )
}

export default function ArticleDetailUI() {
    const { id } = useParams();
    return <ArticleDetail articleId={id} />
}