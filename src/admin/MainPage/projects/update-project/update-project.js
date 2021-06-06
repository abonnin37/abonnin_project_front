import React, {useEffect, useRef} from "react";

import style from "./update-project.module.scss";
import ChevronLeft from "../../../../assets/images/chevron-left.svg";
import ProjectForm from "../project-form/project-form";

const UpdateProject = ({refreshList, setIsEditing, project}) => {

    return (
        <div className={style.updateProject}>
            <div className={style.header}>
                <h1>Editer le projet</h1>
                <div className={style.return} onClick={() => setIsEditing("")}>
                    <ChevronLeft /> <p>Retour</p>
                </div>
            </div>
            <ProjectForm refreshList={refreshList} isEditing={true} project={project}/>
        </div>
    );
}

export default UpdateProject;