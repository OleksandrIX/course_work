const bcrypt = require("bcrypt");
const { sequelize } = require("../db/connect.db");

const User = require("../models/User");
const Address = require("../models/Address");
const Hospital = require("../models/Hospital");
const Medicine = require("../models/Medicine");
const ProductionBatch = require("../models/ProductionBatch");
const MedicineInBacth = require("../models/MedicineInBacth");

Hospital.hasMany(User, { foreignKey: "hospitalId", onDelete: "CASCADE" });
User.belongsTo(Hospital, { foreignKey: "hospitalId", onDelete: "CASCADE" });

Hospital.hasMany(ProductionBatch, { foreignKey: "hospitalId", onDelete: "CASCADE" });
ProductionBatch.belongsTo(Hospital, { foreignKey: "hospitalId", onDelete: "CASCADE" });

ProductionBatch.hasMany(MedicineInBacth, { foreignKey: "batchId", onDelete: "CASCADE" });
MedicineInBacth.belongsTo(ProductionBatch, { foreignKey: "batchId", onDelete: "CASCADE" });

MedicineInBacth.belongsTo(Medicine, { foreignKey: "medicineId", onDelete: "CASCADE" });

User.belongsTo(Address, { foreignKey: "addressId", onDelete: "CASCADE" });
Hospital.belongsTo(Address, { foreignKey: "addressId", onDelete: "CASCADE" });

Address.hasOne(User, { foreignKey: { name: "addressId" }, onDelete: "CASCADE" });
Address.hasOne(Hospital, { foreignKey: { name: "addressId" }, onDelete: "CASCADE" });

const createAdmin = async () => {
    const admin = await User.findOne({ where: { username: "admin" } });
    if (!admin) {
        const password = await bcrypt.hash("admin", 10);
        await User.create({
            username: "admin",
            password,
            role: "ADMIN",
            firstName: "admin",
            lastName: "admin",
            position: "admin"
        });
        console.log("Admin created!");
    }
};

sequelize.sync({ alter: true })
    .then(async () => {
        console.log("Sync with the database is successful");
        await createAdmin();
    })
    .catch(err => console.log("Error sync with the database: ", err));