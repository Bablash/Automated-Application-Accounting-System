function getUser(){
    const form = document.forms["accountForm"];
    const id = form.elements["id"].value;
    const role = form.elements["role"].value;
    const login = form.elements["loginSession"].value;
    const password = form.elements["passwordSession"].value;

    if(role === "ROLE_USER"){
        getUserByIdLoginPassword(id,login,password);
        getRecords(id);
    }
    else if (role === "ROLE_EMPLOYEE"){
        getEmployeeById(id);
    }
    else getAdminById(id);
}

async function getUserByIdLoginPassword(id, login, password) {
    const response = await fetch("/users/user/" + id + "/" + login + "/" + password, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["accountForm"];
        form.elements["login"].value = user.login;
        form.elements["password"].value = user.password;
        form.elements["fcs"].value = user.fcs;
        form.elements["active"].value = user.active;
    }
}

async function getEmployeeById(id) {
    const response = await fetch("/users/employee/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["accountForm"];
        form.elements["login"].value = user.login;
        form.elements["password"].value = user.password;
        form.elements["fcs"].value = user.fcs;
        form.elements["active"].value = user.active;
    }
}

async function getAdminById(id) {
    const response = await fetch("/users/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const user = await response.json();
        const form = document.forms["accountForm"];
        form.elements["login"].value = user.login;
        form.elements["password"].value = user.password;
        form.elements["fcs"].value = user.fcs;
        form.elements["active"].value = user.active;
    }
}

async function getRecords(userId) {

    const response1 = await fetch("/records/user/" + userId, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok === true ) {
        const records = await response1.json();

        let ol = document.querySelector("#list");
        records.forEach(record => {
            ol.append(recordToOl(record));
        });
    }
}

async function editUser(id, login, password, fcs, active, role, csrf) {
    const response = await fetch("/users/user", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            id: id,
            login: login,
            password: password,
            fcs: fcs,
            active: active,
            role: role
        })
    });
    if (response.ok === true) {
        const user = await response.json();
        getUser();
    }
}

async function updateRecord(id,csrf) {
    const response = await fetch("/records/user/" + id, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf }
    });
    if (response.ok === true) {
        const record = await response.json();
        document.querySelector("ol[data-rowId='" + record.id + "']").replaceWith(recordToOl(record));
    }
}

function recordToOl(record){
    const ol = document.createElement("ol");
    ol.setAttribute("id","textBlock")
    ol.setAttribute("data-rowId", record.id);

    const procedure_name = document.createElement("li");
    procedure_name.append(record.procedure_name);
    ol.append(procedure_name);

    const date = document.createElement("li");
    date.append(record.date);
    ol.append(date);

    const time = document.createElement("li");
    time.append(record.time.slice(0,-3));
    ol.append(time);

    const employee_fcs = document.createElement("li");
    employee_fcs.append(record.employee_fcs);
    ol.append(employee_fcs);

    const form = document.forms["accountForm"];
    const csrf = form.elements["_csrf"].value;
    const user_id = form.elements["id"].value;
    if(record.status === "future") {
        const editLink = document.createElement("button");
        editLink.append("Отменить");
        editLink.addEventListener("click", e => {

            e.preventDefault();
            updateRecord(record.id,csrf);
            getRecords(user_id);
        });
        ol.append(editLink);
    }
    if(record.status === "past" || record.status === "cancelled") {
        const editLink = document.createElement("button");
        editLink.append("Повторить");
        editLink.addEventListener("click", e => {

            e.preventDefault();
            var newWin = window.open('/online_record');
            newWin.onload = function() {
                const select1 = newWin.document.getElementById("procedure");
                const opt = document.createElement("option");
                opt.text = record.procedure_name;
                select1.add(opt);
                select1.options[opt.index].selected = true;

                const select2 = newWin.document.getElementById("employee");
                const opt2 = document.createElement("option");
                opt2.text = record.employee_fcs;
                select2.add(opt2);
                select2.options[opt.index].selected = true;
            }

        });
        ol.append(editLink);
    }

    return ol;
}

document.forms["accountForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["accountForm"];
    const id = form.elements["id"].value;
    const login = form.elements["login"].value;
    let password = form.elements["newPassword"].value;
    if(!password.replace(/^\s+|\s+$/g, '')){
        password = form.elements["password"].value;
    }
    const fcs = form.elements["fcs"].value;
    const active = form.elements["active"].value;
    const role = form.elements["role"].value;
    const csrf = form.elements["_csrf"].value;

    editUser(id, login, password,fcs,active, role, csrf);
});

getUser();