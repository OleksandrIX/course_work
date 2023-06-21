const bcrypt = require("bcrypt");

module.exports.createAdmin = async (User) => {
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