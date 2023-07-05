import Axios from "axios";
import { HospitalURL } from "../url";

Axios.defaults.withCredentials = true;

const HospitalRequest = {
    getAllHospitals: () => Axios.get(HospitalURL.getAllHospitals),
    createHospital: (hospitalData) => Axios.post(HospitalURL.createHospital, hospitalData),
    editHospital: (id, hospitalData) => Axios.put(HospitalURL.editHospital + id, hospitalData),
    deleteHospital: (id) => Axios.delete(HospitalURL.deleteHospital + id),
};

export default HospitalRequest;