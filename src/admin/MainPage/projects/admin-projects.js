import React from "react";
import axios from "../../../axios";

import style from "./admin-projects.module.scss";
import {useEffect, useState} from "react";
import ListProjects from "./list-projects/list-projects";
import AddProject from "./add-project/add-project";

const AdminProjects = () => {
    const [listProjects, setListProjects] = useState([]);

    useEffect(() => {
        axios.get('/users/2/projects')
            .then((response) => {
                setListProjects(response.data['hydra:member']);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(listProjects);
    return (
        <div className={style.adminProjects}>
            <ListProjects listProjects={listProjects}/>
            <AddProject />
        </div>
    );
}

export default AdminProjects;