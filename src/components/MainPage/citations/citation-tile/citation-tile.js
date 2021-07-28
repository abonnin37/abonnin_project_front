import React from "react";

import style from "./citation-tile.module.scss";
import * as dayjs from "dayjs";

const CitationTile = ({citation}) => {
    return (
        <div className={style.citationTile}>
            <p>{citation.content}</p>
            <div className={style.citationDetail}>
                <div className={style.auteur}>{citation.firstName} {citation.lastName} - {citation.position}</div>
                <div className={style.company}>{citation.company}</div>
                <div className={style.date}>- {dayjs(citation.createdAt).locale('fr').format("DD MMMM YYYY")} -</div>
            </div>
        </div>
    )
}

export default CitationTile;