<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Статистика</title>
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
        <a href="/employee_procedure_employee">Услуги работников</a>
        <a href="/employee_record" >Записи</a>
        <a href="/employee_schedule">Расписание</a>
    </#if>
    <#if user.isAdmin() >
        <a href="/statistic" class="active">Статистика</a>
        <a href="/user">Пользователи</a>
        <a href="/procedure" >Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record">Онлайн запись</a>
    </#if>
</div>
<div style="padding-top:40px;margin-top: 50px">
    <form name="statisticForm" id="form">
        <div>
            <label for="date1">Выберите начало периода:</label>
            <input name="date1" type="date"/>
        </div>

        <div>
            <label for="date2">Выберите конец периода:</label>
            <input name="date2" type="date"/>
        </div>
        <div>
            <button type="submit">Найти</button>
            <button id="my_reset">Сбросить</button>
        </div>
    </form>
    <div id="sum" style="margin-top: 50px; display: flex;
    flex-direction: row;
    justify-content: center;">

    </div>


</div>

<script src="/js/statistic.js"></script>
</body>
</html>