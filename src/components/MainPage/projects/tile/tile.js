import React, {useEffect, useState} from 'react';

import style from "./tile.module.scss";
import axios from "../../../../axios";
import dayjs from "dayjs";
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

    return (
        <div className={style.tile}>
            <div className={style.image}>
                <img src={axios.defaults.baseURL + imageUrl} alt=""/>
            </div>
            <h4 className={style.period}>
                {
                    (
                        dayjs(project.beginAt).locale("fr").format("MMMM") === dayjs(project.endAt).locale("fr").format("MMMM") ?
                            ""
                            :
                            dayjs(project.beginAt).locale("fr").format("MMMM").slice(0,3).toUpperCase() + " " + dayjs(project.beginAt).locale("fr").format("YY") + " - "
                    ) + dayjs(project.endAt).locale("fr").format("MMMM").slice(0,3).toUpperCase() + " " + dayjs(project.endAt).locale("fr").format("YY")
                }
            </h4>
            <h3 className={style.title}>
                {project.name}
            </h3>
            <p className={style.excerpt}>
                {project.excerpt}
            </p>
        </div>
    );
}

export default Tile;