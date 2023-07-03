import Axios from "axios";
import { HospitalURL } from "../url";

Axios.defaults.withCredentials = true;

const Hospital = {
    getAllHospitals: () => Axios.get(HospitalURL.getAllHospitals),
};

export default Hospital;