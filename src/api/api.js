import axios from "axios";
import { API_BASE_URL } from "./endpoints";

// Common API call function
export const apiCall = async ({ url, method = "get", data = {}, params = {}, headers = {} }) => {
    try {
        const response = await axios({
            baseURL: API_BASE_URL,
            url,
            method,
            data,
            params,
            headers,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
