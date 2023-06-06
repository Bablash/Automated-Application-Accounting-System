async function getData() {

    const response2 = await fetch("/procedures/user", {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    if (response2.ok === true) {
        const procedures = await response2.json();
        const select = document.getElementById("procedure");
        procedures.forEach(procedure => {
            const opt = document.createElement("option");
            opt.value = procedure.id;
            opt.text = procedure.name;
            select.add(opt);
        });
    }
}

async function getEmployeeByProcedure(id) {
    const response = await fetch("/users/user/employees/" + id, {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    if (response.ok) {
        const employees = await response.json();
        const select1 = document.getElementById("employee");
        let options = select1.options;
        while(options.length > 0){
            options[options.length - 1] = null;
        }
        employees.forEach(employee => {
            const opt = document.createElement("option");
            opt.value = employee.id;
            opt.text = employee.fcs;
            select1.add(opt);
        });
        getDateByEmployeeId(options[0].value, id);
    }
}

async function getDateByEmployeeId(id, procedure_id) {
    const response1 = await fetch("/schedules/user/byEmployee/" + id + "/" + true + "/" + procedure_id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok) {
        const schedules = await response1.json();
        const select1 = document.getElementById("date");
        schedules.forEach(schedule => {
            const opt = document.createElement("option");
            opt.value = schedule.date + " " + schedule.time;
            opt.text = schedule.date + " " + schedule.time;
            select1.add(opt);
        })
    }
}

async function createRecord(procedure_id, user_id, date, time, employee_id,csrf) {

    const response = await fetch("/records/user/record", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            status: "future",
            date: date,
            time: time,
            procedureId: procedure_id,
            employeeId: employee_id,
            usersId: user_id
        })
    });


    if (response.ok === true ) {
        reset();
        alert("Запись создана!");
    }
}

function reset() {
    const form = document.forms["online_recordForm"];
    form.reset();
}

document.getElementById("my_reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

document.getElementById("procedure").addEventListener("change", e => {

    e.preventDefault();
    const id = document.getElementById("procedure").value;
    getEmployeeByProcedure(id);
})

document.getElementById("employee").addEventListener("change", e => {

    e.preventDefault();
    const select1 = document.getElementById("date");
    let options = select1.options;
    while(options.length > 0){
        options[options.length - 1] = null;
    }

    const id = document.getElementById("employee").value;
    const procedure_id = document.getElementById("procedure").value;
    getDateByEmployeeId(id, procedure_id);
})

document.forms["online_recordForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["online_recordForm"];
    const procedure_id = form.elements["procedure"].value;
    const user_id = form.elements["user_id"].value;
    const date = form.elements["date"].value.slice(0,10);
    const time = form.elements["date"].value.slice(11,19);
    const employee_id = form.elements["employee"].value;
    const csrf = form.elements["_csrf"].value;

    createRecord(procedure_id, user_id, date, time, employee_id,csrf);
});

getData();