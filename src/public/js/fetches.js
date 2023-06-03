const getUsers = async () => {
    let users = [];
    try {
        const resData = await fetch(api + "/users");
        if (resData.status === 200) users = (await resData.json()).users;
        else console.log(resData);
        return users;
    } catch (err) {
        console.log(err);
    }
};
const getUnit = async (unitId) => {
    try {
        const resData = await fetch(api + `/units/${unitId}`);
        if (resData.status === 200) return (await resData.json()).unit;
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const getUser = async (userId) => {
    try {
        const resData = await fetch(api + `/users/${userId}`);
        if (resData.status === 200) return (await resData.json()).user;
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const saveUnit = async (unitData) => {
    try {
        let resData = await fetch(api + "/units", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(unitData)
        });
        if (resData.status === 201) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const saveUser = async (userData) => {
    try {
        let resData = await fetch(api + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if (resData.status === 409) {
            resData = await resData.json();
            const errorMessage = document.querySelector(".user-add-form-container > .error-message");
            errorMessage.textContent = resData.message;
            errorMessage.style.display = "block";
        } else if (resData.status === 201) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const updateUnit = async (unitId, unitData) => {
    try {
        const resData = await fetch(api + `/units/${unitId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(unitData)
        });
        if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const updateUser = async (userId, userData) => {
    try {
        let resData = await fetch(api + `/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if (resData.status === 409) {
            resData = await resData.json();
            const errorMessage = document.querySelector(".user-edit-form-container > .error-message");
            errorMessage.textContent = resData.message;
            errorMessage.style.display = "block";
        } else if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const destroyUnit = async (unitId) => {
    try {
        const resData = await fetch(api + `/units/${unitId}`, {
            method: "DELETE"
        });
        if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};
const destroyUser = async (userId) => {
    try {
        const resData = await fetch(api + `/users/${userId}`, {
            method: "DELETE"
        });
        if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};


const getOnePersonnel = async (personnelId) => {
    try {
        const resData = await fetch(api + `/personnel/${personnelId}`);
        if (resData.status === 200) return (await resData.json()).personnel;
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};

const savePersonnel = async (personnelData) => {
    try {
        let resData = await fetch(api + "/personnel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personnelData)
        });
        if (resData.status === 409) {
            resData = await resData.json();
            const errorMessage = document.querySelector(".personnel-add-form-container > .error-message");
            errorMessage.textContent = resData.message;
            errorMessage.style.display = "block";
        } else if (resData.status === 201) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};

const updatePersonnel = async (personnelId, personnelData) => {
    try {
        let resData = await fetch(api + `/personnel/${personnelId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personnelData)
        });
        if (resData.status === 409) {
            resData = await resData.json();
            const errorMessage = document.querySelector(".personnel-edit-form-container > .error-message");
            errorMessage.textContent = resData.message;
            errorMessage.style.display = "block";
        } else if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};

const destroyPersonnel = async (personnelId) => {
    try {
        const resData = await fetch(api + `/personnel/${personnelId}`, {
            method: "DELETE"
        });
        if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};

const updatePersonalData = async (personalDataId, personalData) => {
    try {
        let resData = await fetch(api + `/personnel/personal-data/${personalDataId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(personalData)
        });
        if (resData.status === 200) location.reload();
        else console.log(resData);
    } catch (err) {
        console.log(err);
    }
};