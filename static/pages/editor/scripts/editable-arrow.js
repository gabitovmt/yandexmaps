import EditableGeoObject from "./editable-geo-object.js";
import "./arrow.js";

let Arrow = null;
// Пользовательские модули не дописываются в неймспейс ymaps.
// Поэтому доступ к ним мы можем получить асинхронно через метод ymaps.modules.require.
ymaps.modules.require(['geoObject.Arrow'], function (GeoObjectArrow) {
  Arrow = GeoObjectArrow;
});

export default class EditableArrow extends EditableGeoObject {
  constructor(yandexMap, coordinates, geoObjectOptions) {
    super(yandexMap, coordinates, geoObjectOptions);
  }

  get coordinates() {
    return this._geoObject.geometry.getCoordinates();
  }

  _newGeoObject() {
    const o = this._geoObjectOptions;

    return new Arrow(this._coordinates, {}, {
      editorDrawingCursor: 'crosshair',
      strokeColor: o.color,
      strokeWidth: 5,
      opacity: o.opacity,
      zIndex: o.zIndex
    });
  }
}
