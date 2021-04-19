import EditableGeoObject from "./editable-geo-object.js";
import "./arrow.js";

export default class EditableArrow extends EditableGeoObject {
  constructor(yandexMap, geoObjectOptions) {
    super(yandexMap, geoObjectOptions);
  }

  async _newGeoObject() {
    const o = this._geoObjectOptions;

    return new Promise((resolve) => {
      // Пользовательские модули не дописываются в неймспейс ymaps.
      // Поэтому доступ к ним мы можем получить асинхронно через метод ymaps.modules.require.
      ymaps.modules.require(['geoObject.Arrow'], function (Arrow) {
        const arrow = new Arrow([], null, {
          draggable: true,
          editorDrawingCursor: 'crosshair',
          strokeColor: o.color,
          strokeWidth: 5,
          opacity: o.opacity,
          zIndex: o.zIndex
        });

        resolve(arrow);
      });
    });
  }
}
