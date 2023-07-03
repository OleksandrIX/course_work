const Address = require("../models/Address");

module.exports.findById = async (id) => (await Address.findOne({ where: { idAddress: id } }))?.toJSON();
module.exports.save = (addressData) => Address.create(addressData);
module.exports.update = (id, addressData) => Address.update(addressData, { where: { idAddress: id } });