async function getRecordsByDate(date1, date2) {
    const response = await fetch("/records/date/" + date1 + "/" + date2, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    const response1 = await fetch("/procedures", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    const response2 = await fetch("/records/count", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    const response3 = await fetch("/records/top", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response.ok === true && response1.ok === true) {
        const records = await response.json();
        const procedures = await response1.json();
        const recordsByUser = await response2.json();
        const recordsTop = await response3.json();
        let ol = document.querySelector("#sum");
        ol.append(sumRecordToBox(records, procedures, recordsByUser));
        ol.append(topProcedure(recordsTop, procedures));
    }
}
function topProcedure(recordsTop, procedures){

    const ol = document.createElement("ol");
    ol.setAttribute("id","textBlock");
    ol.setAttribute("style","margin-left: 50px");
    let sum4;
    ol.append("Частота посещения услуг за период:")
    recordsTop.forEach(record1 => {
        procedures.forEach(procedure => {
            if (record1.procedure_id === procedure.id) {
                sum4 = document.createElement("li");
                sum4.append(procedure.name + " " + record1.count);
                ol.append(sum4);
            }
        })
    })
    return ol;
}

function sumRecordToBox(records, procedures,recordsByUser){

    const ol = document.createElement("ol");
    ol.setAttribute("id","textBlock");
    const sum1 = document.createElement("li");
    let sum = 0;
    records.forEach(record => {
        procedures.forEach(procedure => {
            if (record.procedureId === procedure.id) {
                sum += procedure.price;
            }
        })
    })
    sum1.append("Сумма услуг за период: " + sum);
    ol.append(sum1);

    const sum2 = document.createElement("li");
    sum2.append("Количество услуг за период: " + records.length);
    ol.append(sum2);

    const sum3 = document.createElement("li");
    sum3.append("Количество клиентов за период: " + recordsByUser.length);
    ol.append(sum3);

    return ol;
}

document.forms["statisticForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["statisticForm"];
    const date1 = form.elements["date1"].value;
    const date2 = form.elements["date2"].value;
    getRecordsByDate(date1, date2);
});