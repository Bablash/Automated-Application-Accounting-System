async function getEmployees() {

    const response = await fetch("/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const employees = await response.json();

        let rows = document.querySelector("tbody");
        employees.forEach(employee => {
            rows.append(employeeToTr(employee));
        });
    }
}

async function getEmployee(id) {
    const response = await fetch("/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const employee = await response.json();
        const form = document.forms["employeeForm"];
        form.elements["id"].value = employee.id;
        form.elements["login"].value = employee.login;
        form.elements["password"].value = employee.password;
        form.elements["fcs"].value = employee.fcs;
        form.elements["active"].value = employee.active;
        form.elements["role"].value = employee.roles;
    }
}

async function createEmployee(login, password, fcs, active, role,csrf) {

    const response = await fetch("/employees", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            login: login,
            password: password,
            fcs: fcs,
            active: active,
            roles: role
        })
    });
    if (response.ok === true) {
        const employee = await response.json();
        reset();
        document.querySelector("tbody").append(employeeToTr(employee));
    }
}

async function editEmployee(id, login, password, fcs, active, role,csrf) {
    const response = await fetch("/users", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            id: id,
            login: login,
            password: password,
            fcs: fcs,
            active: active,
            roles: role
        })
    });
    if (response.ok === true) {
        const employee = await response.json();
        reset();
        document.querySelector("tr[data-rowId='" + employee.id + "']").replaceWith(employeeToTr(employee));
    }
}

function reset() {
    const form = document.forms["employeeForm"];
    form.reset();
    form.elements["id"].value = 0;
}

async function deleteEmployee(id,csrf) {
    const response = await fetch("/users/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json",'X-CSRF-TOKEN': csrf }
    });
    if (response.ok === true) {
        const employees = await response.json();
        document.querySelector("tr[data-rowId='" + employees.id + "']").remove();
    }
}

function employeeToTr(employee){
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowId", employee.id);

    const id = document.createElement("td");
    id.style.display="none";
    id.append(employee.id);
    tr.append(id);

    const login = document.createElement("td");
    login.append(employee.login);
    tr.append(login);

    const password = document.createElement("td");
    password.style.display="none";
    password.append(employee.password);
    tr.append(password);

    const fcs = document.createElement("td");
    fcs.append(employee.fcs);
    tr.append(fcs);

    const active = document.createElement("td");
    active.append(employee.active);
    tr.append(active);

    const role = document.createElement("td");
    role.append(employee.roles);
    tr.append(role);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", employee.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getEmployee(employee.id);
    });
    linksTd.append(editLink);
    const form = document.forms["employeeForm"];
    const csrf = form.elements["_csrf"].value;
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", employee.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteEmployee(employee.id,csrf);

    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

document.getElementById("my_reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

document.forms["employeeForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["employeeForm"];
    const id = form.elements["id"].value;
    const login = form.elements["login"].value;
    const password = form.elements["password"].value;
    const fcs = form.elements["fcs"].value;
    const active = form.elements["active"].value;
    const role = form.elements["role"].value;
    const csrf = form.elements["_csrf"].value;
    if (id == 0)
        createEmployee(login, password,fcs,active, role,csrf);
    else
        editEmployee(id, login, password,fcs,active, role,csrf);
});

getEmployees();
