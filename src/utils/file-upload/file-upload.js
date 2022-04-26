import axios from "../../axios";
import {useContext} from "react";
import AuthContext from "../../store/auth-context";

export const FileUpload = () => {
    const {token} = useContext(AuthContext);
    const AuthStr = "Bearer ".concat(token);

    const uploadFile = (file, project_id) => {
        let formData = new FormData();

        formData.append("imageFile", file);
        formData.append("project", "/api/projects/" + project_id);

        return axios.post("/api/images", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": AuthStr
            }
        });
    }

    const getFiles = () => {
        return axios.get("/api/images");
    }

    const getProjectFiles = (projectId) => {
        return axios.get("/api/projects/" + projectId + "/images");
    }

    const deleteFile = (fileId) => {
        return axios.delete("/api/images/" + fileId, {
            headers: {
                "Authorization": AuthStr
            }
        });
    }

    return {uploadFile, getFiles, deleteFile, getProjectFiles};
}