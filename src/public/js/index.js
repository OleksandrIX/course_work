const api = "http://localhost:3333/api";

const logout = () => {
    fetch("http://localhost:3333/logout", {method: "DELETE"})
        .then(async (res) => {
            if (res.status === 200) location.href = (await res.json()).redirectUrl;
            else console.log(res);
        })
        .catch(err => console.log(err))
};

const notifyErrorMessage = (selector, message) => {
    const errorMessage = document.querySelector(selector);
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
};

const getListItem = (node) => {
    if (node.classList.contains("list-item") && node.tagName === "LI") return node;
    else return getListItem(node.parentNode);
};