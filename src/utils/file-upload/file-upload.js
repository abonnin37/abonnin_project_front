import axios from "../../axios";

export const FileUpload = () => {

    const uploadFile = (file, project_id) => {
        let formData = new FormData();

        formData.append("imageFile", file);
        formData.append("project", "/api/projects/" + project_id);

        return axios.post("/api/images", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
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
        return axios.delete("/api/images/" + fileId);
    }

    return {uploadFile, getFiles, deleteFile, getProjectFiles};
}