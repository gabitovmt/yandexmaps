import EditableGeoObject from "./editable-geo-object.js";

export default class EditablePoint extends EditableGeoObject {
  constructor(yandexMap, geoObjectOptions) {
    super(yandexMap, geoObjectOptions);
  }

  get _newGeoObject() {
    const o = this._geoObjectOptions;

    return new ymaps.GeoObject({
      geometry: {
        type: 'Point'
      },
      properties: {}
    }, {
      draggable: true,
      editorDrawingCursor: 'crosshair',
      iconColor: o.color,
      opacity: o.opacity,
      zIndex: o.zIndex
    });
  }
}
