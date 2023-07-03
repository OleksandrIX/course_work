import Axios from "axios";
import { AddressURL } from "../url";

Axios.defaults.withCredentials = true;

const Address = {
    createAddress: (addressData) => Axios.post(AddressURL.createAddress, addressData),
    editAddress: (idAddress, addressData) => Axios.put(AddressURL.editAddress + idAddress, addressData),
};

export default Address;