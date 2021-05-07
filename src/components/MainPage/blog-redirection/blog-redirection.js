import React from 'react';

import style from "./blog-redirection.module.scss";

const BlogRedirection = () => {
    return (
        <div className={style.blogRedirection}>
            <h2>Click <a href="">here</a> to go to the blog</h2>
        </div>
    );
}

export default BlogRedirection;