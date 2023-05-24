<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Онлайн-запись</title>
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
        <a href="/employee_record">Записи</a>
        <a href="/employee_schedule">Расписание</a>
    </#if>
    <#if user.isAdmin() >
        <a href="/statistic">Статистика</a>
        <a href="/user">Пользователи</a>
        <a href="/procedure" >Услуги</a>
    </#if>

    <#if !user.isAdmin() && !user.isEmployee()>
        <a href="/online_record" class="active">Онлайн запись</a>
    </#if>

</div>
<div style="padding-top:40px;margin-top: 50px">
    <form name="online_recordForm" id="form">
        <input type="hidden" name="user_id" value=${user.id} />
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
        <div>
            <label for="date">Дата и время:</label>
            <select name="date" id="date">
                <option disabled selected value style="display:none"> </option>
            </select>
        </div>
        <input type="hidden" name="_csrf" value="${_csrf.token}">
        <div>
            <button type="submit">Записаться</button>
            <button id="my_reset">Сбросить</button>
        </div>
    </form>
</div>

<script src="/js/online_record.js"></script>
<footer id="horizontalFlex" style="color: white">2023 © VOLNA
    <ol style="font-weight: lighter; font-size: 18px; color: white">
        <li>Адрес: ул. Революции 28</li>
        <li>Контактный телефон: +7 923 246-77-46</li>
        <li>Instagram: @volnansk</li>
        <li>Вконтакте: volna_curl</li>
    </ol>
</footer>
</div>
</body>
</html>