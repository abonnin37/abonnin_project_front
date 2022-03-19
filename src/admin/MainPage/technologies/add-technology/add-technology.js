import React from "react";
import TechnologyForm from "../technology-form/technology-form";

import style from "./add-technology.module.scss";

const AddTechnology = ({addTechnology}) => {
    return (
        <div className={style.addTechnology}>
            <div className={style.header}>
                <h2>Créer une technologie</h2>
            </div>
            <TechnologyForm addTechnology={addTechnology}/>
        </div>
    )
}

export default AddTechnology;