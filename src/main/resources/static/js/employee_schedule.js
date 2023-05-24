async function getSchedulesByEmployeeId(id) {

    const response1 = await fetch("/schedules/employee/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if (response1.ok) {
        const schedules = await response1.json();

        let rows = document.querySelector("tbody");
        schedules.forEach(schedule => {
            rows.append(scheduleToTr(schedule));
        });
    }
}

function scheduleToTr(schedule){
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

    const status = document.createElement("td");
    if(schedule.status == true)
        status.append("Свободно");
    if(schedule.status == false)
        status.append("Занято");
    tr.append(status);

    tr.append(status);
    return tr;
}

getSchedulesByEmployeeId(document.getElementById("id").value);

