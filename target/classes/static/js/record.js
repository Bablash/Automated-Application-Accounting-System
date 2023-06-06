async function getRecords() {

    const response1 = await fetch("/records", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response2 = await fetch("/procedures", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response3 = await fetch("/users/users", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response4 = await fetch("/users/employees", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok === true && response2.ok === true && response3.ok === true && response4.ok === true) {
        const records = await response1.json();

        const procedures = await response2.json();
        const select = document.getElementById("procedure");
        procedures.forEach(procedure => {
            const opt = document.createElement("option");
            opt.value = procedure.id;
            opt.text=procedure.name;
            select.add(opt);
        });

        const users = await response3.json();
        const select1 = document.getElementById("user");
        users.forEach(user => {
            const opt = document.createElement("option");
            opt.value = user.id;
            opt.text = user.fcs;
            select1.add(opt);
        });

        const employees = await response4.json();
        const select2 = document.getElementById("employee");
        employees.forEach(employee => {
            const opt = document.createElement("option");
            opt.value = employee.id;
            opt.text = employee.fcs;
            select2.add(opt);
        });

        let rows = document.querySelector("tbody");
        records.forEach(record => {
            rows.append(recordToTr(record, procedures, users, employees));
        });
    }
}

async function getRecord(id) {
    const response = await fetch("/records/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const record = await response.json();
        const form = document.forms["recordForm"];
        form.elements["id"].value = record.id;

        const response1 = await fetch("/procedures/" + record.procedureId);
        const procedure = await response1.json();
        form.elements["procedure"].value = procedure.id;
        form.elements["procedure"].text = procedure.name;

        const response2 = await fetch("/users/" + record.usersId);
        const user = await response2.json();
        form.elements["user"].value = user.id;
        form.elements["user"].text = user.name;

        console.log(record.date+" " + record.time)
        form.elements["date"].value = record.date +" " + record.time;
        form.elements["date"].text = record.date + " " + record.time;

        const response3 = await fetch("/users/" + record.employeeId);
        const employee = await response3.json();
        form.elements["employee"].value = employee.id;
        form.elements["employee"].text = employee.name;

        form.elements["status"].value = record.status;
    }
}

async function createRecord(procedure_id, user_id, date, time, employee_id, status, csrf) {

    const response = await fetch("/records", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            procedureId: procedure_id,
            usersId: user_id,
            date: date,
            time: time,
            employeeId: employee_id,
            status: status
        })
    });
    if (response.ok === true) {
        const record = await response.json();

        const response1 = await fetch("/procedures");
        const procedure = await response1.json();

        const response2 = await fetch("/users/users");
        const user = await response2.json();

        const response3 = await fetch("/users/employees");
        const employee = await response3.json();

        reset();
        document.querySelector("tbody").append(recordToTr(record, procedure, user, employee));
    }
}

async function editRecord(id, procedure_id, user_id, date, time, employee_id, status, csrf) {
    const response = await fetch("/records", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json", 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            id: id,
            procedureId: procedure_id,
            usersId: user_id,
            date: date,
            time: time,
            employeeId: employee_id,
            status: status
        })
    });
    if (response.ok === true) {
        const record = await response.json();

        const response1 = await fetch("/procedures");
        const procedure = await response1.json();

        const response2 = await fetch("/users/employees");
        const user = await response2.json();

        const response3 = await fetch("/users/users");
        const employee = await response3.json();

        reset();
        document.querySelector("tr[data-rowId='" + record.id + "']").replaceWith(recordToTr(record, procedure, user, employee));
    }
}

async function getEmployeeByProcedure(id) {

    const response1 = await fetch("/procedures_employees/admin/" + id, {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    const response2 = await fetch("/users/employees", {
        method: "GET",
        headers: {"Accept": "application/json"}
    });


    if (response1.ok === true && response2.ok === true) {

        const procedures_employees = await response1.json();
        const employees = await response2.json();
        const select1 = document.getElementById("employee");
        let options = select1.options;
        while(options.length > 0){
            options[options.length - 1] = null;
        }
        procedures_employees.forEach(procedure_employee => {
            employees.forEach(employee => {
                if(procedure_employee.employeeId === employee.id) {
                    const opt = document.createElement("option");
                    opt.value = employee.id;
                    opt.text = employee.fcs;
                    select1.add(opt);
                }
            });
        });
    }
}

function timeFree(schedules, schedules2, procedure){
    let date;
    schedules.forEach(schedule => {
        if(date === schedule.date) return false;
        date = schedule.date;
        let time = new Array();
        schedules2.forEach(schedule2 => {
            if(schedule2.date === date){
                time.push(schedule2.time);
            }
        })

        time.sort();
        for(let j = 0; j < time.length; j++) {
            for (let i = 1; i < procedure.duration.slice(0,2); i++) {
                if (time.slice(0,2)[j] + i != time.slice(0,2)[i] || time.slice(0,2)[j] + i > 18) {
                    time.splice(j);
                }
            }
        }
        const select1 = document.getElementById("date");
        time.forEach(time1 => {
            const opt = document.createElement("option");
            opt.value = date + " " + time1;
            opt.text = date + " " + time1;
            select1.add(opt);
        })

    });

}

async function getDateByEmployeeId(id) {

    const form = document.forms["recordForm"];
    const procedure_id = form.elements["procedure"].value;

    const response2 = await fetch("/procedures/" + procedure_id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response1 = await fetch("/schedules/admin/byEmployee/" + id + "/" + true, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    const response3 = await fetch("/schedules/admin/byEmployee/" + id + "/" + true, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok) {
        const schedules = await response1.json();
        const schedules2 = await response3.json();
        const procedure = await response2.json();
        timeFree(schedules, schedules2, procedure)
    }
}


document.getElementById("employee").addEventListener("change", e => {

    e.preventDefault();
    const id = document.getElementById("employee").value;
    getDateByEmployeeId(id);
})

function reset() {
    const form = document.forms["recordForm"];
    form.reset();
    form.elements["id"].value = 0;
}

document.getElementById("procedure").addEventListener("change", e => {

    e.preventDefault();
    const id = document.getElementById("procedure").value;
    getEmployeeByProcedure(id);
})


async function deleteRecord(id, csrf) {
    const response = await fetch("/records/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json", 'X-CSRF-TOKEN': csrf }
    });
    if (response.ok === true) {
        const record = await response.json();
        document.querySelector("tr[data-rowId='" + record.id + "']").remove();
    }
}

function recordToTr(record, procedures, users, employees){
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowId", record.id);

    const id = document.createElement("td");
    id.style.display="none";
    id.append(record.id);
    tr.append(id);

    const procedure_name = document.createElement("td");
    procedures.forEach(procedure => {
        if(record.procedureId === procedure.id) {
            procedure_name.append(procedure.name);
        }

    })
    tr.append(procedure_name);

    const user_fcs = document.createElement("td");
    users.forEach(user => {
        if(record.usersId === user.id) {
            user_fcs.append(user.fcs);
        }
    })
    tr.append(user_fcs);

    const date = document.createElement("td");
    date.append(record.date);
    tr.append(date);

    const time = document.createElement("td");
    time.append(record.time.slice(0,-3));
    tr.append(time);

    const employee_fcs = document.createElement("td");
    employees.forEach(employee => {
        if(record.employeeId === employee.id) {
            employee_fcs.append(employee.fcs);
        }

    })
    tr.append(employee_fcs);
    const form = document.forms["recordForm"];
    const csrf = form.elements["_csrf"].value;
    const status = document.createElement("td");
    if(record.status === "future")
        status.append("Предстоит");
    if(record.status === "past")
        status.append("Прошла");
    if(record.status === "cancelled")
        status.append("Отменена");

    tr.append(status);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", record.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getRecord(record.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", record.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteRecord(record.id, csrf);

    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}


document.getElementById("my_reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})


document.forms["recordForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["recordForm"];
    const id = form.elements["id"].value;
    const procedure_id = form.elements["procedure"].value;
    const user_id = form.elements["user"].value;
    const date = form.elements["date"].value.slice(0,10);
    const time = form.elements["date"].value.slice(11,19);
    const employee_id = form.elements["employee"].value;
    const status = form.elements["status"].value;
    const csrf = form.elements["_csrf"].value;
    if (id == 0)
        createRecord(procedure_id, user_id, date, time, employee_id, status, csrf);
    else
        editRecord(id, procedure_id, user_id, date, time, employee_id, status, csrf);
    });
getRecords();

