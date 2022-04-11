import React from 'react';
import {useHistory} from 'react-router-dom';

import style from "./blog-redirection.module.scss";

const BlogRedirection = () => {
    const history = useHistory();

    return (
        <div id={"blog"} className={style.blogRedirection}>
            <div className={style.blogRedirectionContainer}>
                <h2 onClick={() => history.push("/blog")}>Clique <span>ici</span> pour accéder au blog</h2>
            </div>
        </div>
    );
}

export default BlogRedirection;