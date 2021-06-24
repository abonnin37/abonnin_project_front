import React, {useEffect, useRef} from "react";

import style from "./update-project.module.scss";
import ChevronLeft from "../../../../assets/images/chevron-left.svg";
import ProjectForm from "../project-form/project-form";
import {ImageUploader} from "../../../../shared/ImageUploader/ImageUploader";

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
            <ImageUploader resourceName={project.name} projectId={project.id}/>
        </div>
    );
}

export default UpdateProject;