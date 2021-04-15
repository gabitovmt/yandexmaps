/*
  Модульная система
  https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/modules.html
 */

/*
  Загрузка модулей при подключении API.
  Используется параметр load в строке подключения API.
  По умолчанию значение 'package.full'. Пример:
  <script src="https://api-maps.yandex.ru/2.1/?apikey=ваш API-ключ&lang=ru_RU&load=Map,Placemark" type="text/javascript"></script>
 */

/*
  Загрузка модулей по требованию
 */
ymaps.ready(function () {
  ymaps.modules.require(['Map', 'Placemark'], function (Map, Placemark) {
    // Нужно вручную добавить класс в пространство имен ymaps,
    // так как при использовании метода require()
    // этого не происходит.
    ymaps.Map = Map;
    const map = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 10
    });

    // Класс Placemark не добавлен в публичную область видимости.
    const placemark = new Placemark([55.55, 37.00]);
    map.geoObjects.add(placemark);
  });
});

/*
  Подключение аддонов
  TODO
 */

/*
  Создание собственных модулей
  TODO
 */
