import React, {useEffect, useState} from 'react';
import axios from "../../../axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay, Navigation} from 'swiper/core';
import {useMedia} from "use-media";
import Tile from "./tile/tile";

import style from "./projects.module.scss";

SwiperCore.use([Autoplay, Navigation]);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const isMobile = useMedia(`(max-width: ${style.mobileBreakpoint})`);

    // Swiper configuration
    const sliderSettings = {
        slidesPerView:4,
        spaceBetween:26,
        autoplay: {"delay": 3000},
        navigation: true
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
    useEffect(() => {
        axios.get('/users/2/projects')
            .then((response) => {
                setProjects(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    console.log(projects);
    return (
        <div className={style.projects}>
            <h1 className={style.title}>My projects</h1>
            <div className={style.swiper}>
                <Swiper tag="section" {...propertiesDistribution()} >
                    { projects.length !== 0 &&
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
            </div>
        </div>
    );
}

export default Projects;