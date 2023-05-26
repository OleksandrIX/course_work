const {SalaryService} = require("../../services");

const getSalary = async (req, res) => {
    const {salaryId} = req.params;
    try {
        const salary = await SalaryService.getSalaryById(salaryId);
        if (!salary) return res.status(404).json({message: "Salary not found"});
        res.status(200).json({salary});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const createSalary = async (req, res) => {
    const salaryData = req.body;
    try {
        await SalaryService.createSalary(salaryData);
        res.status(201).json({message: "Salary created successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const updateSalary = async (req, res) => {
    const {salaryId} = req.params;
    const salaryData = req.body;
    try {
        if (!await SalaryService.isExistsById(salaryId))
            return res.status(404).json({
                message: "Salary not found"
            });

        await SalaryService.updateSalary(salaryId, salaryData);
        res.status(200).json({message: "Salary updated successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};

const deleteSalary = async (req, res) => {
    const {salaryId} = req.params;
    try {
        if (!await SalaryService.isExistsById(salaryId))
            return res.status(404).json({
                message: "Salary not found"
            });

        await SalaryService.deleteSalary(salaryId);
        res.status(200).json({message: "Salary deleted successfully"});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({message: err.message});
    }
};


module.exports = {
    getSalary,
    createSalary,
    updateSalary,
    deleteSalary,
};