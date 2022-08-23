import React from 'react';
import {useHistory} from 'react-router-dom';

import style from "./blog-redirection.module.scss";
import RightArrow from "../../../assets/images/right-arrow.svg";

const BlogRedirection = () => {
    const history = useHistory();

    return (
        <div id={"blog"} className={style.blogRedirection}>
            <div className={style.blogRedirectionContainer}>
                <div className={style.blogRedirectionContent} onClick={() => history.push("/blog")}>
                    <h2>Envie d'en savoir plus ?</h2>
                    <div className={style.blogLink}>
                        <RightArrow />
                        <p>Visiter mon blog</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BlogRedirection;