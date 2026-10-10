import axios from "axios";

// IPv4 Wi-Fi laptop (hasil ipconfig)
const IP_ADDRESS = "192.168.101.9";

export const BASE_URL = `http://${IP_ADDRESS}:3000`;

const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 10000,
});

export default api;