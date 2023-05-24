async function getRecordsByEmployeeId(id) {

    const response1 = await fetch("/records/employee/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok) {
        const records = await response1.json();

        let rows = document.querySelector("tbody");
        records.forEach(record => {
            rows.append(recordToTr(record));
        });
    }
}

function recordToTr(record){
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowId", record.id);

    const id = document.createElement("td");
    id.style.display="none";
    id.append(record.id);
    tr.append(id);

    const procedure_name = document.createElement("td");
    procedure_name.append(record.procedure_name);
    tr.append(procedure_name);

    const user_fcs = document.createElement("td");
    user_fcs.append(record.user_fcs);
    tr.append(user_fcs);

    const date = document.createElement("td");
    date.append(record.date);
    tr.append(date);

    const time = document.createElement("td");
    time.append(record.time.slice(0,-3));
    tr.append(time);

    const employee_fcs = document.createElement("td");
    employee_fcs.append(record.employee_fcs);
    tr.append(employee_fcs);

    const status = document.createElement("td");
    if(record.status === "future")
        status.append("Предстоит");
    if(record.status === "past")
        status.append("Прошла");
    if(record.status === "cancelled")
        status.append("Отменена");

    tr.append(status);
    return tr;
}

getRecordsByEmployeeId(document.getElementById("id").value);

