import React, {useEffect, useState} from "react";
import axios from "../../../axios";
import CitationTile from "./citation-tile/citation-tile";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, EffectFade, Pagination} from "swiper";

import style from "./citations.module.scss";
import 'swiper/swiper-bundle.css';
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";

SwiperCore.use([Autoplay, Pagination, EffectFade]);

const Citations = () => {
    const [citationList, setCitationList] = useState([]);
    console.log(citationList);

    // Get all citations
    useEffect(() => {
        axios.get("/api/citations")
            .then(response => {
                setCitationList(response.data["hydra:member"]);
            });
    }, [setCitationList]);

    // Swiper configuration
    const sliderSettings = {
        slidesPerView:1,
        spaceBetween:0,
        autoplay: {"delay": 15000},
        pagination: {
            "clickable": true,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000,
    };

    return (
        <div id={"recommendations"} className={style.citation}>
            <div className={style.swiper}>
                <Swiper tag="section" {...sliderSettings}>
                    { citationList.length > 0 && citationList.map((citation, i) => {
                        return (
                            <SwiperSlide key={"citation-"+i}>
                                <CitationTile citation={citation} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default Citations;