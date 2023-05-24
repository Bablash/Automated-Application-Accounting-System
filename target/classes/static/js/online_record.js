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

    const response1 = await fetch("/procedures_employees/procedure/" + id, {
        method: "GET",
        headers: {"Accept": "application/json"}
    });

    const response2 = await fetch("/users/user/employees", {
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

    const form = document.forms["online_recordForm"];
    const procedure_id = form.elements["procedure"].value;

    const response2 = await fetch("/procedures/user/" + procedure_id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response1 = await fetch("/schedules/user/byEmployee/" + id + "/" + true, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    const response3 = await fetch("/schedules/user/byEmployee/" + id + "/" + true, {
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
    const id = document.getElementById("employee").value;
    getDateByEmployeeId(id);
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