import IEditableGeoObject from "./i-editable-geo-object.js";

export default class EditableGeoObject extends IEditableGeoObject {
  constructor(yandexMap, coordinates, geoObjectOptions) {
    super();
    this._yandexMap = yandexMap;
    this._coordinates = coordinates;
    this._geoObjectOptions = geoObjectOptions;
    this._geoObject = null;
    this._init();
  }

  _newGeoObject() {
    throw new Error('method must be overridden');
  }

  _init() {
    this._geoObject = this._newGeoObject();
    this._yandexMap.geoObjects.add(this._geoObject);
  }

  startDrawing() {
    this._geoObject.editor.startDrawing();
    this._geoObject.options.set({
      draggable: true
    });
  }

  stopDrawing() {
    this._geoObject.editor.stopDrawing();
    this._geoObject.editor.stopEditing();
    this._geoObject.options.set({
      draggable: false
    });

    if (this.coordinates.length === 0) {
      // Ничего не нарисовали. Удаляем за ненадобностью
      this._yandexMap.geoObjects.remove(this._geoObject);
    }
  }

  get geoObjectOptions() {
    return this._geoObjectOptions;
  }
}
