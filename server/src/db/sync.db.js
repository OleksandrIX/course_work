const bcrypt = require("bcrypt");
const {sequelize} = require("../db/connect.db");

const User = require("../models/User");

const createAdmin = async () => {
    const admin = await User.findOne({where: {username: "admin"}});
    if (!admin) {
        const password = await bcrypt.hash("admin", 10);
        await User.create({
            username: "admin",
            password,
            role: "ADMIN",
        });
        console.log("Admin created!");
    }
};

sequelize.sync({alter: true})
    .then(async () => {
        console.log("Sync with the database is successful");
        await createAdmin();
    })
    .catch(err => console.log("Error sync with the database: ", err));

module.exports = {User};