import EditableGeoObject from "./editable-geo-object.js";

export default class EditableLine extends EditableGeoObject {
  constructor(yandexMap, geoObjectOptions) {
    super(yandexMap, geoObjectOptions);
  }

  get _newGeoObject() {
    const o = this._geoObjectOptions;

    return new ymaps.Polyline([], {}, {
      draggable: true,
      editorDrawingCursor: 'crosshair',
      strokeColor: o.color,
      strokeWidth: 5,
      opacity: o.opacity,
      zIndex: o.zIndex,
    });
  }
}
