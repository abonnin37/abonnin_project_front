import React, {useEffect, useState} from 'react';

import style from "./tile.module.scss";
import axios from "../../../../axios";
import {toast} from "react-hot-toast";

const Tile = ({project}) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (project.images.length > 0) {
            axios.get(project.images[0])
                .then(response => {
                    setImageUrl(response.data.contentUrl);
                })
                .catch(e => {
                    console.log(e.response);
                    toast.error(e.response.statusText);
                });
        }
    }, [project]);


    // dayjs
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className={style.tile}>
            <div className={style.image}>
                <img src={axios.defaults.baseURL + imageUrl} alt=""/>
            </div>
            <h3 className={style.title}>
                {project.name}
            </h3>
            <h4 className={style.period}>
                {monthNames[new Date(project.begin_at).getMonth()]} {new Date(project.begin_at).getFullYear()} - {monthNames[new Date(project.end_at).getMonth()]} {new Date(project.end_at).getFullYear()}
            </h4>
            <p className={style.excerpt}>
                {project.excerpt}
            </p>
        </div>
    );
}

export default Tile;