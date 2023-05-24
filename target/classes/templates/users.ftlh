<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Пользователи</title>
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
        <a href="/employee_schedule">Расписание</a>
    </#if>
    <#if user.isAdmin() >
        <a href="/statistic">Статистика</a>
        <a href="/user" class="active">Пользователи</a>
        <a href="/procedure" >Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record">Онлайн запись</a>
    </#if>
</div>
<div style="padding-top:40px;margin-top: 50px">
    <form name="employeeForm" id="form">
        <input type="hidden" name="id" value="0" />
        <div>
            <label for="login">Логин:</label>
            <input name="login" />
        </div>
        <div>
            <label for="password">Пароль:</label>
            <input name="password" />
        </div>
        <div>
            <label for="fcs">ФИО:</label>
            <input name="fcs" />
        </div>
        <div>
            <label for="active">Статус:</label>
            <input name="active" />
        </div>
        <div>
            <label for="role">Роль:</label>
            <select name="role" id="role">
                <option disabled selected value style="display:none"> </option>
                <option value="ROLE_USER">Клиент</option>
                <option value="ROLE_EMPLOYEE">Работник</option>
                <option value="ROLE_ADMIN">Администратор</option>
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
    <caption><h2>Пользователи</h2></caption>
    <thead><tr><th>Логин</th><th>ФИО</th><th>Статус</th><th>Роль</th><th></th></tr></thead>
    <tbody>
    </tbody>
</table>
<script src="/js/users.js"></script>
</body>
</html>