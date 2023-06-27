const { User } = require("../db/sync.db");

module.exports.findById = (id) => User.findOne({ where: { id } });
module.exports.findByUsername = (username) => User.findOne({ where: { username } });
module.exports.save = (userData) => User.create(userData);