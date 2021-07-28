import React, {useEffect, useState} from "react";

import style from "./admin-citations.module.scss";
import axios from "../../../axios";
import {toast} from "react-hot-toast";
import ListCitations from "./list-citations/list-citation";
import AddCitation from "./add-citation/add-citation";
import EditCitation from "./edit-citation/edit-citation";

const AdminCitations = () => {
    const [citationList, setCitationList] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [isAwaitingRefresh, setIsAwaitingRefresh] = useState(false);

    const addCitation = (citation, asyncCall) => {
        if (asyncCall) {
            setCitationList(citationList);
        } else {
            const newList = [...citationList];
            newList.push(citation);
            setCitationList(newList);
        }

    }

    const removeCitation = (citation) => {
        const newList = [...citationList];
        const citationIndex = newList.indexOf(citation);
        newList.splice(citationIndex, 1);
        setCitationList(newList);
    }

    const editCitation = (citation) => {
        const newList = [...citationList];
        const citationIndex = newList.indexOf(citation);
        newList.splice(citationIndex, 1, citation);
        setCitationList(newList);
    }

    // Get all citations
    useEffect(() => {
        setIsAwaitingRefresh(true);
        axios.get("/api/citations")
            .then(response => {
                console.log(response);
                setCitationList(response.data["hydra:member"]);
                setIsAwaitingRefresh(false);
            })
            .catch(err => {
                toast.error(err.response.data["hydra:description"]);
                setIsAwaitingRefresh(false);
            })
    }, [setCitationList]);

    // Get edited citation
    const getEditCitation = () => {
        for (const i in citationList) {
            if (citationList[i].id === isEditing) {
                return citationList[i];
            }
        }
    };

    return (
        <div className={style.adminCitations}>
            <ListCitations citationList={citationList} removeCitation={removeCitation} addCitation={addCitation} setIsEditing={setIsEditing} isAwaitingRefresh={isAwaitingRefresh} />
            { !isEditing ?
                <AddCitation addCitation={addCitation}/>
                :
                <EditCitation editCitation={editCitation} citation={getEditCitation()} setIsEditing={setIsEditing}/>
            }
        </div>
    );
}

export default AdminCitations;