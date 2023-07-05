import Axios from "axios";
import { StorageURL } from "../url";

Axios.defaults.withCredentials = true;

const StorageRequest = {
    getAllStoragesByHospitalId: (id) => Axios.get(StorageURL.getAllStoragesByHospitalId + id),
    createStorageMedicine: (storageData) => Axios.post(StorageURL.createStorageMedicine, storageData),
    updateStorageMedicine: (id, storageData) => Axios.put(StorageURL.updateStorageMedicine + id, storageData),
    deleteStorageMedicine: (id) => Axios.delete(StorageURL.deleteStorageMedicine + id),
};

export default StorageRequest;