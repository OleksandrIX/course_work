module.exports = ({Salary}) => {

    const getSalaryById = (salaryId) => {
        return Salary.findOne({where: {id_salary: salaryId}});
    };

    const createSalary = (salaryData) => {
        return Salary.create(salaryData);
    };

    const updateSalary= (salaryId, salaryData) => {
        return Salary.update(
            salaryData,
            {where: {id_salary: salaryId}},
        );
    };

    const deleteSalary = (salaryId)=>{
        return Salary.destroy({where: {id_salary: salaryId}});
    };

    const isExistsById = async (salaryId) => {
        const salary = await Salary.findOne({where: {id_salary: salaryId}});
        return !!salary;
    };

    return {
        getSalaryById,
        createSalary,
        updateSalary,
        deleteSalary,
        isExistsById,
    };
};