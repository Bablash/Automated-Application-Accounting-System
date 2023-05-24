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
        <a href="/schedule">Расписание</a>
    </#if>
    <#if user.isEmployee()>
        <a href="/employee_record" >Записи</a>
        <a href="/employee_schedule" class="active">Расписание</a>
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
<input type="hidden" id="id" value=${user.id} />
<table style="padding-top:40px;margin-top: 50px">
    <caption><h2>Расписание</h2></caption>
    <thead><tr><th>Дата</th><th>Время</th><th>Статус</th><th></th></tr></thead>
    <tbody>
    </tbody>
</table>
<script src="/js/employee_schedule.js"></script>
</body>
</html>