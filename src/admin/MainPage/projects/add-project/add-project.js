import React from "react";
import axios from "../../../../axios";

import style from "./add-project.module.scss";
import ProjectForm from "../project-form/project-form";

const AddProject = ({refreshList}) => {

    return (
      <div className={style.addProject}>
          <h1>Créer un projet</h1>
          <ProjectForm refreshList={refreshList} isEditing={false}/>
      </div>
    );
}

export default AddProject;