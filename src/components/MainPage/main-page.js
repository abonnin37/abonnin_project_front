import React, {useState} from 'react';

import HomeHero from "./home-hero/home-hero";
import Projects from "./projects/projects";
import Competences from "./competences/competences";
import Contact from "./contact/contact";
import BlogRedirection from "./blog-redirection/blog-redirection";

import style from './main-page.module.scss';
import Citations from "./citations/citations";

const MainPage = () => {
    return (
        <div className={style.MainPage}>
            <HomeHero />
            {/*<AdminProjects />*/}
            <Projects />
            <Citations />
            <Competences />
            <BlogRedirection />
            <Contact />
        </div>
    );
}

export default MainPage;