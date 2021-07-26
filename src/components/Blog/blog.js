import React, {useEffect, useState} from "react";
import HomeHero from "./home-hero/home-hero";

import style from "./blog.module.scss";
import axios from "../../axios";
import {toast} from "react-hot-toast";

const Blog = () => {
    const [articleList, setArticleList] = useState([]);

    // Get all posts
    useEffect(() => {
        axios.get("/api/posts")
            .then(response => {
                console.log(response);
                setArticleList(response.data["hydra:member"]);
            })
            .catch(err => {
                toast.error(err.response.data["hydra:description"]);
            })
    }, [setArticleList]);

    return (
      <div className={style.blog}>
          <HomeHero articleList={articleList}/>
      </div>
    );
}

export default Blog;