const router = require("express").Router();

const AuthRouter = require("./auth.router");
router.use("/auth", AuthRouter);

const UserRouter = require("./user.router");
router.use("/users", UserRouter);

const HospitalRouter = require("./hospital.router");
router.use("/hospitals", HospitalRouter);

const StorageMedicineRouter = require("./storageMedicine.router");
router.use("/storage-medicines", StorageMedicineRouter);

const MedicineRouter = require("./medicine.router");
router.use("/medicines", MedicineRouter);

module.exports = router;