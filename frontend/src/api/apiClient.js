import { useContext } from "react";
import storage from "../auth/storage";
import apiSettings from "./apiSettings";

const { create } = require("apisauce");

const apiClient = create({
    baseURL: apiSettings.url + '/v1/',
})

apiClient.addAsyncRequestTransform(async (request) => {
    const authToken = await storage.getUser();

    if (!authToken) return;
    request.headers["Authorization"] = "Token " + authToken;
});

export default apiClient