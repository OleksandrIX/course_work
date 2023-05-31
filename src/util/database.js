const bcrypt = require("bcrypt");
const createAdmin = async (User) => {
    const admin = await User.findOne({where: {role: "ADMIN"}});
    if (!admin) {
        const password = await bcrypt.hash("admin", 10);
        await User.create({
            username: "admin",
            password,
            role: "ADMIN",
        });
        console.log("Admin created");
    }
};

const createDocumentType = async (DocumentType) => {
    const order = await DocumentType.findOne({where: {typeName: "НАКАЗ"}});
    const instruction = await DocumentType.findOne({where: {typeName: "РОЗПОРЯДЖЕННЯ"}});
    if (!order) {
        await DocumentType.create({
            typeName: "НАКАЗ",
        });
        console.log("Document type: 'НАКАЗ' created");
    }

    if (!instruction) {
        await DocumentType.create({
            typeName: "РОЗПОРЯДЖЕННЯ",
        });
        console.log("Document type: 'РОЗПОРЯДЖЕННЯ' created");
    }
};

module.exports = {
    createAdmin,
    createDocumentType,
};