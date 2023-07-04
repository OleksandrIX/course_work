import Axios from "axios";
import { MedicineURL } from "../url";

Axios.defaults.withCredentials = true;

const Medicine = {
    getOneMedicineById: (id) => Axios.get(MedicineURL.getOneMedicineById + id),
    getAllMedicines: () => Axios.get(MedicineURL.getAllMedicines),
    createMedicine: (medicineData) => Axios.post(MedicineURL.createMedicine, medicineData),
    updateMedicine: (id, medicineData) => Axios.put(MedicineURL.updateMedicine + id, medicineData),
    deleteMedicine: (id) => Axios.delete(MedicineURL.deleteMedicine + id),
};

export default Medicine;