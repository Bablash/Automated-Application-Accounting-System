<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Услуги работников</title>
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
        <a href="/procedure_employee" class="active">Услуги работников</a>
        <a href="/record">Записи</a>
        <a href="/schedule">Расписание</a>
    </#if>
    <#if user.isEmployee()>
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
    <form name="procedure_employeeForm" id="form">
        <input type="hidden" name="id" value="0" />
        <div>
            <label for="procedure">Услуга:</label>
            <select name="procedure" id="procedure">
                <option disabled selected value style="display:none"> </option>
            </select>
        </div>
        <div>
            <label for="employee">Работник:</label>
            <select name="employee" id="employee">
                <option disabled selected value style="display:none"> </option>
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
    <caption><h2>Услуги работников</h2></caption>
    <thead><tr><th>Услуга</th><th>Работник</th><th></th></tr></thead>
    <tbody>
    </tbody>
</table>
<script src="/js/procedure_employee.js"></script>
</body>
</html>