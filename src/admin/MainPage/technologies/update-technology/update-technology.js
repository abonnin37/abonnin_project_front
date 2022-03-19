import React from "react";

import style from "./update-technology.module.scss";
import ChevronLeft from "../../../../assets/images/chevron-left.svg";
import TechnologyForm from "../technology-form/technology-form";


const UpdateTechnology = ({editTechnology, technology, setIsEditing}) => {
    return (
        <div className={style.updateTechnology}>
            <div className={style.header}>
                <h2>Editer une technologie</h2>
                <div className={style.return} onClick={() => setIsEditing(null)}>
                    <ChevronLeft /> <p>Retour</p>
                </div>
            </div>
            <TechnologyForm editTechnology={editTechnology} technology={technology}/>
        </div>
    );
}

export default UpdateTechnology;