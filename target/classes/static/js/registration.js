async function createUser(login, password, fcs, csrf) {

    const response = await fetch("/users/registration", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            login: login,
            password: password,
            fcs: fcs
        })
    });
    reset();
}

function reset() {
    const form = document.forms["registrationForm"];
    form.reset();
}

document.forms["registrationForm"].addEventListener("submit", e => {

    const form = document.forms["registrationForm"];
    const login = form.elements["login"].value;
    const password = form.elements["password"].value;
    const fcs = form.elements["fcs"].value;
    const csrf = form.elements["_csrf"].value;
    e.preventDefault();
    createUser(login,password,fcs, csrf);
    window.location.href = '/login'
})