const User = require("../models/User");

module.exports.findById = (id) => User.findOne({ where: { idUser: id } });
module.exports.findByUsername = (username) => User.findOne({ where: { username } });
module.exports.save = (userData) => User.create(userData);
module.exports.update = (id, userData) => User.update(userData, { where: { idUser: id } });
module.exports.updateAddress = (id, addressId) => User.update({ addressId }, { where: { idUser: id } });
module.exports.delete = (id) => User.destroy({ where: { idUser: id } });