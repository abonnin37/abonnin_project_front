import React, {useEffect, useRef, useState} from 'react';
import axios from "../../../axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay, Navigation} from 'swiper/core';
import {useMedia} from "use-media";
import Tile from "./tile/tile";

import style from "./projects.module.scss";
import 'swiper/swiper-bundle.css';
import clsx from "clsx";

SwiperCore.use([Autoplay, Navigation]);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);
    const swiperNext = useRef(null);
    const swiperPrev = useRef(null);

    // Swiper configuration
    const sliderSettings = {
        slidesPerView:4,
        spaceBetween:26,
        autoplay: {"delay": 3000},
        navigation: {
            nextEl: swiperNext.current,
            prevEl: swiperPrev.current,
        }
    };

    const sliderSettingsMobile = {
        slidesPerView:1,
        autoplay: {"delay": 3000},
        navigation: true
    };

    const propertiesDistribution = () => {
        if (isMobile){
            return sliderSettingsMobile;
        }  else {
            return sliderSettings;
        }
    }

    // Get the datas from the api
    // user-info
    useEffect(() => {
        axios.get('/api/users/2/projects')
            .then((response) => {
                setProjects(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div className={style.projects}>
            <h1 className={style.title}>My projects</h1>
            <div className={style.swiper}>
                <Swiper tag="section" {...propertiesDistribution()} >
                    { projects &&
                        projects.map((project, i) => {
                        return (
                            <SwiperSlide key={`project-${i}`}>
                                <div className={style.projectContainer}>
                                    <Tile project={project}/>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className={style.navigation}>
                    <div className={clsx(style.navEl, style.navElLeft)} ref={swiperPrev}>&lt;</div>
                    <div className={clsx(style.navEl, style.navElRight)} ref={swiperNext}>></div>
                </div>
            </div>
        </div>
    );
}

export default Projects;