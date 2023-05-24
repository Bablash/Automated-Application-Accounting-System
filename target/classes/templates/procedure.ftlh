<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Услуги</title>
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
        <a href="/employee_record">Записи</a>
        <a href="/employee_schedule">Расписание</a>
    </#if>
    <#if user.isAdmin() >
        <a href="/statistic">Статистика</a>
        <a href="/user">Пользователи</a>
        <a href="/procedure" class="active">Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record">Онлайн запись</a>
    </#if>

</div>
<div style="padding-top:40px;margin-top: 50px">
    <form name="procedureForm" id="form">
        <input type="hidden" name="id" value="0" />
        <div>
            <label for="name">Наименование:</label>
            <input name="name" />
        </div>
        <div>
            <label for="price">Стоимость:</label>
            <input name="price" />
        </div>
        <div>
            <label for="duration">Продолжительность:</label>
            <select name="duration" id="duration">
                <option value="1:00">1:00</option>
                <option value="2:00">2:00</option>
                <option value="3:00">3:00</option>
                <option value="4:00">4:00</option>
                <option value="5:00">5:00</option>
            </select>
        </div>
        <input type="hidden" name="_csrf" value="${_csrf.token}">
        <div>
            <button type="submit">Сохранить</button>
            <button id="my_reset">Сбросить</button>
        </div>
    </form>
</div>
<table>
    <caption><h2>Услуги</h2></caption>
    <thead><tr><th>Наименование</th><th>Стоимость</th><th>Продолжительность</th><th></th></tr></thead>
    <tbody>
    </tbody>
</table>
<script src="/js/procedure.js"></script>
</body>
</html>