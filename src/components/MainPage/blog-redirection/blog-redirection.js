import React from 'react';
import {Link} from 'react-router-dom';

import style from "./blog-redirection.module.scss";

const BlogRedirection = () => {
    return (
        <div className={style.blogRedirection}>
            <h2>Click <Link to="/blog">here</Link> to go to the blog</h2>
        </div>
    );
}

export default BlogRedirection;