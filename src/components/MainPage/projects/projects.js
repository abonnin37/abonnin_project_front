import React, {useEffect, useState} from 'react';
import axios from "../../../axios";

import style from "./projects.module.scss";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('/users/2/projects')
            .then((response) => {
                setProjects(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    console.log(projects);
    return (
        <div className={style.projects}>
            <h1 className={style.title}>My projects</h1>
            <div className={style.swipper}>

            </div>
        </div>
    );
}

export default Projects;