import IEditableGeoObject from "./i-editable-geo-object.js";

export default class EditableGeoObject extends IEditableGeoObject {
  constructor(yandexMap, geoObjectOptions) {
    super();
    this._yandexMap = yandexMap;
    this._geoObjectOptions = geoObjectOptions;
    this._geoObject = null;

    (async () => this._init())();
  }

  async _newGeoObject() {
    throw new Error('method must be overridden');
  }

  async _init() {
    this._geoObject = await this._newGeoObject();
    this._yandexMap.geoObjects.add(this._geoObject);
    this._geoObject.editor.startDrawing();
  }

  stopDrawing() {
    this._geoObject.editor.stopDrawing();
    this._geoObject.editor.stopEditing();
    this._geoObject.options.set({
      draggable: false
    });
  }
}
