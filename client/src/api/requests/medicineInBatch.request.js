import Axios from "axios";
import { MedicineInBatchURL } from "../url";

Axios.defaults.withCredentials = true;

const MedicineInBatch = {
    getMedicineInBatchBySerialNumber: (serialNumberMedicine) => Axios.get(MedicineInBatchURL.getMedicineInBatchBySerialNumber + serialNumberMedicine),
};

export default MedicineInBatch;