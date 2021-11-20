import React from 'react';
import {Link} from 'react-router-dom';

import style from "./blog-redirection.module.scss";

const BlogRedirection = () => {
    return (
        <div className={style.blogRedirection}>
            <div className={style.blogRedirectionContainer}>
                <h2>Clique <Link to="/blog">ici</Link> pour accéder au blog</h2>
            </div>
        </div>
    );
}

export default BlogRedirection;