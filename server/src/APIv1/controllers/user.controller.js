const bcrypt = require("bcrypt");
const UserService = require("../../services/user.service");
const AddressService = require("../../services/address.service");
const HospitalService = require("../../services/hospital.service");
const { apiError } = require("./error.controller");

module.exports.getCurrentAuthUser = async (req, res) => {
    let user, hospital, address;
    try {
        const currentUser = (await req.user).toJSON();
        const { addressId, hospitalId } = currentUser;

        if (currentUser.role === "ADMIN") {
            user = Object.assign({}, currentUser);
        } else {
            if (addressId) {
                address = await AddressService.findById(addressId);
            } else {
                address = null;
            }

            if (hospitalId) {
                hospital = await HospitalService.findById(hospitalId);
                const hospitalAddress = await AddressService.findById(hospital.addressId);
                hospital.address = hospitalAddress;
            } else {
                hospital = null;
            }

            user = Object.assign({}, currentUser);
            user.address = address;
            user.hospital = hospital;
        }

        delete user.password;
        delete user.addressId;
        delete user.hospitalId;
        delete user.hospital?.addressId;

        res.status(200).json({ user });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.updateUser = async (req, res) => {
    const { idUser } = req.params;
    const userData = req.body;

    try {
        const user = await UserService.findById(idUser);
        if (!user) return apiError(res, 404, "User not found");
        if (userData.username && user.username !== userData.username &&
            await UserService.findByUsername(userData.username))
            return apiError(res, 409, "Користувач з таким ім'ям вже існує");

        if (userData.password) userData.password = await bcrypt.hash(userData.password, 10);
        await UserService.update(idUser, userData);
        res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};

module.exports.deleteUser = async (req, res) => {
    const { idUser } = req.params;
    try {
        const user = await UserService.findById(idUser);
        if (!user) return apiError(res, 404, "User not found");
        await UserService.delete(idUser);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log("Error: ", err);
        apiError(res, 500, err.message);
    }
};