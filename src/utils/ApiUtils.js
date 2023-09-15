import axios from "axios";
import remoteData from "./Shipments.json"; // Provide the correct relative path to the JSON file

const REMOTE_API_URL = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";

export const fetchData = async () => {
    try {
        const response = await axios.get(REMOTE_API_URL);
        console.log(response)
    } catch (error) {
        console.error("Error fetching data from remote API:", error);
        console.log("Using local data:", remoteData);
        return remoteData;
    }
};
