import Axios from "axios";
import { ProductionBatchURL } from "../url";

Axios.defaults.withCredentials = true;

const ProductionBatch = {
    getMedicineInBatchByHospitalId: (id) => Axios.get(ProductionBatchURL.getBatchByHospitalId + id + "/medicines"),
    getAllBatchesAndMedicines: () => Axios.get(ProductionBatchURL.getAllBatchesAndMedicines),
    createProductionBatch: (batchData) => Axios.post(ProductionBatchURL.createProductionBatch, batchData),
    deleteProductionBatch: (serialNumberBatch) => Axios.delete(ProductionBatchURL.deleteProductionBatch + serialNumberBatch),
};

export default ProductionBatch;