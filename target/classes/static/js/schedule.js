async function getSchedules() {

    const response1 = await fetch("/schedules", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response4 = await fetch("/users/employees", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok === true && response4.ok === true) {
        const schedules = await response1.json();

        const employees = await response4.json();
        const select2 = document.getElementById("employee");
        employees.forEach(employee => {
            const opt = document.createElement("option");
            opt.value = employee.id;
            opt.text = employee.fcs;
            select2.add(opt);
        });

        let rows = document.querySelector("tbody");
        schedules.forEach(schedule => {
            rows.append(scheduleToTr(schedule, employees));
        });
    }
}

async function getSchedule(id) {
    const response = await fetch("/schedules/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const schedule = await response.json();
        const form = document.forms["scheduleForm"];
        form.elements["id"].value = schedule.id;

        form.elements["date"].value = schedule.date;
        form.elements["time"].value = schedule.time.slice(0,-3);

        const response3 = await fetch("/users/" + schedule.employeeId);
        const employee = await response3.json();
        form.elements["employee"].value = employee.id;
        form.elements["employee"].text = employee.name;

        form.elements["status"].value = schedule.status;
    }
}

async function createSchedule(date, time, employee_id, status, csrf) {

    const response = await fetch("/schedules", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf  },
        body: JSON.stringify({
            date: date,
            time: time,
            employeeId: employee_id,
            status: status
        })
    });
    if (response.ok === true) {
        const schedule = await response.json();
        const response3 = await fetch("/users");
        const employee = await response3.json();

        reset();
        document.querySelector("tbody").append(scheduleToTr(schedule, employee));
    }
}

async function editSchedule(id, date, time, employee_id, status, csrf) {
    const response = await fetch("/schedules", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf  },
        body: JSON.stringify({
            id: id,
            date: date,
            time: time,
            employeeId: employee_id,
            status: status
        })
    });
    if (response.ok === true) {
        const schedule = await response.json();

        const response3 = await fetch("/users");
        const employee = await response3.json();

        reset();
        document.querySelector("tr[data-rowId='" + schedule.id + "']").replaceWith(scheduleToTr(schedule, employee));
    }
}

function reset() {
    const form = document.forms["scheduleForm"];
    form.reset();
    form.elements["id"].value = 0;
}

async function deleteSchedule(id, csrf) {
    const response = await fetch("/schedules/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json", 'X-CSRF-TOKEN': csrf  }
    });
    if (response.ok === true) {
        const schedule = await response.json();
        document.querySelector("tr[data-rowId='" + schedule.id + "']").remove();
    }
}

function scheduleToTr(schedule, employees){
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowId", schedule.id);

    const id = document.createElement("td");
    id.style.display="none";
    id.append(schedule.id);
    tr.append(id);

    const date = document.createElement("td");
    date.append(schedule.date);
    tr.append(date);

    const time = document.createElement("td");
    time.append(schedule.time.slice(0,-3));
    tr.append(time);

    const employee_fcs = document.createElement("td");
    employees.forEach(employee => {
        if(schedule.employeeId === employee.id) {
            employee_fcs.append(employee.fcs);
        }

    })
    tr.append(employee_fcs);

    const status = document.createElement("td");
    if(schedule.status == true)
        status.append("Свободно");
    if(schedule.status == false)
        status.append("Занято");
    tr.append(status);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", schedule.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getSchedule(schedule.id);
    });
    linksTd.append(editLink);
    const form = document.forms["scheduleForm"];
    const csrf = form.elements["_csrf"].value;
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", schedule.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteSchedule(schedule.id,csrf);

    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

document.getElementById("my_reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

document.forms["scheduleForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["scheduleForm"];
    const id = form.elements["id"].value;
    const date = form.elements["date"].value;
    const time = form.elements["time"].value + ":00";
    const employee_id = form.elements["employee"].value;
    const status = form.elements["status"].value;
    const csrf = form.elements["_csrf"].value;
    if (id == 0)
        createSchedule(date, time, employee_id, status,csrf);
    else
        editSchedule(id, date, time, employee_id, status,csrf);
});

getSchedules();
