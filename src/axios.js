import axios from "axios";

const instance = axios.create({
    baseURL: 'https://backend.alexandrebonnin.fr',
});

export default instance;
