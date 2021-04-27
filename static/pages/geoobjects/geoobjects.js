import MyMap from "../../common/my-map.js";

const map = new MyMap();

/*
  Объекты на карте

  == Общие сведения ==

  Геообъект - это объект реального мира. Каждый геообъект имеет геометрию. Базовый класс геообъекта - GeoObject.
  Экземпляр карты хранит коллекцию геообъектов в поле geoObjects.
  Добавление, изменение и удаление производится в этой коллекции.
 */
map.run(ymap => {
  // Создание геообъекта с типом точка (метка).
  const myGeoObject = new ymaps.GeoObject({
    geometry: {
      type: 'Point', // тип геометрии - точка
      coordinates: [58.01, 56.25] // координаты точки
    }
  });

  // Размещение геообъекта на карте.
  ymap.geoObjects.add(myGeoObject);
});

/*
  Для каждого типа геометрии определён вспомогательный класс.
 */
map.run(ymap => {
  // Вспомогательный класс, который можно использовать
  // вместо GeoObject c типом геометрии «Point» (см. предыдущий пример)
  const myPlacemark = new ymaps.Placemark([58.01, 56.45]);
  ymap.geoObjects.add(myPlacemark);
});

/*
  == Типы геообъектов ==

  Тип геометрии присваивается геообъекту в момент его создания и не может быть изменен в дальнейшем.
  Координаты геометрии могут быть изменены.
 */
map.run(ymap => {
  // Метка
  ymap.geoObjects.add(
    new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: [57.5, 55]
      }
    })
  );
  ymap.geoObjects.add(
    new ymaps.Placemark([57.5, 55.5])
  );

  // Ломаная линия
  ymap.geoObjects.add(
    new ymaps.GeoObject({
      geometry: {
        type: 'LineString',
        coordinates: [
          [57.5, 56],
          [57.5, 56.3],
          [57.2, 56],
          [57.2, 56.3]
        ]
      }
    })
  );
  ymap.geoObjects.add(
    new ymaps.Polyline([
      [57.5, 56.5],
      [57.5, 56.8],
      [57.2, 56.5],
      [57.2, 56.8]
    ])
  );

  // Прямоугольник
  ymap.geoObjects.add(
    new ymaps.GeoObject({
      geometry: {
        type: 'Rectangle',
        coordinates: [
          [57.5, 57],
          [57.2, 57.3]
        ]
      }
    })
  );
  ymap.geoObjects.add(
    new ymaps.Rectangle([
      [57.5, 57.5],
      [57.2, 57.8]
    ])
  );

  // Многоугольник
  ymap.geoObjects.add(
    new ymaps.GeoObject({
      geometry: {
        type: 'Polygon',
        coordinates: [
          [[57.5, 58], [57.5, 58.5], [57, 58.25]],
          [[57.4, 58.1], [57.4, 58.4], [57.1, 58.25]]
        ]
      }
    })
  );
  ymap.geoObjects.add(
    new ymaps.Polygon([
      [[57.5, 58.5], [57.5, 59], [57, 58.75]],
      [[57.4, 58.6], [57.4, 58.9], [57.1, 58.75]]
    ])
  );

  // Круг
  ymap.geoObjects.add(
    new ymaps.GeoObject({
      geometry: {
        type: 'Circle',
        coordinates: [57.5, 59.5],
        radius: 10000 // 10 км
      }
    })
  );
  ymap.geoObjects.add(
    new ymaps.Circle([[57.5, 60], 10000])
  );
});

/*
  Если геообъект был инициализирован без указания геометрии, то он не будет отображаться на карте.
  Присвоить тип геометрии такому геообъекту также будет невозможно.
 */
map.run(ymap => {
  ymap.geoObjects.add(
    new ymaps.GeoObject({
      geometry: {
        coordinates: [57, 55]
      }
    })
  );
});

/*
  Визуальный редактор
 */
map.run(ymap => {
  const myPlacemark = new ymaps.Placemark([58, 55], {}, {
    draggable: true, // Метку можно перемещать.
    preset: 'islands#redStretchyIcon'
  });
  myPlacemark.events.add('dragend', function(e) {
    // Получение ссылки на объект, который был передвинут.
    const thisPlacemark = e.get('target');
    // Определение координат метки
    const coords = thisPlacemark.geometry.getCoordinates();
    // и вывод их при щелчке на метке
    thisPlacemark.properties.set('balloonContent', coords);
  });
  ymap.geoObjects.add(myPlacemark);
});

/*
  == Визуальное редактирование ==

  За возможность перетаскивания геообъекта отвечает опция draggable. См. пример выше.
  Визуальный редактор доступен в поле editor. Редактор доступен для точки, ломаной, круга и многоугольника.
 */
map.run(ymap => {
  const myPolyline = new ymaps.Polyline([[59, 55], [58.4, 55.4]]);
  ymap.geoObjects.add(myPolyline);
  myPolyline.editor.startEditing();
});
