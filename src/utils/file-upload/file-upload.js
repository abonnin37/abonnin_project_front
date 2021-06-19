import axios from "../../axios";

export const FileUpload = () => {
    const uploadFile = (file, project_id) => {
        let formData = new FormData();

        formData.append("imageFile", file);
        formData.append("project", "/api/projects/" + project_id);

        return axios.post("/images", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    const getFiles = () => {
        return axios.get("/images");
    }

    return {uploadFile, getFiles};
}