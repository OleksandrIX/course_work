const getAllUsers = async () => {
    try {
        const response = await fetch(api + "/users");
        if (response.status === 200) {
            const {users} = await response.json();
            return users;
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const getOneUser = async (id) => {
    try {
        const response = await fetch(api + `/users/${id}`);
        if (response.status === 200) {
            const {user} = await response.json();
            return user;
        } else if (response.status === 404) {
            alert("Такого користувача не існує");
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const saveUser = async (userData) => {
    try {
        const response = await fetch(api + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 201) location.reload();
        else if (response.status === 409) {
            const {message} = await response.json();
            notifyErrorMessage("#add-user-modal .error-message", message);
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const updateUser = async (id, userData) => {
    try {
        const response = await fetch(api + `/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такого користувача не існує");
        else if (response.status === 409) {
            const {message} = await response.json();
            notifyErrorMessage("#edit-user-modal .error-message", message);
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const deleteUser = async (id) => {
    try {
        const response = await fetch(api + `/users/${id}`, {method: "DELETE"});
        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такого користувача не існує");
        else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const getAllGarrisons = async () => {
    try {
        const response = await fetch(api + "/garrisons");
        if (response.status === 200) {
            const {garrisons} = await response.json();
            return garrisons;
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }

};

const getOneGarrison = async (id) => {
    try {
        const response = await fetch(api + `/garrisons/${id}`);
        if (response.status === 200) {
            const {garrison} = await response.json();
            return garrison;
        } else if (response.status === 404) {
            alert("Такого гарнізону не існує");
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const saveGarrison = async (garrisonData) => {
    try {
        const response = await fetch(api + "/garrisons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(garrisonData)
        });

        if (response.status === 201) location.reload();
        else if (response.status === 409) {
            const {message} = await response.json();
            notifyErrorMessage("#add-garrison-modal .error-message", message);
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const updateGarrison = async (id, garrisonData) => {
    try {
        const response = await fetch(api + `/garrisons/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(garrisonData)
        });

        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такого гарнізону не існує");
        else if (response.status === 409) {
            const {message} = await response.json();
            notifyErrorMessage("#edit-garrison-modal .error-message", message);
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const deleteGarrison = async (id) => {
    try {
        const response = await fetch(api + `/garrisons/${id}`, {method: "DELETE"});
        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такого гарнізону не існує");
        else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const getAllMilitaryUnits = async () => {
    try {
        const response = await fetch(api + "/military-units");
        if (response.status === 200) {
            const {militaryUnits} = await response.json();
            return militaryUnits;
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const getAllMilitaryUnitsInGarrison = async (garrisonId) => {
    try {
        const response = await fetch(api + `/military-units?garrisonId=${garrisonId}`);
        if (response.status === 200) {
            const {militaryUnits} = await response.json();
            return militaryUnits;
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }

};

const getOneMilitaryUnit = async (id) => {
    try {
        const response = await fetch(api + `/military-units/${id}`);
        if (response.status === 200) {
            const {militaryUnit} = await response.json();
            return militaryUnit;
        } else if (response.status === 404) {
            alert("Такої в/ч не існує");
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const saveMilitaryUnit = async (militaryUnitData) => {
    try {
        const response = await fetch(api + "/military-units", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(militaryUnitData)
        });

        if (response.status === 201) location.reload();
        else if (response.status === 409) {
            const {message} = await response.json();
            notifyErrorMessage("#add-military-unit-modal .error-message", message);
        } else console.log(response);

    } catch (err) {
        console.log(err.message);
    }
};

const updateMilitaryUnit = async (id, militaryUnitData) => {
    try {
        const response = await fetch(api + `/military-units/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(militaryUnitData)
        });

        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такої в/ч не існує");
        else if (response.status === 409) {
            const {message} = await response.json();
            notifyErrorMessage("#edit-military-unit-modal .error-message", message);
        } else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};


const deleteMilitaryUnit = async (id) => {
    try {
        const response = await fetch(api + `/military-units/${id}`, {method: "DELETE"});
        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такої в/ч не існує");
        else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const saveServiceman = async (servicemanData) => {
    try {
        const response = await fetch(api + "/servicemen", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicemanData)
        });

        if (response.status === 201) location.reload();
        else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const updateServiceman = async (id, servicemanData) => {
    try {
        const response = await fetch(api + `/servicemen/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servicemanData)
        });

        if (response.status === 200) location.reload();
        else if (response.status === 404) alert("Такого в/с не існує");
        else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};

const deleteServiceman = async (id) => {
    try {
        const response = await fetch(api + `/servicemen/${id}`, {method: "DELETE"});
        if (response.status === 200) {
            const url = location.href.split("/");
            url.splice(url.length - 2, url.length - 1);
            location.href = url.join("/");
        } else if (response.status === 404) alert("Такого в/с не існує");
        else console.log(response);
    } catch (err) {
        console.log(err.message);
    }
};