/*
  Подключение API
  https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html
 */

/*
  Параметры загрузки
  https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html#load__param

  Обязательные параметры.
  - apikey - API ключ.
  - lang=language_region - локаль (код языка_код страны).
    От кода страны зависит единицы измерения.

  Необязательные параметры.
  - coordorder - порядок задания географических координат при работе API.
    latlong (по умолчанию) | longlat
  - load - список загружаемых модулей через запятую. По умолчанию 'package.full'.
  - mode - режим загрузки API.
    release | debug
    В release код упакован. Сообщения об ошибках и исключениях не выводятся в консоль.
  - csp
    https://yandex.ru/dev/maps/jsapi/doc/2.1/dg/concepts/load.html#load__using-csp
  - ns - пространство имён. По умолчанию ymaps. Если оставить пустым,
    то API не будет создавать объект в глобальной области видимости.
  - onload - имя функции, которую необходимо вызвать после того,
    как компоненты API будут загружены и готовы к использованию.
    В эту функцию передается объект-неймспейс. Пример: onload=myapp.dosmth
  - onerror - имя функции, куда будут передаваться ошибки.
 */

window.example = {
  init(ymaps) {
    const map = new ymaps.Map('map', {
      center: [58.01, 56.25],
      zoom: 7
    });

    const placemark = new ymaps.Placemark(map.getCenter());
    map.geoObjects.add(placemark);
  }
}

/*
  Подключение нужной версии API

  - Подключить текущую версию API:
    https://api-maps.yandex.ru/2.1?apikey=ваш API-ключ&lang=ru_RU
  - Подключить релиз-кандидат:
    https://api-maps.yandex.ru/2.1-dev?apikey=ваш API-ключ&lang=ru_RU
  - Подключить фиксированную версию API:
    https://api-maps.yandex.ru/2.1.68?apikey=ваш API-ключ&lang=ru_RU
 */

/*
  Готовность API

  Функция ready исполняет включенный в нее код после того,
  как будет загружены компоненты API и DOM-дерево документа.

  Функция, переданная в параметр onload вызывается после загрузки API,
  но не отслеживает готовность DOM-дерева
 */

/*
  Подключение API при использовании CSP
  TODO
 */
