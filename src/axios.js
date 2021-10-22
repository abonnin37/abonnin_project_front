import axios from "axios";

const instance = axios.create({
    baseURL: 'https://back-end.alexandrebonnin.fr',
});

export default instance;