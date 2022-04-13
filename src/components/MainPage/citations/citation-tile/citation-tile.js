import React from "react";

import style from "./citation-tile.module.scss";
import * as dayjs from "dayjs";
import QuoteLeft from "../../../../assets/quote-left.svg";
import QuoteRight from "../../../../assets/quote-right.svg";
import Quote from "../../../../assets/quote.svg";

const CitationTile = ({citation}) => {
    return (
        <div className={style.citationTile}>
            <div className={style.textGroup}>
                <Quote className={style.leftQuote}/>
                <p>{citation.content}</p>
                <Quote className={style.rightQuote}/>
            </div>
            <div className={style.citationDetail}>
                <div className={style.auteur}>{citation.firstName} {citation.lastName} - {citation.position}</div>
                <div className={style.company}>{citation.company}</div>
                <div className={style.date}>- {dayjs(citation.createdAt).locale('fr').format("DD MMMM YYYY")} -</div>
            </div>
        </div>
    )
}

export default CitationTile;