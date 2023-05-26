function checkPassword() {
    const password = document.querySelector("#password").value;
    const repeatPassword = document.querySelector("#repeat-password").value;
    if (password !== repeatPassword) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Пароль не співпадає";
        errorMessage.className = "auth-error-message";
        const formTitle = document.querySelector(".name-auth");
        formTitle.insertAdjacentElement("afterend", errorMessage);
        return false;
    }
    return true;
}