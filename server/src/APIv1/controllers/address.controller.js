const AddressService = require("../../services/address.service");
const UserService = require("../../services/user.service");
const { apiError } = require("./error.controller");

module.exports.createAddress = async (req, res) => {
    const { idUser } = req.body;
    const addressData = req.body;
    try {
        const address = await AddressService.save(addressData);
        await UserService.updateAddress(idUser, address.idAddress);
        res.status(201).json({ message: "Address created successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.updateAddress = async (req, res) => {
    const { idAddress } = req.params;
    const addressData = req.body;
    try {
        const address = await AddressService.findById(idAddress);
        if (!address) return apiError(res, 404, "Address not found");
        await AddressService.update(idAddress, addressData);
        res.status(200).json({ message: "Address updated successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};