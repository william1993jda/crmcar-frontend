import axios from "axios";
import { rootUrl } from "./App";

export const Http = axios.create({
    baseURL: rootUrl
})