const Model = require("../model");

const UserService = require("./user")(Model);
const DocumentService = require("./document")(Model);

module.exports={
    UserService,
    DocumentService,
};