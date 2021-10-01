import axios from "axios";

const instance = axios.create({
    baseURL: 'http://back-end.alexandrebonnin.fr',
});

export default instance;