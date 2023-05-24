async function getProceduresEmployees() {

    const response1 = await fetch("/procedures_employees", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response2 = await fetch("/procedures", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response3 = await fetch("/users/employees", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok === true && response2.ok === true && response3.ok === true) {
        const procedures_employees = await response1.json();

        const procedures = await response2.json();
        const select = document.getElementById("procedure");
        procedures.forEach(procedure => {
            const opt = document.createElement("option");
            opt.value = procedure.id;
            opt.text=procedure.name;
            select.add(opt);
        });

        const employees = await response3.json();
        const select1 = document.getElementById("employee");
        employees.forEach(employee => {
            const opt = document.createElement("option");
            opt.value = employee.id;
            opt.text = employee.fcs;
            select1.add(opt);
        });

        let rows = document.querySelector("tbody");
        procedures_employees.forEach(procedure_employee => {
            rows.append(procedureEmployeeToTr(procedure_employee, procedures, employees));
        });
    }
}

async function getProcedureEmployee(id) {
    const response = await fetch("/procedures_employees/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const procedure_employee = await response.json();
        const form = document.forms["procedure_employeeForm"];
        form.elements["id"].value = procedure_employee.id;

        const response1 = await fetch("/procedures/" + procedure_employee.procedureId);
        const procedure = await response1.json();
        form.elements["procedure"].value = procedure.id;
        form.elements["procedure"].text = procedure.name;

        const response2 = await fetch("/users/" + procedure_employee.employeeId);
        const employee = await response2.json();
        form.elements["employee"].value = employee.id;
        form.elements["employee"].text = employee.name;
    }
}

async function createProcedureEmployee(procedure_id, employee_id, csrf) {

    const response = await fetch("/procedures_employees", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json", 'X-CSRF-TOKEN': csrf  },
        body: JSON.stringify({
            procedureId: procedure_id,
            employeeId: employee_id
        })
    });
    if (response.ok === true) {
        const procedure_employee = await response.json();

        const response1 = await fetch("/procedures");
        const procedure = await response1.json();

        const response2 = await fetch("/users");
        const employee = await response2.json();

        reset();
        document.querySelector("tbody").append(procedureEmployeeToTr(procedure_employee, procedure, employee));
    }
}

async function editProcedureEmployee(id, procedure_id, employee_id, csrf) {
    const response = await fetch("/procedures_employees", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json", 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
            id: id,
            procedureId: procedure_id,
            employeeId: employee_id

        })
    });
    if (response.ok === true) {
        const procedure_employee = await response.json();

        const response1 = await fetch("/procedures");
        const procedure = await response1.json();

        const response2 = await fetch("/users");
        const employee = await response2.json();

        reset();
        document.querySelector("tr[data-rowId='" + procedure_employee.id + "']").replaceWith(procedureEmployeeToTr(procedure_employee, procedure, employee));
    }
}

function reset() {
    const form = document.forms["procedure_employeeForm"];
    form.reset();
    form.elements["id"].value = 0;
}

async function deleteProcedureEmployee(id, csrf) {
    const response = await fetch("/procedures_employees/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json", 'X-CSRF-TOKEN': csrf }
    });
    if (response.ok === true) {
        const procedure_employee = await response.json();
        document.querySelector("tr[data-rowId='" + procedure_employee.id + "']").remove();
    }
}

function procedureEmployeeToTr(procedure_employee, procedures, employees){
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowId", procedure_employee.id);

    const id = document.createElement("td");
    id.style.display="none";
    id.append(procedure_employee.id);
    tr.append(id);

    const procedure_name = document.createElement("td");
    procedures.forEach(procedure => {
        if(procedure_employee.procedureId === procedure.id) {
            procedure_name.append(procedure.name);
        }

    })
    tr.append(procedure_name);

    const employee_fcs = document.createElement("td");
    employees.forEach(employee => {
        if(procedure_employee.employeeId === employee.id) {
            employee_fcs.append(employee.fcs);
        }

    })
    tr.append(employee_fcs);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", procedure_employee.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getProcedureEmployee(procedure_employee.id);
    });
    linksTd.append(editLink);
    const form = document.forms["procedure_employeeForm"];
    const csrf = form.elements["_csrf"].value;
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", procedure_employee.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteProcedureEmployee(procedure_employee.id, csrf);

    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

document.getElementById("my_reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

document.forms["procedure_employeeForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["procedure_employeeForm"];
    const id = form.elements["id"].value;
    const procedure_id = form.elements["procedure"].value;
    const employee_id = form.elements["employee"].value;
    const csrf = form.elements["_csrf"].value;
    if (id == 0)
        createProcedureEmployee(procedure_id, employee_id, csrf);
    else
        editProcedureEmployee(id, procedure_id, employee_id, csrf);
});

getProceduresEmployees();
