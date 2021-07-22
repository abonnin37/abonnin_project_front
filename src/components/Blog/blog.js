import React from "react";
import HomeHero from "./home-hero/home-hero";

import style from "./blog.module.scss";

const Blog = () => {
    return (
      <div className={style.blog}>
          <HomeHero />
      </div>
    );
}

export default Blog;