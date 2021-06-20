import style from "./ImageUploader.module.scss";
import React, {useEffect, useState} from "react";
import {FileUpload} from "../../utils/file-upload/file-upload";
import Delete from "../../assets/trash.svg";
import {SnackbarAlert} from "../SnackbarAlert/SnackbarAlert";
import CircularProgress from "@material-ui/core/CircularProgress";

export const ImageUploader = ({resourceName}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [listImages, setListImages] = useState([]);
    const {uploadFile, getFiles, deleteFile} = FileUpload();
    const [fireOn, setFireOn] = useState(0);
    const [isAwaiting, setIsAwaiting] = useState(false);
    const [severity, setSeverity] = useState("success");

    useEffect(() => {
        setIsAwaiting(true);
        getFiles()
            .then(response => {
                setIsAwaiting(false);
                setListImages(response.data["hydra:member"]);
            })
            .catch(e => {
                setIsAwaiting(false);
            });
    }, [])


    const fileChangedHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const uploadHandler = () => {
        uploadFile(selectedFile, 13).then((response) => {
            addImageFromList(response.data);
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    const removeImageFromList = (id) => {
        for (let i = 0; i < listImages.length; i++) {
            if (listImages[i].id === id){
                const newList = [...listImages];
                newList.splice(i, 1);
                setListImages(newList);
                return;
            }
        }
    }

    const addImageFromList = (image) => {
        const newList = [...listImages];
        newList.push(image);
        setListImages(newList);
    }


    const onDeleteHandler = (id) => {
        removeImageFromList(id);
        deleteFile(id)
            .then((response) => {
                setSeverity("success");
                setFireOn(fireOn + 1);
            })
            .catch((error) => {
                setSeverity("error");
                setFireOn(fireOn + 1);
            });
    }

    console.log(listImages);

    return (
        <div className={style.imageUploader}>
            <div className={style.uploadGroup}>
                <input type="file" onChange={fileChangedHandler}/>
                <button onClick={uploadHandler}>Upload!</button>
            </div>
            <div className={style.listGroup}>
                <h5>Liste des images associé à la {resourceName} :</h5>
                <ul>

                    { isAwaiting ?
                        <CircularProgress size={15} className={style.circularProgress}/>
                        : listImages.length > 0 ?
                            listImages.map(image => {
                                return (
                                    <li>
                                        {image.name}
                                        <div className={style.delete} onClick={() => onDeleteHandler(image.id)}>
                                            <Delete />
                                        </div>
                                    </li>
                                );
                            })
                        : <></>
                    }
                </ul>
            </div>
            <SnackbarAlert severity={severity} errorMessage={"Une erreur est survenue, veuillez contacter un administrateur."} successMessage={"L'image a bien été supprimé"} fireOn={fireOn}/>
        </div>
    );
}