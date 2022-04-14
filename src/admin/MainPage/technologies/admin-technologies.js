import React from "react";
import axios from "../../../axios";

import style from "./admin-technologies.module.scss";
import {useEffect, useState} from "react";
import ListTechnologies from "./list-technologies/list-technologies";
import AddTechnology from "./add-technology/add-technology";
import UpdateTechnology from "./update-technology/update-technology";

const AdminTechnologies = () => {
    const [listTechnologies, setListTechnologies] = useState([]);
    const [isAwaitingRefresh, setIsAwaitingRefresh] = useState(false);
    const [isEditing, setIsEditing] = useState("");

    const refreshList = () => {
        setIsAwaitingRefresh(true);
        axios.get('/api/technologies')
            .then((response) => {
                setListTechnologies(response.data['hydra:member']);
                setIsAwaitingRefresh(false);
            })
            .catch((error) => {
                setIsAwaitingRefresh(false);
            });
    }

    const addTechnology = (technology, asyncCall) => {
        if (asyncCall) {
            setListTechnologies(listTechnologies);
        } else {
            const newList = [...listTechnologies];
            newList.push(technology);
            setListTechnologies(newList);
        }
    }

    const removeTechnology = (technology) => {
        const newList = [...listTechnologies];
        const technologyIndex = newList.indexOf(technology);
        newList.splice(technologyIndex, 1);
        setListTechnologies(newList);
    }

    const updateTechnology = (technology) => {
        const newList = [...listTechnologies];
        const technologyIndex = newList.findIndex(t => t.id === technology.id);
        newList.splice(technologyIndex, 1, technology);
        setListTechnologies(newList);
    }

    useEffect(() => {
        refreshList();
    }, []);

    const getTechnology = () => {
        for (const i in listTechnologies) {
            if (listTechnologies[i].id === isEditing) {
                return listTechnologies[i];
            }
        }
    }

    return (
        <div className={style.adminTechnologies}>
            <ListTechnologies listTechnologies={listTechnologies} setIsEditing={setIsEditing} isAwaitingRefresh={isAwaitingRefresh} addTechnology={addTechnology} removeTechnology={removeTechnology} />
            { !isEditing ?
                <AddTechnology addTechnology={addTechnology}/>
                :
                <UpdateTechnology editTechnology={updateTechnology} technology={getTechnology()} setIsEditing={setIsEditing}/>
            }
        </div>
    );
}

export default AdminTechnologies;