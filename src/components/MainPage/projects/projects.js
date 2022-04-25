import React, {useEffect, useRef, useState} from 'react';
import axios from "../../../axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay, Navigation} from 'swiper/core';
import {useMedia} from "use-media";
import Tile from "./tile/tile";
import ProjectDetail from "../project-detail/project-detail";
import {SlideModal} from "../../Layout/slide-modal/slide-modal";

import style from "./projects.module.scss";
import 'swiper/swiper-bundle.css';
import clsx from "clsx";

SwiperCore.use([Autoplay, Navigation]);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const isTablet = useMedia(`(max-width: ${style.tabletBreakpoint})`);
    const isLaptop = useMedia(`(max-width: ${style.laptopBreakpoint})`);
    const swiperNext = useRef(null);
    const swiperPrev = useRef(null);

    useEffect(() => {
        const html = document.documentElement;

        if (openModal){
            html.style.overflow = "hidden";
        } else {
            html.style.overflow = "auto";
        }
    }, [openModal]);

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

    const sliderSettingsLaptop = {
        slidesPerView:2,
        autoplay: {"delay": 3000},
        navigation: {
            nextEl: swiperNext.current,
            prevEl: swiperPrev.current,
        }
    };

    const sliderSettingsTablet = {
        slidesPerView:1,
        autoplay: {"delay": 3000},
        navigation: {
            nextEl: swiperNext.current,
            prevEl: swiperPrev.current,
        }
    };

    const propertiesDistribution = () => {
        if (isTablet){
            return sliderSettingsTablet;
        } else if (isLaptop){
            return sliderSettingsLaptop;
        } else {
            return sliderSettings;
        }
    }

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setSelectedProject(null);
        setOpenModal(false);
    }

    // Get the datas from the api
    // user-info
    useEffect(() => {
        axios.get('/api/projects')
            .then((response) => {
                setProjects(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div id={"projects"} className={style.projects}>
            <div className={style.projectsContainer}>
                <h1 className={style.title}>Mes missions</h1>
                <div className={style.swiper}>
                    <Swiper tag="section" {...propertiesDistribution()} >
                        { projects &&
                        projects.map((project, i) => {
                            return (
                                <SwiperSlide key={`project-${i}`}>
                                    <div className={style.projectContainer} onClick={() => handleProjectClick(project)}>
                                        <Tile project={project}/>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                <div className={clsx(style.navEl, style.navElLeft)} ref={swiperPrev}>&lt;</div>
                <div className={clsx(style.navEl, style.navElRight)} ref={swiperNext}>></div>

                <SlideModal open={openModal} setOpen={setOpenModal}>
                    <ProjectDetail project={selectedProject} handleCloseModal={handleCloseModal}/>
                </SlideModal>
            </div>
        </div>
    );
}

export default Projects;