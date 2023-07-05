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

export const HospitalURL = {
    getAllHospitals: `${server}/hospitals/`,
    createHospital: `${server}/hospitals`,
    editHospital: `${server}/hospitals/`,
    deleteHospital: `${server}/hospitals/`,
};

export const StorageURL = {
    getAllStoragesByHospitalId: `${server}/storage-medicines/hospitals/`,
    createStorageMedicine: `${server}/storage-medicines`,
    updateStorageMedicine: `${server}/storage-medicines/`,
    deleteStorageMedicine: `${server}/storage-medicines/`,
};

export const MedicineURL = {
    getOneMedicineById: `${server}/medicines/`,
    getAllMedicines: `${server}/medicines/`,
    createMedicine: `${server}/medicines/`,
    updateMedicine: `${server}/medicines/`,
    deleteMedicine: `${server}/medicines/`,
};