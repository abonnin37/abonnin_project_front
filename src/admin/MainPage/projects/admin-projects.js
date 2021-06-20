import React from "react";
import axios from "../../../axios";

import style from "./admin-projects.module.scss";
import {useEffect, useState} from "react";
import ListProjects from "./list-projects/list-projects";
import AddProject from "./add-project/add-project";
import UpdateProject from "./update-project/update-project";

const AdminProjects = () => {
    const [listProjects, setListProjects] = useState([]);
    const [isAwaitingRefresh, setIsAwaitingRefresh] = useState(false);
    const [isEditing, setIsEditing] = useState("");

    const refreshList = () => {
        setIsAwaitingRefresh(true);
        axios.get('/api/users/2/projects')
            .then((response) => {
                setListProjects(response.data['hydra:member']);
                setIsAwaitingRefresh(false);
            })
            .catch((error) => {
                setIsAwaitingRefresh(false);
            });
    }

    useEffect(() => {
        refreshList();
    }, []);

    const getProject = () => {
        for (const i in listProjects) {
            if (listProjects[i].id === isEditing) {
                return listProjects[i];
            }
        }
    }

    return (
        <div className={style.adminProjects}>
            <ListProjects listProjects={listProjects} refreshList={refreshList} isAwaitingRefresh={isAwaitingRefresh} setIsEditing={setIsEditing}/>
            { isEditing === "" ?
                <AddProject refreshList={refreshList}/>
                :
                <UpdateProject refreshList={refreshList} setIsEditing={setIsEditing} project={getProject()}/>
            }
        </div>
    );
}

export default AdminProjects;