const bcrypt = require("bcrypt");
const { sequelize } = require("../db/connect.db");

const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Medicine = require("../models/Medicine");
const StorageMedicine = require("../models/StorageMedicine");

Hospital.hasMany(User, { foreignKey: "hospitalId", onDelete: "CASCADE" });
User.belongsTo(Hospital, { foreignKey: "hospitalId", onDelete: "CASCADE" });

Hospital.hasMany(StorageMedicine, { foreignKey: "hospitalId", onDelete: "CASCADE" });
StorageMedicine.belongsTo(Hospital, { foreignKey: "hospitalId", onDelete: "CASCADE" });

Medicine.hasOne(StorageMedicine, { foreignKey: "medicineId", onDelete: "CASCADE" });
StorageMedicine.belongsTo(Medicine, { foreignKey: "medicineId", onDelete: "CASCADE" });

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