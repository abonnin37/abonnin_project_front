import React from 'react';

import style from "./tile.module.scss";

const Tile = ({project}) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className={style.tile}>
            <div className={style.image}>
                <img src={project.images.length > 0 ? project.images[0] : null} alt=""/>
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