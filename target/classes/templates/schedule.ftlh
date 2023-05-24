<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Расписание</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/topnav.css">
    <link rel="stylesheet" href="/css/table.css" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
</head>
<body>
<div class="topnav">
    <a href="/" style="float:left" id="main"><img src="/image/logo.png" width="148px" height="38px"></a>
    <a href="/account">Профиль</a>
    <#if user.isAdmin()>
        <a href="/procedure_employee">Услуги работников</a>
        <a href="/record">Записи</a>
        <a href="/schedule" class="active">Расписание</a>
    </#if>
    <#if user.isEmployee()>
        <a href="/employee_procedure_employee">Услуги работников</a>
        <a href="/employee_record" >Записи</a>
        <a href="/employee_schedule">Расписание</a>
    </#if>
    <#if user.isAdmin() >
        <a href="/statistic">Статистика</a>
        <a href="/user">Пользователи</a>
        <a href="/procedure" >Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record">Онлайн запись</a>
    </#if>

</div>
<#if user.isAdmin() >
<div style="padding-top:40px;margin-top: 50px">
    <form name="scheduleForm" id="form">
        <input type="hidden" name="id" value="0" />
        <div>
            <label for="date">Дата:</label>
            <input name="date" type="date"/>
        </div>

        <div>
            <label for="time">Время:</label>
            <select name="time" id="time">
                <option value="9:00">9:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
            </select>
        </div>
        <div>
            <label for="employee">Работник:</label>
            <select name="employee" id="employee">
                <option disabled selected value style="display:none"> </option>
            </select>
        </div>
        <div>
            <label for="status">Статус:</label>
            <select name="status" id="status">
                <option disabled selected value style="display:none"> </option>
                <option value="true">Свободно</option>
                <option value="false">Занято</option>
            </select>
        </div>
        <input type="hidden" name="_csrf" value="${_csrf.token}">
        <div>
            <button type="submit">Сохранить</button>
            <button id="my_reset">Сбросить</button>
        </div>
    </form>
</div>
</#if>
<table>
    <caption><h2>Расписание</h2></caption>
    <thead><tr><th>Дата</th><th>Время</th><th>Работник</th><th>Статус</th><th></th></tr></thead>
    <tbody>
    </tbody>
</table>
<script src="/js/schedule.js"></script>
</body>
</html>