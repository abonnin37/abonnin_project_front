import React from 'react';

import style from './home-hero.module.scss';
import Banner from "/src/assets/images/home-hero-banner.jpg";
import RightArrow from "/src/assets/images/right-arrow.svg";

const HomeHero = () => {
    return (
        <div className={style.homeHero}>
            <h1 className={style.title}>Alexandre Bonnin</h1>
            <div className={style.contentHomeHero}>
                <div className={style.colLeft}>
                    <div className={style.cvLink}>
                        <RightArrow />
                        <a href="">Link to my CV</a>
                    </div>
                    <div className={style.banner}>
                        <img src={Banner} alt=""/>
                    </div>
                    <div className={style.descriptionGroup}>
                        <h2>
                            Je suis un ingénieur en informatique avec un fort penchant pour le développement web et l'entrepreneuriat.
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aspernatur, commodi culpa eius est id impedit incidunt ipsum maxime nostrum, obcaecati perspiciatis quo, quod repellat sint tempore temporibus vitae voluptates?
                        </p>
                    </div>
                </div>
                <div className={style.colRight}>
                    <div className={style.slash}>
                    </div>
                    <div className={style.bannerDate}>
                        <p>1997 - {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HomeHero;