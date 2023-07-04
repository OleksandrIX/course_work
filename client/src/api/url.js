const server = "http://localhost:1111/api/v1";

export const AuthURL = {
    loginURL: `${server}/auth/login`,
    registrationURL: `${server}/auth/registration`,
    logoutURL: `${server}/auth/logout`,
    checkAuthURL: `${server}/auth/check`,
    checkAdminURL: `${server}/auth/check-admin`,
};

export const UserURL = {
    users: `${server}/users/`,
    getCurrentUser: `${server}/users/current`,
    changePassword: `${server}/users/`,
    editUser: `${server}/users/`,
    deleteUser: `${server}/users/`,
};

export const AddressURL = {
    createAddress: `${server}/addresses/`,
    editAddress: `${server}/addresses/`,
};

export const HospitalURL = {
    getAllHospitals: `${server}/hospitals/`,
};

export const ProductionBatchURL = {
    getBatchByHospitalId: `${server}/production-batches/hospitals/`,
    getAllBatchesAndMedicines: `${server}/production-batches/hospitals/medicines`,
    createProductionBatch: `${server}/production-batches/`,
    deleteProductionBatch: `${server}/production-batches/`,
};

export const MedicineInBatchURL = {
    getMedicineInBatchBySerialNumber: `${server}/medicine-in-batches/`,
};

export const MedicineURL = {
    getOneMedicineById: `${server}/medicines/`,
    getAllMedicines: `${server}/medicines/`,
    createMedicine: `${server}/medicines/`,
    updateMedicine: `${server}/medicines/`,
    deleteMedicine: `${server}/medicines/`,
};