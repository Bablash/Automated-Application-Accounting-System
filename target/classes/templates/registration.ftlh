<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Регистрация</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/topnav.css">
    <link rel="stylesheet" href="/css/table.css" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
</head>
<body>
<div class="wrapper">
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
        <a href="/statistic">Статистика</a>
        <a href="/user">Пользователи</a>
        <a href="/procedure" >Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record">Онлайн запись</a>
    </#if>

</div>

<div style="padding-top:40px;margin-top: 50px">
    <form name="registrationForm" id="form">
        <div>
            <label for="login">Логин:</label>
            <input name="login" />
        </div>
        <div>
            <label for="password">Пароль:</label>
            <input type="password" name="password" />
        </div>
        <div>
            <label for="fcs">ФИО:</label>
            <input name="fcs" />
        </div>
        <input type="hidden" name="_csrf" value="${_csrf.token}">
        <div>
            <button type="submit">Зарегистрироваться</button>
        </div>
    </form>
</div>
<footer id="horizontalFlex" style="color: white">2023 © VOLNA
    <ol style="font-weight: lighter; font-size: 18px; color: white">
        <li>Адрес: ул. Революции 28</li>
        <li>Контактный телефон: +7 923 246-77-46</li>
        <li>Instagram: @volnansk</li>
        <li>Вконтакте: volna_curl</li>
    </ol>
</footer>
<script src="/js/registration.js"></script>
</div>
</body>
</html>