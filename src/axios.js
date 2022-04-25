import axios from "axios";

const instance = axios.create({
    baseURL: 'http://backend.alexandrebonnin.fr',
});

export default instance;