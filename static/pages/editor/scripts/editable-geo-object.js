import editablePolygon from "./editable-polygon.js";
import editableLine from "./editable-line.js";
import editablePoint from "./editable-point.js";
import editableArrow from "./editable-arrow.js";

export default class EditableGeoObject {
  constructor(yandexMap, geoObjectOptions) {
    this._yandexMap = yandexMap;
    this._geoObject = this._newGeoObject(geoObjectOptions);

    this._init();
  }

  _newGeoObject(geoObjectOptions) {
    switch (geoObjectOptions.type) {
      case 'POLYGON':
        return editablePolygon(geoObjectOptions);
      case 'LINE':
        return editableLine(geoObjectOptions);
      case 'POINT':
        return editablePoint(geoObjectOptions);
      case 'ARROW':
        return editableArrow(geoObjectOptions);
      default:
        throw new Error(`geoObjectOptions.type is not supported`);
    }
  }

  _init() {
    this._yandexMap.geoObjects.add(this._geoObject);
    this._geoObject.editor.startDrawing();
  }

  get geoObject() {
    return this._geoObject;
  }

  stopDrawing() {
    this._geoObject.editor.stopDrawing();
    this._geoObject.editor.stopEditing();
    this._geoObject.options.set({
      draggable: false
    });
  }
}
