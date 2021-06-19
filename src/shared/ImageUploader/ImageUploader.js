import style from "./ImageUploader.module.scss";
import React, {useEffect, useState} from "react";
import {FileUpload} from "../../utils/file-upload/file-upload";

export const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const {uploadFile, getFiles} = FileUpload();
    const [imgSended, setImageSended] = useState("");

    useEffect(() => {
        /*const images = getFiles().then(response => {
            console.log(response);
        });*/
    }, [])


    const fileChangedHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const uploadHandler = () => {
        uploadFile(selectedFile, 13).then((response) => {
            console.log(response);
            setImageSended("http://127.0.0.1:8000" + response.data.contentUrl);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={style.imageUploader}>
            <div className={style.uploadGroup}>
                <input type="file" onChange={fileChangedHandler}/>
                <button onClick={uploadHandler}>Upload!</button>
            </div>
            <div>
                <h3>Image envoyé</h3>
                <img src={imgSended} alt=""/>
            </div>
            <div className={style.listGroup}>
                {
                }
            </div>
        </div>
    );
}