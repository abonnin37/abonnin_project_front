import React from "react";
import CitationForm from "../citation-form/citation-form";

import style from "./add-citation.module.scss";

const AddCitation = ({addCitation}) => {
    return (
        <div className={style.addCitation}>
            <div className={style.header}>
                <h2>Créer une citation</h2>
            </div>
            <CitationForm addCitation={addCitation}/>
        </div>
    )
}

export default AddCitation;