import React, {useEffect, useRef, useState} from "react";
import * as dayjs from "dayjs";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Pagination, EffectFade} from "swiper/core";
import axios from "../../../axios";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import style from "./project-detail.module.scss";
import 'swiper/swiper-bundle.css';
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

SwiperCore.use([Autoplay, Pagination, EffectFade]);

const ProjectDetail = ({project, handleCloseModal}) => {
    const [imageList, setImageList] = useState([]);
    const swiperRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    const [selectedImgUrl, setSelectedImgUrl] = useState("");
    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        axios.get('/api/projects/'+ project.id +'/technologies')
            .then(response => {
                setTechnologies(response.data["hydra:member"]);
            })
            .catch(e => {
                console.log(e);
            })
    })

    // Swiper configuration
    const sliderSettings = {
        slidesPerView:1,
        spaceBetween:0,
        autoplay: {"delay": 8000},
        pagination: {
            "clickable": true,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000,
    };

    const handleOpen = (imgUrl) => {
        setSelectedImgUrl(imgUrl);
        swiperRef.current.swiper.autoplay.stop();
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        swiperRef.current.swiper.autoplay.start();
        setSelectedImgUrl("");
    };

    // Get the image-urls from the api form the specified project
    useEffect(() => {
        if (project && project.images.length > 0) {
            axios.get('/api/projects/' + project.id + '/images')
                .then((response) => {
                    setImageList(response.data['hydra:member']);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [project]);

    return (
        <div className={style.projectDetail}>
            <div className={style.leftCol}>
                <Swiper tag="section" {...sliderSettings} ref={swiperRef}>
                    { imageList.length > 0 && imageList.map((image, i) => {
                        return (
                            <SwiperSlide key={"project-image-"+i}>
                                <div className={style.imageContainer} >
                                    <img src={axios.defaults.baseURL + image.contentUrl} alt="" onClick={() => handleOpen(axios.defaults.baseURL + image.contentUrl)}/>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <Modal
                    className={style.modal}
                    open={openModal}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openModal}>
                        <div className={style.modalImageContainer}>
                            <TransformWrapper
                                centerOnInit>
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                    <>
                                        <div className={style.tools}>
                                            <div className={style.minus} onClick={() => zoomOut()}><RemoveIcon/></div>
                                            <div className={style.reset} onClick={() => resetTransform()}>Zoom initial</div>
                                            <div className={style.more} onClick={() => zoomIn()}><AddIcon/></div>
                                        </div>
                                        <div className={style.close} onClick={() => handleClose()}>
                                            <div>Fermer</div>
                                        </div>
                                        <TransformComponent>
                                            <img src={selectedImgUrl} alt=""/>
                                        </TransformComponent>
                                    </>
                                )}
                            </TransformWrapper>
                        </div>
                    </Fade>
                </Modal>
            </div>

            <div className={style.rightCol}>
                { project &&
                    <div className={style.projectContent}>
                        <div className={style.title}>
                            <h1>{project.name}</h1>
                        </div>
                        <div className={style.date}>
                            <h4>{dayjs(project.beginAt).locale('fr').format("DD MMMM YYYY") + " - " + dayjs(project.endAt).locale('fr').format("DD MMMM YYYY") }</h4>
                        </div>
                        <div className={style.detailGroup}>
                            <h6>.details</h6>
                            <p>{project.description}</p>
                        </div>
                        <div className={style.technologiesGroup}>
                            <h6>.technologies</h6>
                            <ul>
                                { technologies.length > 0 && technologies.map((tech, index) =>(
                                    <li key={tech.name + "-" + index}>
                                        {tech.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={style.linkGroup}>
                            <div className={style.slash} />
                            <a href={project.url}><ArrowForwardIcon />Lien</a>
                        </div>
                    </div>
                }

                <div className={style.close} onClick={handleCloseModal}>
                    <div className={style.circle}/>
                    <div className={style.cross1} />
                    <div className={style.cross2} />
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;