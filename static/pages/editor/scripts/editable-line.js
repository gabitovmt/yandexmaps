import EditableGeoObject from "./editable-geo-object.js";

export default class EditableLine extends EditableGeoObject {
  constructor(yandexMap, coordinates, geoObjectOptions) {
    super(yandexMap, coordinates, geoObjectOptions);
  }

  get coordinates() {
    return this._geoObject.geometry.getCoordinates();
  }

  _newGeoObject() {
    const o = this._geoObjectOptions;

    return new ymaps.Polyline(this._coordinates, {}, {
      editorDrawingCursor: 'crosshair',
      strokeColor: o.color,
      strokeWidth: 5,
      opacity: o.opacity,
      zIndex: o.zIndex
    });
  }
}
