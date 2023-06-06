async function getProcedures() {

    const response = await fetch("/procedures", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true) {
        const procedures = await response.json();

        let rows = document.querySelector("tbody");
        procedures.forEach(procedure => {
            rows.append(procedureToTr(procedure));
        });
    }
}

async function getProcedure(id) {
    const response = await fetch("/procedures/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const procedure = await response.json();
        const form = document.forms["procedureForm"];
        form.elements["id"].value = procedure.id;
        form.elements["name"].value = procedure.name;
        form.elements["price"].value = procedure.price;
        form.elements["duration"].value = procedure.duration.slice(0,-3);
    }
}

async function createProcedure(name, price, duration, csrf) {

    const response = await fetch("/procedures", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json", 'X-CSRF-TOKEN': csrf  },
        body: JSON.stringify({
            name: name,
            price: price,
            duration: duration
        })
    });
    if (response.ok === true) {
        const procedure = await response.json();
        reset();
        document.querySelector("tbody").append(procedureToTr(procedure));
    }
}

async function editProcedure(id, name, price, duration,csrf) {
    const response = await fetch("/procedures", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json",'X-CSRF-TOKEN': csrf  },
        body: JSON.stringify({
            id: id,
            name: name,
            price: price,
            duration: duration
        })
    });
    if (response.ok === true) {
        const procedure = await response.json();
        reset();
        document.querySelector("tr[data-rowId='" + procedure.id + "']").replaceWith(procedureToTr(procedure));
    }
}

function reset() {
    const form = document.forms["procedureForm"];
    form.reset();
    form.elements["id"].value = 0;
}

async function deleteProcedure(id,csrf) {
    const response = await fetch("/procedures/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json",'X-CSRF-TOKEN': csrf  }
    });
    if (response.status === 204) {
        document.querySelector("tr[data-rowId='" + id + "']").remove();
    }
}

function procedureToTr(procedure){
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowId", procedure.id);

    const form = document.forms["procedureForm"];
    const csrf = form.elements["_csrf"].value;

    const id = document.createElement("td");
    id.style.display="none";
    id.append(procedure.id);
    tr.append(id);

    const name = document.createElement("td");
    name.append(procedure.name);
    tr.append(name);

    const price = document.createElement("td");
    price.append(procedure.price);
    tr.append(price);

    const duration = document.createElement("td");
    duration.append(procedure.duration.slice(0,-3));
    tr.append(duration);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", procedure.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        getProcedure(procedure.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", procedure.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        deleteProcedure(procedure.id, csrf);

    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}

document.getElementById("my_reset").addEventListener("click", e => {

    e.preventDefault();
    reset();
})

document.forms["procedureForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["procedureForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const price = form.elements["price"].value;
    const duration = form.elements["duration"].value + ":00";
    const csrf = form.elements["_csrf"].value;

    if (id == 0)
        createProcedure(name, price, duration, csrf);
    else
        editProcedure(id, name, price, duration, csrf);
});

getProcedures();
