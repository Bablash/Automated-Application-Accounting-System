<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Главная</title>
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
    <a href="/user">Пользователи</a>
    <a href="/procedure" >Услуги</a>
  </#if>

  <#if !user.isAdmin() && !user.isEmployee()>
    <a href="/online_record">Онлайн запись</a>
  </#if>
</div>
<div class="textHome">
  <img src="/image/home.png" width="101%" style="margin-top: 50px; margin-left: -0.5%">
  <div class="topCentered">VOLNA</div>
  <div class="centered" >салон для кудрявых</div>
  <a class="buttonHome" href="/online_record">Записаться</a>
</div>
<div id="form">
  <div id="textBlock">Мы эксперты в уходе за кудрявыми волосами!</div>
  <div id="textBlock">Наша миссия - создавать ухоженные кудри и раскрывать их потенциал! </div>
  <div id="textBlock">Мы стрижём завитки в сухом виде, показываем технику мытья волос, способы их укладки и подбираем средства для ухода!</div>
  <div style="background: rgba(16, 62, 96, 1); margin-top: 20px; font-size: 26px; color: white; border-radius: 5px; height: 45px; width: 365px;
   text-align: center; padding: 20px; font-weight: normal">Будь на своей волне!</div>
</div>
<div id="form">
<h1 style="margin-bottom: -10px">Стоимость услуг</h1>
    <div id="horizontalFlex">
      <div id="textBlockFix" class="lineText">Стрижки:
      <ol style="font-weight: normal; font-size: 24px">
        <li>Стрижка - 3000</li>
        <li>Экспресс-стрижка - 1500</li>
        <li>Стрижка челки - 700</li>
        <li>Стрижка детская - 2000</li>
      </ol>
      </div>
      <div id="textBlockFix" class="lineText">Окрашивания:
        <ol style="font-weight: normal; font-size: 24px">
          <li>Сложное окрашивание - от 5000</li>
          <li>Окрашивание "Пинтура" - 3000</li>
          <li>Мелирование - 4000</li>
          <li>Окрашивание кончиков - 2000</li>
        </ol></div>
    </div>
    <div id="horizontalFlex">
      <div id="textBlockFix" class="lineText">Уход:
        <ol style="font-weight: normal; font-size: 24px">
          <li>Маска + пилинг - 2000</li>
          <li>Olaplex - 2500</li>
          <li>Маска "DryHair" - 2000</li>
          <li>Маска "Rebuild" - 2000</li>
        </ol></div>
      <div id="textBlockFix" class="lineText">Укладка:
        <ol style="font-weight: normal; font-size: 24px">
          <li>Укладка + стрижка - 3500</li>
          <li>Укладка - 2000</li>
        </ol></div>
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
</body>
</html>