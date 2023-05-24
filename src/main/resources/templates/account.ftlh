<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Профиль</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/topnav.css">
    <link rel="stylesheet" href="/css/table.css" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
</head>
<body>
<div class="wrapper">
<div class="topnav">
    <a href="/" style="float:left" id="main"><img src="/image/logo.png" width="148px" height="38px"></a>
    <a href="/account" class="active">Профиль</a>
    <#if user.isAdmin()>
        <a href="/procedure_employee">Услуги работников</a>
        <a href="/record">Записи</a>
        <a href="/schedule">Расписание</a>
    </#if>
    <#if user.isEmployee()>
        <a href="/employee_record" >Записи</a>
        <a href="/employee_schedule">Расписание</a>
    </#if>
    <#if user.isAdmin()>
        <a href="/statistic">Статистика</a>
        <a href="/user">Пользователи</a>
        <a href="/procedure" >Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record">Онлайн запись</a>
    </#if>
</div>

<div style="display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start">
<div>
<form name="accountForm" id="form" style="padding-top:40px;margin-top: 50px">
    <input type="hidden" name="id" value=${user.id} />
    <input type="hidden" name="role" value=${user.roles[0]} />
    <input type="hidden" name="loginSession" value=${user.login} />
    <input type="hidden" name="passwordSession" value=${user.password} />
    <div>
        <label for="login">Логин:</label>
        <input name="login" />
    </div>
    <div>
        <label for="password">Пароль:</label>
        <input name="password" type="hidden"/>
        <input name="newPassword" type="password"/>
    </div>
    <div>
        <label for="fcs">ФИО:</label>
        <input name="fcs" />
    </div>
    <div>
        <input name="active" type="hidden" />
    </div>
    <input type="hidden" name="_csrf" value="${_csrf.token}">
    <div>
        <button type="submit">Сохранить</button>
    </div>
</form>
<form action="/logout" method="POST" id="form" style="margin-top: 10px">
    <input type="hidden" name="_csrf" value="${_csrf.token}">
    <input type="submit" value="Выйти" class="button">
</form>
</div>
    <div style="margin-top: 50px; padding-top: 40px">
    <#if !user.isAdmin() && !user.isEmployee()>
        <p >Список записей:</p>
        <div id="list"></div>
    </#if>
</div>
</div>
<footer id="horizontalFlex" style="color: white">2023 © VOLNA
    <ol style="font-weight: lighter; font-size: 18px; color: white">
        <li>Адрес: ул. Революции 28</li>
        <li>Контактный телефон: +7 923 246-77-46</li>
        <li>Instagram: @volnansk</li>
        <li>Вконтакте: volna_curl</li>
    </ol>
</footer>
</div>
<script src="js/account.js"></script>
</body>
</html>