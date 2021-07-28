import React from "react";

import style from "./edit-citation.module.scss";
import ChevronLeft from "../../../../assets/images/chevron-left.svg";
import CitationForm from "../citation-form/citation-form";

const EditCitation = ({editCitation, citation, setIsEditing}) => {
    return (
        <div className={style.editCitation}>
            <div className={style.header}>
                <h2>Editer une citation</h2>
                <div className={style.return} onClick={() => setIsEditing(null)}>
                    <ChevronLeft /> <p>Retour</p>
                </div>
            </div>
            <CitationForm editCitation={editCitation} citation={citation}/>
        </div>
    );
}

export default EditCitation;