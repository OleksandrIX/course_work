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

export const MedicineURL = {
    getAllMedicines: `${server}/medicines/`,
    createMedicine: `${server}/medicines/`,
    updateMedicine: `${server}/medicines/`,
    deleteMedicine: `${server}/medicines/`,
};