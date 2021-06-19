import React from "react";
import axios from "../../../../axios";

import style from "./add-project.module.scss";
import ProjectForm from "../project-form/project-form";
import {ImageUploader} from "../../../../shared/ImageUploader/ImageUploader";

const AddProject = ({refreshList}) => {

    return (
      <div className={style.addProject}>
          <h1>Créer un projet</h1>
          <ProjectForm refreshList={refreshList} isEditing={false}/>
          <ImageUploader />
      </div>
    );
}

export default AddProject;